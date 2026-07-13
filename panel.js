/**
 * Beholder — floating state panel.
 *
 * A draggable, collapsible overlay that renders the current per-chat tracked
 * state as a paper-doll character card. Position + visibility + collapsed
 * state are persisted to extension_settings.beholder.panel.
 *
 * Three layout densities (settings.layout, the single source of truth; also
 * switchable in-panel via the toggle under the silhouette):
 *   - 'paired'  silhouette + L/R-aligned anatomical slot rows (default)
 *   - 'columns' silhouette + packed two-column slot layout
 *   - 'list'    compact digest, no silhouette (also auto-used on narrow panels)
 *
 * The header hosts the view tools (Settings / Doctor / Inspector / Help) and
 * the slot editor; those surfaces live in views.js, wired here at mount.
 */

import { renderDollPanel, renderCharacterDoll, setDollLayout } from './paperdoll.js?v=48';
import { installViews, openView, onPanelRendered, setNoModelBanner, refreshBrowserCard, showUpdateDialog } from './views.js';

const PANEL_ID = 'beholder_panel';

// Layout density is driven by settings.layout (paired | columns | list), read
// each render and pushed to paperdoll via setDollLayout. Narrow contexts also
// auto-collapse the doll grid into the single-column list via @container
// queries (style.css), independent of the persisted choice.

function ensurePanelDom() {
    let $panel = $(`#${PANEL_ID}`);
    if ($panel.length) return $panel;

    $panel = $(`
        <div id="${PANEL_ID}" class="beholder-panel" data-empty="true">
            <div class="beholder-panel-header">
                <span class="beholder-panel-title">Beholder</span>
                <span class="beholder-panel-controls">
                    <span class="beholder-backfill-group" role="group" aria-label="Build state from history">
                        <span class="beholder-backfill-btn fa-solid fa-clock-rotate-left" title="Build state from chat history (incremental — adds the card seed + walks unprocessed messages)"></span>
                        <span class="beholder-backfill-more fa-solid fa-caret-down" title="More build options"></span>
                    </span>
                    <span class="bh-header-sep" aria-hidden="true"></span>
                    <span class="beholder-tool-btn fa-solid fa-gear" data-view="settings" role="button" tabindex="0" title="Settings — connection, display, extraction" aria-label="Settings — connection, display, extraction"></span>
                    <span class="beholder-tool-btn fa-solid fa-users" data-view="characters" role="button" tabindex="0" title="Characters — aliases, hide, reorder" aria-label="Characters — aliases, hide, reorder"></span>
                    <span class="beholder-tool-btn fa-solid fa-stethoscope" data-view="doctor" role="button" tabindex="0" title="Doctor — health checks + diagnostic report" aria-label="Doctor — health checks + diagnostic report"></span>
                    <span class="beholder-tool-btn fa-solid fa-magnifying-glass" data-view="inspector" role="button" tabindex="0" title="Inspector — the last extraction, end to end" aria-label="Inspector — the last extraction, end to end"></span>
                    <span class="beholder-tool-btn fa-solid fa-circle-question" data-view="help" role="button" tabindex="0" title="Help — legend + writing tips" aria-label="Help — legend + writing tips"></span>
                    <span class="beholder-tools-more fa-solid fa-ellipsis-vertical" role="button" tabindex="0" title="Beholder tools" aria-label="Beholder tools"></span>
                    <span class="bh-header-sep" aria-hidden="true"></span>
                    <span class="beholder-close fa-solid fa-xmark" title="Hide (re-enable from settings)"></span>
                </span>
            </div>
            <div class="beholder-backfill-status" hidden></div>
            <div class="beholder-layer-bar" role="group" aria-label="Detail layers">
                <label class="bh-layer-cell" data-layer="color" title="Color word annotation on chips"><input type="checkbox" name="bh-view-layer" value="color"><span>Color</span></label>
                <label class="bh-layer-cell" data-layer="damage" title="Damage-tier visuals + damage word"><input type="checkbox" name="bh-view-layer" value="damage"><span>Damage</span></label>
                <label class="bh-layer-cell" data-layer="wounds" title="Wounds, bleeding, severity"><input type="checkbox" name="bh-view-layer" value="wounds"><span>Wounds</span></label>
            </div>
            <div class="beholder-panel-body"></div>
            <div class="beholder-resize-handle" title="Drag to resize height"></div>
        </div>
    `);
    $('body').append($panel);
    return $panel;
}

function applyPosition($panel, pos) {
    if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
        $panel.css({ left: pos.left + 'px', top: pos.top + 'px', right: 'auto', bottom: 'auto' });
    } else {
        $panel.css({ right: '20px', bottom: '20px', left: 'auto', top: 'auto' });
    }
}

function clampToViewport(left, top, w, h) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
        left: Math.max(0, Math.min(left, vw - Math.min(w, vw))),
        top: Math.max(0, Math.min(top, vh - 40)),
    };
}

function wireResize($panel, settings, save) {
    // Height-only resize. Width is locked because changing it throws off the
    // doll grid columns and chip layout proportions. Handle sits on the
    // bottom edge of the panel and uses ns-resize cursor.
    const $handle = $panel.find('.beholder-resize-handle');
    let resizeStart = null;
    $handle.on('mousedown', (e) => {
        const rect = $panel[0].getBoundingClientRect();
        resizeStart = { my: e.clientY, h: rect.height };
        $panel.addClass('beholder-resizing');
        e.preventDefault();
        e.stopPropagation();
    });
    $(document).on('mousemove.beholderResize', (e) => {
        if (!resizeStart) return;
        const h = Math.max(200, resizeStart.h + (e.clientY - resizeStart.my));
        $panel.css({ height: h + 'px' });
        $panel.attr('data-resized', 'true');
    });
    $(document).on('mouseup.beholderResize', () => {
        if (!resizeStart) return;
        $panel.removeClass('beholder-resizing');
        const rect = $panel[0].getBoundingClientRect();
        settings.panel = settings.panel || {};
        settings.panel.height = Math.round(rect.height);
        save();
        resizeStart = null;
    });
}

function wireDrag($panel, settings, save) {
    let dragStart = null;

    // Drag grips: the main header AND any open view's head bar. A view overlay
    // (Settings / Characters / …) sits inset:0 over the panel, hiding the main
    // header — so its own head bar must double as the move grip, else open views
    // can't be dragged. Delegated on $panel so it catches view heads added later.
    const DRAG_HANDLE = '.beholder-panel-header,.bh-view-head';
    const NO_DRAG = '.beholder-close,.beholder-backfill-group,.beholder-bf-menu,.bh-layer-cell,.beholder-tool-btn,.beholder-tools-more,.beholder-tools-menu,.bh-view-back,.bh-editor,.bh-edit-sheet,.bh-sheet-backdrop';

    $panel.on('mousedown', DRAG_HANDLE, (e) => {
        // Don't start drag on control clicks
        if ($(e.target).closest(NO_DRAG).length) return;
        const rect = $panel[0].getBoundingClientRect();
        dragStart = { mx: e.clientX, my: e.clientY, left: rect.left, top: rect.top, w: rect.width, h: rect.height };
        $panel.addClass('beholder-dragging');
        e.preventDefault();
    });

    $(document).on('mousemove.beholder', (e) => {
        if (!dragStart) return;
        const dx = e.clientX - dragStart.mx;
        const dy = e.clientY - dragStart.my;
        const clamped = clampToViewport(dragStart.left + dx, dragStart.top + dy, dragStart.w, dragStart.h);
        $panel.css({ left: clamped.left + 'px', top: clamped.top + 'px', right: 'auto', bottom: 'auto' });
    });

    $(document).on('mouseup.beholder', () => {
        if (!dragStart) return;
        $panel.removeClass('beholder-dragging');
        const rect = $panel[0].getBoundingClientRect();
        settings.panel = settings.panel || {};
        settings.panel.pos = { left: rect.left, top: rect.top };
        save();
        dragStart = null;
    });
}

// ─── Header tools dropdown (narrow-mode ⋯ menu) ─────────────────────────────
// On a wide panel the four tool icons (settings/doctor/inspector/help) sit flat
// in the header. Below the @container narrow breakpoint (style.css) a single `⋯`
// trigger replaces them and opens this dropdown of the same tools as labelled
// rows. The flat icons and the `⋯` both live in the DOM; CSS swaps which shows.
// The view DOM + view logic live in views.js; the header DOM (and therefore this
// menu's open/close) is panel-owned.
const HEADER_TOOLS = [
    { view: 'settings',   icon: 'fa-gear',             label: 'Settings' },
    { view: 'characters', icon: 'fa-users',            label: 'Characters' },
    { view: 'doctor',     icon: 'fa-stethoscope',      label: 'Doctor' },
    { view: 'inspector',  icon: 'fa-magnifying-glass', label: 'Inspector' },
    { view: 'help',       icon: 'fa-circle-question',  label: 'Help' },
];

function closeToolsMenu($panel) {
    $panel.find('.beholder-tools-menu').remove();
    $panel.find('.beholder-tools-more').removeClass('bh-more-open');
    $(document).off('click.bhTools keydown.bhTools');
}

function toggleToolsMenu($panel) {
    if ($panel.find('.beholder-tools-menu').length) { closeToolsMenu($panel); return; }
    const items = HEADER_TOOLS.map(t =>
        `<button class="beholder-tools-item" data-view="${t.view}" role="menuitem">
            <i class="fa-solid ${t.icon}"></i><span>${t.label}</span>
        </button>`
    ).join('');
    const $menu = $(`<div class="beholder-tools-menu" role="menu">${items}</div>`);
    $panel.find('.beholder-tools-more').addClass('bh-more-open');
    $panel.find('.beholder-panel-header').append($menu);
    $menu.on('mousedown', (e) => e.stopPropagation());
    $menu.find('.beholder-tools-item').on('click', function (e) {
        e.stopPropagation();
        const view = $(this).data('view');
        closeToolsMenu($panel);
        openView(view);
    });
    // Close on outside click or Escape. Bind on the next tick so the click
    // that opened the menu doesn't immediately close it.
    setTimeout(() => {
        $(document).on('click.bhTools', (e) => {
            if (!$(e.target).closest('.beholder-tools-menu, .beholder-tools-more').length) closeToolsMenu($panel);
        });
        $(document).on('keydown.bhTools', (e) => { if (e.key === 'Escape') closeToolsMenu($panel); });
    }, 0);
}

function wireControls($panel, settings, save, onClose) {
    $panel.find('.beholder-close').on('click', () => {
        $panel.hide();
        settings.panel = settings.panel || {};
        settings.panel.visible = false;
        save();
        onClose?.();
    });
    // Header tool icons (settings/doctor/inspector/help) → open the matching
    // view overlay (built + managed by views.js). mousedown stopPropagation so a
    // click on a tool icon doesn't start a header drag.
    $panel.find('.beholder-tool-btn')
        .on('mousedown', (e) => e.stopPropagation())
        .on('click', function (e) {
            e.stopPropagation();
            openView($(this).data('view'));
        })
        .on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openView($(this).data('view')); }
        });
    // Narrow-mode `⋯` trigger → open/close the tools dropdown.
    $panel.find('.beholder-tools-more')
        .on('mousedown', (e) => e.stopPropagation())
        .on('click', (e) => { e.stopPropagation(); toggleToolsMenu($panel); })
        .on('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleToolsMenu($panel); }
        });
    // Independent layer toggles. Names + silhouette + multi-slot tags are the
    // always-on base; each checkbox flips one hide flag on the panel.
    //   Color   — color word annotation on chips (swatch is always-on identity)
    //   Damage  — damage-tier visuals (chip dots, card borders, body fills) + word
    //   Wounds  — wound chips + bleeding + severity dots + body-part wound fills
    const LAYER_KEYS = ['color', 'damage', 'wounds'];
    settings.panel = settings.panel || {};
    if (!settings.panel.viewLayers || typeof settings.panel.viewLayers !== 'object') {
        const lvl = Number(settings.panel.viewLevel);
        const fromLvl = Number.isFinite(lvl) && lvl >= 1 && lvl <= 5
            ? { color: lvl >= 2, damage: lvl >= 3, wounds: lvl >= 4 }
            : { color: true, damage: true, wounds: true };
        settings.panel.viewLayers = fromLvl;
        delete settings.panel.viewLevel;
    }
    // Strip any stale `meta` key from previously-saved viewLayers.
    if ('meta' in settings.panel.viewLayers) delete settings.panel.viewLayers.meta;
    const applyView = () => {
        const layers = settings.panel.viewLayers;
        for (const k of LAYER_KEYS) $panel.toggleClass(`bh-hide-${k}`, !layers[k]);
    };
    for (const k of LAYER_KEYS) {
        $panel.find(`input[name="bh-view-layer"][value="${k}"]`).prop('checked', !!settings.panel.viewLayers[k]);
    }
    applyView();
    $panel.find('input[name="bh-view-layer"]').on('change', function () {
        settings.panel.viewLayers[this.value] = this.checked;
        save();
        applyView();
    });
}

// Track last rendered state so tab clicks + front/back toggle can re-render
// without callers needing to feed the state back in. Updated by renderPanel.
let lastState = null;
// Live settings accessor, captured at mount. renderPanel reads settings.layout
// from it each render so the doll grid (paperdoll.setDollLayout) and the
// compact-list class stay derived from the single persisted source of truth.
let getSettingsFn = null;
// Track which character tab the user picked. Reset per-chat by panel mount.
let activeCharName = null;
// Characters whose state changed since last viewed (i.e., not the active tab).
// Drives the accent-dot badge on tabs so multi-char RP testers can see that
// off-screen characters' state evolved.
let unviewedUpdates = new Set();
// Front/back silhouette view per character — back view is the only way to
// visually inspect back-slot wounds. Keyed by char name so each char's view
// preference persists across tab switches.
let viewByChar = new Map();

function wireTabs($panel) {
    $panel.find('.bh-tabs').off('click').on('click', '.bh-tab', function () {
        activeCharName = $(this).data('char');
        unviewedUpdates.delete(activeCharName);   // user just viewed; clear badge
        if (lastState) renderPanel(lastState);
    });
    // Front/back toggle under the silhouette
    $panel.find('.bh-figure-controls').off('click').on('click', '.bh-view-toggle', function () {
        const char = $(this).data('char');
        const cur = viewByChar.get(char) || 'front';
        viewByChar.set(char, cur === 'front' ? 'back' : 'front');
        if (lastState) renderPanel(lastState);
    });
}

/**
 * Hover-link: mousing over a body part highlights its slot rows in the
 * side columns, and vice versa. Visually anchors "this row is THIS part."
 * Re-applied on every render because the body HTML is rebuilt each time.
 */
function wireHoverLink($panel) {
    const $body = $panel.find('.beholder-panel-body');
    const clearAll = () => {
        $body.find('.bh-part.bh-hover-link').removeClass('bh-hover-link');
        $body.find('.bh-slot-card.bh-hover-link').removeClass('bh-hover-link');
    };
    $body.off('mouseenter.bhhover mouseleave.bhhover')
        // Hover a body part → highlight the matching slot card.
        .on('mouseenter.bhhover', '.bh-part', function () {
            const slot = $(this).attr('data-slot');
            if (!slot) return;
            $(this).addClass('bh-hover-link');
            $body.find(`.bh-slot-card[data-slots~="${slot}"]`).addClass('bh-hover-link');
        })
        .on('mouseleave.bhhover', '.bh-part', clearAll)
        // Hover a slot card → highlight the matching body part.
        .on('mouseenter.bhhover', '.bh-slot-card', function () {
            const slots = ($(this).attr('data-slots') || '').split(/\s+/).filter(Boolean);
            $(this).addClass('bh-hover-link');
            for (const s of slots) {
                $body.find(`.bh-part[data-slot="${s}"]`).addClass('bh-hover-link');
            }
        })
        .on('mouseleave.bhhover', '.bh-slot-card', clearAll);
}

// ─── Backfill status strip + header button ────────────────────────────────
// The status strip lives between the header and the layer bar. It hosts EITHER
// an offer banner (detect-and-offer on chat change) OR a progress strip with
// a cancel button (during a backfill run). index.js drives this through the
// API returned from mountPanel.

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// The header "history" control is a split button:
//   - the clock icon = default action (incremental build = seed if missing + walk)
//   - the caret      = opens a small menu with "Re-seed from card" and
//                       "Rebuild from scratch" (the two less-frequent ops)
// Menu is positioned absolute under the caret, closes on outside click or Esc.
function wireBackfillButton($panel, onBackfillRun) {
    const dispatch = (mode) => {
        if (typeof onBackfillRun === 'function') onBackfillRun(mode);
    };

    $panel.find('.beholder-backfill-btn').off('click').on('click', (e) => {
        e.stopPropagation();
        closeMenu($panel);
        dispatch('build');
    });

    $panel.find('.beholder-backfill-more').off('click').on('click', (e) => {
        e.stopPropagation();
        toggleMenu($panel, dispatch);
    });
}

function closeMenu($panel) {
    $('.beholder-bf-menu').remove();
    $panel.find('.beholder-backfill-group').removeClass('bh-menu-open');
    $(document).off('click.bhBfMenu keydown.bhBfMenu');
    $(window).off('scroll.bhBfMenu resize.bhBfMenu');
}

function toggleMenu($panel, dispatch) {
    if ($('.beholder-bf-menu').length) {
        closeMenu($panel);
        return;
    }
    const $group = $panel.find('.beholder-backfill-group').addClass('bh-menu-open');
    const $menu = $(`
        <div class="beholder-bf-menu" role="menu">
            <button class="bh-bf-mode" data-mode="build" role="menuitem">
                <i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
                <span class="bh-bf-mode-text">
                    <span class="bh-bf-mode-title">Build from history</span>
                    <span class="bh-bf-mode-sub">add card seed if missing, walk un-processed messages</span>
                </span>
            </button>
            <button class="bh-bf-mode" data-mode="seed" role="menuitem">
                <i class="fa-solid fa-id-badge" aria-hidden="true"></i>
                <span class="bh-bf-mode-text">
                    <span class="bh-bf-mode-title">Re-seed from card</span>
                    <span class="bh-bf-mode-sub">re-extract initial state from character + persona description only</span>
                </span>
            </button>
            <button class="bh-bf-mode bh-bf-mode-danger" data-mode="rebuild" role="menuitem">
                <i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>
                <span class="bh-bf-mode-text">
                    <span class="bh-bf-mode-title">Rebuild from scratch</span>
                    <span class="bh-bf-mode-sub">clear all deltas, re-seed from card, re-process every AI message</span>
                </span>
            </button>
        </div>
    `);
    // Render to <body> (not inside the panel) with fixed positioning so the
    // panel's overflow:hidden can't clip the menu; then clamp into the viewport.
    $('body').append($menu);
    const anchor = $group[0] || $panel.find('.beholder-backfill-more')[0];
    const r = anchor.getBoundingClientRect();
    const pr = $panel[0].getBoundingClientRect();
    const mw = $menu.outerWidth();
    const mh = $menu.outerHeight();
    // Centered horizontally on the panel (not hugging the left/right edge),
    // dropped just below the caret; clamped into the viewport.
    let left = pr.left + (pr.width - mw) / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - mw - 8));
    let top = r.bottom + 6;
    if (top + mh > window.innerHeight - 8) top = Math.max(8, r.top - 6 - mh);
    $menu.css({ top: `${top}px`, left: `${left}px` });

    $menu.find('.bh-bf-mode').on('click', function (e) {
        e.stopPropagation();
        const mode = $(this).attr('data-mode');
        closeMenu($panel);
        dispatch(mode);
    });

    // Close on outside click / Escape / scroll / resize. Bind next tick so the
    // opening click doesn't immediately close it.
    setTimeout(() => {
        $(document).on('click.bhBfMenu', (e) => {
            if (!$(e.target).closest('.beholder-bf-menu,.beholder-backfill-group').length) {
                closeMenu($panel);
            }
        });
        $(document).on('keydown.bhBfMenu', (e) => {
            if (e.key === 'Escape') closeMenu($panel);
        });
        $(window).on('scroll.bhBfMenu resize.bhBfMenu', () => closeMenu($panel));
    }, 0);
}

function makeBackfillApi($panel) {
    const $status = $panel.find('.beholder-backfill-status');

    const setProgress = ({ done, total, inFlight, onCancel }) => {
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const label = inFlight
            ? `<i class="fa-solid fa-spinner fa-spin"></i> Building history — extracting <b>${escapeHtml(Math.min(done + 1, total))}</b> / ${escapeHtml(total)}…`
            : `Building history: <b>${escapeHtml(done)}</b> / ${escapeHtml(total)}`;
        $status.html(`
            <div class="bh-bf-progress" role="status" aria-live="polite">
                <span class="bh-bf-text">${label}</span>
                <span class="bh-bf-bar"><span class="bh-bf-bar-fill" style="width:${pct}%"></span></span>
                <button class="bh-btn bh-bf-cancel">Cancel</button>
            </div>
        `).prop('hidden', false);
        $status.find('.bh-bf-cancel').off('click').on('click', () => { try { onCancel?.(); } catch { /* ignore */ } });
    };

    const clearStatus = () => {
        $status.empty().prop('hidden', true);
    };

    return {
        setBackfillProgress: setProgress,
        clearBackfillStatus: clearStatus,
    };
}

export function mountPanel({
    settings, save, onClose, onBackfillRun,
    getState, getCapture, getSettings, saveSettings,
    probeEndpoint, getDoctorVitals, clearChatState,
    getLocks, setLock, getUserEdited, markUserEdited, applyUserEdit,
    getCharacters, addAlias, removeAlias, setCharHidden, setCharOrder,
    // ── Browser-model (local WebLLM) lifecycle bindings, supplied by index.js ──
    // The host owns ALL transport/engine state; views.js is a pure consumer that
    // reads + drives it through these callbacks. panel.js only forwards them.
    getBrowserModelState, getReadiness, isModelConfigured, getModelInfo,
    onDownloadModel, onEnableBrowserModel, onDisableBrowserModel,
    getUpdateInfo, onCheckUpdate, onUpdateModel,
    refreshBrowserCard: refreshBrowserCardCb, onBannerAction,
}) {
    const $panel = ensurePanelDom();
    settings.panel = settings.panel || { visible: true, collapsed: false, pos: null };
    if (typeof settings.panel.height === 'number' && settings.panel.height >= 200) {
        $panel.css({ height: settings.panel.height + 'px' });
        $panel.attr('data-resized', 'true');
    }
    applyPosition($panel, settings.panel.pos);
    $panel.toggleClass('beholder-collapsed', !!settings.panel.collapsed);
    $panel.toggle(settings.panel.visible !== false);
    wireDrag($panel, settings, save);
    wireResize($panel, settings, save);
    wireControls($panel, settings, save, onClose);
    wireBackfillButton($panel, onBackfillRun);
    getSettingsFn = getSettings || null;
    // Apply the "Match SillyTavern theme accent" preference at init. The Settings
    // view's checkbox change handler sets this inline property when toggled, but
    // it must also be applied on panel load so a previously-saved preference
    // takes effect without re-opening Settings. Mirrors the views.js handler.
    {
        const accentPref = getSettings?.()?.matchThemeAccent;
        if (accentPref) {
            $panel[0].style.setProperty('--bh-accent-pref', 'var(--SmartThemeQuoteColor, #88aaff)');
        } else {
            $panel[0].style.removeProperty('--bh-accent-pref');
        }
    }
    // Wire the view overlays (Settings / Doctor / Inspector / Help) + the
    // slot editor + card decorations. views.js owns those surfaces; it reads
    // and writes live state through these callbacks (supplied by index.js).
    installViews({
        getState: getState || (() => lastState),
        rerender: () => renderPanel(lastState),
        getSettings, saveSettings, getCapture,
        probeEndpoint, getDoctorVitals, clearChatState,
        getLocks, setLock, getUserEdited, markUserEdited, applyUserEdit,
        getCharacters, addAlias, removeAlias, setCharHidden, setCharOrder,
        setDollLayout,
        // ── Browser-model lifecycle (forwarded straight through) ──
        // views.js wires the Local-model card's primary button + the no-model
        // banner's action buttons to these. All transport access is host-side;
        // views.js never imports engine/*.
        getBrowserModelState, getReadiness, isModelConfigured, getModelInfo,
        onDownloadModel, onEnableBrowserModel, onDisableBrowserModel,
        getUpdateInfo, onCheckUpdate, onUpdateModel,
        onBannerAction,
    });
    // Initial render so the panel shows its full-size default-human placeholder
    // immediately on mount (before any message / chat-load event fires a render).
    renderPanel(getState ? getState() : (lastState || {}));
    if (!settings.panel.onboarded && settings.panel.visible !== false) {
        // Defer a beat so the panel finishes positioning before the popover anchors to it.
        setTimeout(() => showOnboardingPopover(settings, save), 800);
    }
    // The returned API is index.js's handle to drive panel-owned UI it doesn't
    // build itself: the backfill strip (existing) plus the no-model banner and
    // the Local-model card refresh (both owned by views.js, re-exported here so
    // the host has a single panel API surface). `refreshBrowserCardCb` is the
    // optional host-side hook; the host normally just calls the returned
    // refreshBrowserCard() to have views.js re-render from current state.
    void refreshBrowserCardCb;
    return {
        ...makeBackfillApi($panel),
        setNoModelBanner,
        refreshBrowserCard,
        showUpdateDialog,
        // Deep-linkable Settings opener (focus: 'endpoint' | 'model', startDownload).
        openSettings: (opts) => openView('settings', opts),
    };
}

/**
 * One-time onboarding popover: explains what Beholder is + the basic controls
 * so a brand-new tester doesn't have to ask "what is this thing for?".
 * Per the UX research: this is the single highest-leverage first-impression
 * intervention. Dismissed → `settings.panel.onboarded = true`, never shown again.
 */
function showOnboardingPopover(settings, save) {
    if (settings.panel.onboarded) return;
    const $panel = $(`#${PANEL_ID}`);
    if (!$panel.length || !$panel.is(':visible')) return;
    const rect = $panel[0].getBoundingClientRect();

    const $tip = $(`
        <div id="beholder_onboard" class="beholder-onboard">
            <div class="bh-onboard-arrow"></div>
            <div class="bh-onboard-head">
                <span class="bh-onboard-title">◉ Beholder</span>
                <span class="bh-onboard-close fa-solid fa-xmark" title="Dismiss"></span>
            </div>
            <div class="bh-onboard-body">
                Tracks what each character is <b>wearing</b>, <b>holding</b>, and
                their <b>wounds</b>. Updates after every AI message; the
                silhouette colors tell you what's damaged where.
                <ul class="bh-onboard-tips">
                    <li><b>Drag</b> the title bar to move.</li>
                    <li><b>Front ⇄ Back</b> button flips the view (back wounds).</li>
                    <li><b>Tap a slot</b> to edit or lock it.</li>
                    <li>Multi-char chats add tabs at the top.</li>
                </ul>
            </div>
            <div class="bh-onboard-foot">
                <button class="bh-onboard-dismiss menu_button">Got it</button>
            </div>
        </div>
    `);
    // Anchor to the left of the panel (panel is bottom-right by default; if
    // panel is on the left side, mirror to the right). Stay within viewport.
    const tipW = 320;
    const placeLeft = rect.left >= tipW + 20;
    $tip.css({
        position: 'fixed',
        zIndex: 9100,
        top: Math.max(20, rect.top) + 'px',
        [placeLeft ? 'right' : 'left']:
            (placeLeft ? (window.innerWidth - rect.left + 12) : (rect.right + 12)) + 'px',
        width: tipW + 'px',
    });
    $tip.attr('data-side', placeLeft ? 'right' : 'left');
    $('body').append($tip);

    const dismiss = () => {
        $tip.remove();
        settings.panel.onboarded = true;
        save();
    };
    $tip.find('.bh-onboard-close, .bh-onboard-dismiss').on('click', dismiss);
}

export function renderPanel(state) {
    const next = state || {};

    // Compute which characters changed since last render. We rely on
    // applyDelta's immutability — touched chars get new object references.
    // Reference-different OR new = updated. Cleared if char is removed.
    if (lastState) {
        for (const [name, st] of Object.entries(next)) {
            if (lastState[name] !== st) unviewedUpdates.add(name);
        }
        // Drop chars that no longer exist (e.g., after "Clear chat state")
        for (const name of [...unviewedUpdates]) {
            if (!(name in next)) unviewedUpdates.delete(name);
        }
    }

    lastState = next;
    const $panel = $(`#${PANEL_ID}`);
    const $body = $panel.find('.beholder-panel-body');
    if (!$body.length) return;

    // No-state renders a full-size default-human placeholder (built by
    // renderDollPanel) instead of collapsing to a chip — so the panel shows at
    // its real size immediately, with all header tools visible. data-empty is
    // kept only to mute the placeholder name + caption and drop its view
    // controls via CSS.
    const isEmpty = Object.keys(next).length === 0;
    $panel.attr('data-empty', isEmpty ? 'true' : 'false');
    if (isEmpty) unviewedUpdates.clear();

    // Apply the persisted layout BEFORE building the doll so the grid is
    // emitted natively in the right shape. settings.layout is the single source
    // of truth (paired | columns | list); paperdoll reads it via setDollLayout,
    // and the compact-list class is derived from it. Narrow viewports still
    // auto-switch to the list via @container queries (style.css).
    const layout = ['paired', 'columns', 'list'].includes(getSettingsFn?.()?.layout)
        ? getSettingsFn().layout : 'paired';
    setDollLayout(layout);
    $panel.toggleClass('bh-layout-compact', layout === 'list');

    // Active char's updates are already viewed by
    // definition, so omit it from the unviewed set passed to the renderer.
    const unviewedForRender = new Set(unviewedUpdates);
    if (activeCharName) unviewedForRender.delete(activeCharName);
    const view = activeCharName ? (viewByChar.get(activeCharName) || 'front') : 'front';
    const { html, activeName } = renderDollPanel(next, activeCharName, unviewedForRender, view);
    activeCharName = activeName;
    unviewedUpdates.delete(activeName);   // viewing this tab now
    $body.html(html);
    wireTabs($panel);
    wireHoverLink($panel);
    // Re-bind views.js card decorations (locks + user-edited marks), slot-edit
    // delegation, and the paperdoll-emitted layout-switch / "Edit slots" click
    // handlers after every render (the body HTML is rebuilt each time). Replaces
    // the old MutationObserver-driven re-decoration.
    onPanelRendered();
}

export function setPanelVisible(visible) {
    const $panel = $(`#${PANEL_ID}`);
    if (!$panel.length) return;
    $panel.toggle(!!visible);
}
