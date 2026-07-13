/**
 * Beholder — panel backend surfaces.
 *
 * Implements the panel's "backend" surfaces on top of the live panel.js DOM:
 *
 *   · header tool icons → Settings / Doctor / Inspector / Help views
 *   · tap a slot card    → schema-aware slot editor + per-slot lock
 *   · "Edit slots"       → mobile/list bottom sheet (slot picker → editor)
 *   · toast + note-box helpers
 *
 * Views render in an overlay INSIDE the panel (the header stays visible), so the
 * live state keeps rendering underneath and nothing fights renderPanel().
 *
 * This module is a pure consumer of an injected context (see installViews):
 * settings, runtime probes, the extraction capture buffer, the lock store, and
 * the user-delta apply path all live in the host extension. views.js owns only
 * the UI; it never persists state or mutates the live tree directly.
 */

/* global $ */

import { familyOf, OFF_BODY_SLOTS } from './paperdoll.js';
import { lockKey } from './state.js';

// ─── Schema vocab the slot editor needs ───────────────────────────────────
// Damage display vocabulary (the panel's tier ramp, matching the silhouette
// renderer); severity + the 16-color palette for wounds and worn/held items.
const DAMAGE_VALUES = ['pristine', 'damaged', 'broken'];
const SEVERITY_VALUES = ['minor', 'serious', 'critical'];
const COLOR_VALUES = [
    '', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown',
    'black', 'white', 'gray', 'beige', 'gold', 'silver', 'navy', 'tan',
];
const HAND_SLOTS = new Set(['left_hand', 'right_hand']);

function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ─── Toast ─────────────────────────────────────────────────────────────────
let toastTimer = null;
export function toast(msg, ms = 2600) {
    let el = document.querySelector('.bh-toast');
    if (!el) {
        el = document.createElement('div');
        el.className = 'bh-toast';
        document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add('bh-toast-in'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('bh-toast-in'), ms);
}

async function copyText(text, okMsg) {
    try {
        await navigator.clipboard.writeText(text);
        toast(okMsg || 'Copied to clipboard');
    } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        toast(okMsg || 'Copied to clipboard');
    }
}

// sha256[:12] of a string, for the Inspector/Doctor system-prompt fingerprint.
async function sha12(text) {
    try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 12);
    } catch {
        return '(sha unavailable)';
    }
}
function commaNum(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── Install ───────────────────────────────────────────────────────────────
// ctx = {
//   getState, rerender, getSettings, saveSettings, getCapture,
//   probeEndpoint, getDoctorVitals, clearChatState, sweepChatState,
//   getLocks, setLock, getUserEdited, markUserEdited, applyUserEdit,
//   setDollLayout,
//   // ── Browser-model (local WebLLM) lifecycle, all host-owned ──
//   // views.js NEVER imports engine/*; every probe / transport touch is via
//   // these callbacks the host (index.js) supplies through panel.js.
//   getBrowserModelState,    // () -> 'unconfigured'|'unsupported'|'not-downloaded'
//                            //       |'downloading'|'ready-disabled'|'ready-enabled'|'error'
//   getReadiness,            // () -> { gpu, disk, ram, cpu } (cached probe results)
//   isModelConfigured,       // () -> boolean
//   getModelInfo,            // () -> { modelId, version, approxDownloadMB }
//   onDownloadModel,         // (onProgress) -> Promise   (onProgress({pct,text}))
//   onEnableBrowserModel,    // () -> Promise
//   onDisableBrowserModel,   // () -> Promise
//   onBannerAction,          // (id:'enable'|'endpoint') -> void
// }
let ctx = null;

export function installViews(options) {
    ctx = options;
    const $panel = $('#beholder_panel');
    if (!$panel.length) return;
    // Header tools + layout-switch markup are emitted natively by the host
    // (panel.js / paperdoll.js); this module wires behavior on demand.
    ensureNoModelBanner($panel);
    onPanelRendered();
}

// ─── Lock / user-edit accessors (host-owned store) ─────────────────────────
// The lock + user-edited sets live in the host's persisted chat metadata so
// they survive reload and can filter model deltas. Keys are built via the
// shared lockKey(char, slot) helper from state.js so the display layer and the
// canonical store agree (locks silently fail to match otherwise).
function locksHas(key) {
    const locks = ctx?.getLocks?.() || [];
    return Array.isArray(locks) ? locks.includes(key) : !!(locks.has && locks.has(key));
}
function editedHas(key) {
    const edited = ctx?.getUserEdited?.() || [];
    return Array.isArray(edited) ? edited.includes(key) : !!(edited.has && edited.has(key));
}

// ─── View overlay ──────────────────────────────────────────────────────────
const VIEW_BUILDERS = {
    settings: buildSettingsView,
    characters: buildCharactersView,
    doctor: buildDoctorView,
    inspector: buildInspectorView,
    help: buildHelpView,
};
const VIEW_TITLES = {
    settings: 'Settings', characters: 'Characters', doctor: 'Doctor', inspector: 'Inspector', help: 'Help',
};

export function openView(name, opts) {
    const $panel = $('#beholder_panel');
    closeView();
    closeEditor();
    const $view = $(`
        <div class="bh-view" data-view="${name}">
            <div class="bh-view-head">
                <span class="bh-view-back fa-solid fa-arrow-left" title="Back to the panel"></span>
                <span class="bh-view-title"><span class="bh-view-crumb">◉</span>${VIEW_TITLES[name]}</span>
            </div>
            <div class="bh-view-body"></div>
        </div>
    `);
    VIEW_BUILDERS[name]($view.find('.bh-view-body'));
    $panel.append($view);
    $view.find('.bh-view-back').on('click', closeView);
    // Swallow mousedown on the scrollable body so a drag can't start there, but
    // LET the head bar bubble — panel.js wires it as a drag grip (the overlay
    // covers the panel header, so the view's own head must move the panel).
    $view.on('mousedown', (e) => {
        if (!$(e.target).closest('.bh-view-head').length) e.stopPropagation();
    });
    $(document).on('keydown.bhView', (e) => { if (e.key === 'Escape') closeView(); });

    // Optional deep-link focus. The no-model banner's "set endpoint" action
    // opens Settings here; expand the collapsed Advanced-endpoint block and
    // scroll/focus it so the user lands on the field they need.
    if (name === 'settings' && opts?.focus === 'endpoint') {
        const $adv = $view.find('.bh-adv-endpoint');
        $adv.prop('open', true);
        const $ep = $view.find('#bhp-endpoint');
        setTimeout(() => {
            $ep.length && $ep[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
            $ep.trigger('focus');
        }, 60);
    }
    // The no-model banner's "Download / Set up browser model" action lands here:
    // scroll to the Local-model card and (when nothing's downloaded yet) auto-start
    // the download so its progress is actually visible.
    if (name === 'settings' && opts?.focus === 'model') {
        setTimeout(() => {
            const $card = $view.find('#bhp-lmcard');
            $card.length && $card[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
            if (opts.startDownload) {
                const $dl = $card.find('.bh-lm-btn[data-action="download"]');
                if ($dl.length) $dl.trigger('click');
            }
        }, 80);
    }
}

export function closeView() {
    $('#beholder_panel .bh-view').remove();
    $(document).off('keydown.bhView');
}

// ─── Characters view (roster: reorder · hide · merge) ──────────────────────
// A glanceable roster over the host's character-override layer — reads a snapshot
// via ctx.getCharacters() and drives every change through the host setters
// (addAlias / removeAlias / setCharHidden / setCharOrder). views.js never holds
// canonical state. Self-explanatory by design: drag to reorder (you're starred +
// first), eye to hide, link to say "same as <name>" (merged spellings show as
// removable chips under the name). Re-renders its own body after each action.
function buildCharactersView($body) {
    const refresh = () => buildCharactersView($body);
    const d = ctx?.getCharacters?.() || { persona: null, visible: [], hidden: [], aliasesChat: {}, aliasesGlobal: {} };

    // Variants merged INTO a canonical, from both books — shown inline as chips.
    const variantsOf = (name) => {
        const out = [];
        for (const [scope, book] of [['chat', d.aliasesChat], ['global', d.aliasesGlobal]]) {
            for (const v of (book?.[name] || [])) out.push({ v, scope });
        }
        return out;
    };

    const row = (name) => {
        const you = name === d.persona;
        const chips = variantsOf(name).map(({ v, scope }) =>
            `<span class="bh-ch-alias" data-variant="${esc(v)}" data-scope="${scope}">${esc(v)}<i class="fa-solid fa-xmark" title="Unmerge"></i></span>`).join('');
        return `<li class="bh-ch${you ? ' bh-ch-you' : ''}" draggable="true" data-name="${esc(name)}">
            <i class="bh-ch-grip fa-solid fa-grip-vertical" title="Drag to reorder"></i>
            <span class="bh-ch-main">
                <span class="bh-ch-name">${you ? '<i class="fa-solid fa-star bh-ch-star" title="You"></i> ' : ''}${esc(name)}</span>
                ${chips ? `<span class="bh-ch-aliases">${chips}</span>` : ''}
            </span>
            <span class="bh-ch-tools">
                <i class="bh-ch-merge fa-solid fa-link" title="Same as another character"></i>
                <i class="bh-ch-hide fa-solid fa-eye" title="Hide"></i>
            </span>
        </li>`;
    };

    const hiddenRow = (name) =>
        `<li class="bh-ch bh-ch-hidden" data-name="${esc(name)}">
            <span class="bh-ch-main"><span class="bh-ch-name">${esc(name)}</span></span>
            <span class="bh-ch-tools"><i class="bh-ch-unhide fa-solid fa-eye-slash" title="Show"></i></span>
        </li>`;

    $body.html(`
        <ul class="bh-ch-list">${d.visible.map(row).join('') || '<li class="bh-ch-empty">No one tracked yet.</li>'}</ul>
        ${d.hidden.length ? `<div class="bh-ch-tray"><span class="bh-ch-tray-cap">Hidden</span>
            <ul class="bh-ch-list">${d.hidden.map(hiddenRow).join('')}</ul></div>` : ''}
    `);

    // hide / unhide
    $body.find('.bh-ch-hide').on('click', function (e) {
        e.stopPropagation();
        ctx?.setCharHidden?.(String($(this).closest('.bh-ch').data('name')), true); refresh();
    });
    $body.find('.bh-ch-unhide').on('click', function (e) {
        e.stopPropagation();
        ctx?.setCharHidden?.(String($(this).closest('.bh-ch').data('name')), false); refresh();
    });
    // unmerge a variant chip
    $body.find('.bh-ch-alias .fa-xmark').on('click', function (e) {
        e.stopPropagation();
        const $a = $(this).closest('.bh-ch-alias');
        const canonical = String($(this).closest('.bh-ch').data('name'));
        ctx?.removeAlias?.(String($a.data('variant')), canonical, { global: $a.data('scope') === 'global' });
        refresh();
    });
    // merge: tap the link → inline picker of the OTHER tracked names (tap one = "same
    // as that"). Defaults to a global alias (a recurring character is the same person
    // everywhere); the per-chat book stays available via the data model.
    $body.find('.bh-ch-merge').on('click', function (e) {
        e.stopPropagation();
        const $r = $(this).closest('.bh-ch');
        if ($r.find('.bh-ch-pick').length) { $r.find('.bh-ch-pick').remove(); return; }
        const name = String($r.data('name'));
        const pills = d.visible.filter(n => n !== name)
            .map(n => `<button class="bh-ch-pill" type="button" data-target="${esc(n)}">${esc(n)}</button>`).join('');
        const $pick = $(`<div class="bh-ch-pick">
            <span class="bh-ch-pick-lead">is</span>${pills}
            <input class="bh-ch-pick-input" placeholder="someone else…" />
        </div>`);
        $r.append($pick);
        const merge = (target) => {
            target = String(target || '').trim();
            if (target && target.toLowerCase() !== name.toLowerCase()) ctx?.addAlias?.(name, target, { global: true });
            refresh();
        };
        $pick.find('.bh-ch-pill').on('click', function () { merge($(this).data('target')); });
        const $inp = $pick.find('.bh-ch-pick-input');
        $inp.on('keydown', (ev) => { if (ev.key === 'Enter') merge($inp.val()); else if (ev.key === 'Escape') $pick.remove(); });
        setTimeout(() => $inp.trigger('focus'), 0);
    });

    wireCharDrag($body);
}

// HTML5 drag-reorder for the visible roster rows → host.setCharOrder(newOrder).
function wireCharDrag($body) {
    const $list = $body.find('.bh-ch-list').first();
    let dragName = null;
    $list.find('.bh-ch[draggable="true"]').each(function () {
        this.addEventListener('dragstart', (e) => {
            dragName = String($(this).data('name'));
            this.classList.add('bh-ch-dragging');
            try { e.dataTransfer.effectAllowed = 'move'; } catch { /* some browsers */ }
        });
        this.addEventListener('dragend', () => {
            this.classList.remove('bh-ch-dragging');
            $list.find('.bh-ch-dropzone').removeClass('bh-ch-dropzone');
        });
        this.addEventListener('dragover', (e) => { e.preventDefault(); $(this).addClass('bh-ch-dropzone'); });
        this.addEventListener('dragleave', () => $(this).removeClass('bh-ch-dropzone'));
        this.addEventListener('drop', (e) => {
            e.preventDefault();
            $(this).removeClass('bh-ch-dropzone');
            const targetName = String($(this).data('name'));
            if (!dragName || dragName === targetName) return;
            const $drag = $list.find('.bh-ch').filter((i, el) => String($(el).data('name')) === dragName).first();
            $(this).before($drag);
            const order = $list.find('.bh-ch').map(function () { return String($(this).data('name')); }).get();
            ctx?.setCharOrder?.(order);
        });
    });
}

// ─── Settings view ─────────────────────────────────────────────────────────
function buildSettingsView($body) {
    const s = ctx?.getSettings?.() || {};
    $body.html(`
        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-plug"></i> Connection</summary>
            <div class="bh-vsection-body">
                <div class="bh-localmodel-card" id="bhp-lmcard"></div>

                <details class="bh-adv-endpoint">
                    <summary><i class="fa-solid fa-sliders"></i> Advanced: custom endpoint
                        <small style="opacity:.6;">(overrides the browser model)</small></summary>
                    <div class="bh-adv-endpoint-body">
                        <p class="bh-help" style="opacity:.6; font-size:.85em; margin:2px 0 8px;">
                            Point Beholder at any OpenAI-compatible extractor server. Easiest local option: run the
                            <a href="https://huggingface.co/GetBeholder/Beholder-GGUF" target="_blank" rel="noopener">Beholder&nbsp;GGUF</a>
                            in llama.cpp / LM&nbsp;Studio / Ollama and paste its URL (e.g. <code>http://localhost:8080/v1</code>),
                            or use any remote server. Leave blank to use the in-browser model above — a custom endpoint always wins.</p>
                        <div class="bh-field">
                            <label for="bhp-endpoint">Extractor endpoint</label>
                            <input id="bhp-endpoint" class="bh-input" type="text" value="${esc(s.endpoint)}" placeholder="http://localhost:8080/v1  ·  blank = use browser model">
                        </div>
                        <div class="bh-field">
                            <label for="bhp-model">Model name</label>
                            <input id="bhp-model" class="bh-input" type="text" value="${esc(s.model)}" placeholder="ChatML">
                        </div>
                        <div class="bh-field">
                            <label for="bhp-key">API key <i style="opacity:.5">(optional)</i></label>
                            <input id="bhp-key" class="bh-input" type="password" value="${esc(s.apiKey)}" placeholder="blank for local servers">
                        </div>
                        <div class="bh-row-actions">
                            <button class="bh-btn bh-btn-primary" id="bhp-test"><i class="fa-solid fa-bolt"></i> Test connection</button>
                            <span class="bh-conn-status" id="bhp-conn"><span class="bh-dot"></span><span>not tested</span></span>
                        </div>
                    </div>
                </details>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-wand-magic-sparkles"></i> Extraction &amp; prompt</summary>
            <div class="bh-vsection-body">
                <label class="bh-check">
                    <input type="checkbox" id="bhp-inferred" ${s.inferredColors ? 'checked' : ''}>
                    <span>Show inferred colors
                        <small>When the model guesses a plausible color ("leather belt" → brown) instead of reading one from the prose. Off = explicit colors only.</small></span>
                </label>
                <label class="bh-check">
                    <input type="checkbox" id="bhp-validator" ${s.validator?.enabled !== false ? 'checked' : ''}>
                    <span>Validator
                        <small>Strips structurally-unlikely model output (e.g. an eyepatch worn on a hand) before it reaches the doll. Turn OFF to apply raw model output (A/B). Per-turn findings appear in the Inspector tab. Takes effect on the next message.</small></span>
                </label>
                <div class="bh-field">
                    <label for="bhp-inject">Inject state into prompt as</label>
                    <select id="bhp-inject" class="bh-select">
                        <!-- Front-of-context positions (BEFORE_PROMPT / IN_PROMPT) are
                             deliberately NOT offered: a state block that changes each turn
                             at the front re-prefills the WHOLE context every time (a full
                             50k+ reprocess on a large-context / SWA local model). State is
                             always injected near generation. -->
                        <option value="IN_CHAT" ${s.injectionPosition === 'IN_CHAT' ? 'selected' : ''}>In-chat at depth (recommended)</option>
                        <option value="NONE" ${s.injectionPosition === 'NONE' ? 'selected' : ''}>Don't inject (track only)</option>
                    </select>
                </div>
                <div class="bh-field">
                    <label for="bhp-depth">Injection depth (in-chat only; 0 = after last msg, 1 = before it)</label>
                    <input id="bhp-depth" class="bh-input" type="number" min="0" max="100" step="1" value="${esc(s.injectionDepth)}">
                </div>
                <div class="bh-field">
                    <label for="bhp-concurrency">Endpoint concurrency (max parallel requests)</label>
                    <input id="bhp-concurrency" class="bh-input" type="number" min="1" max="64" step="1" value="${esc(s.concurrency ?? 1)}">
                    <small style="opacity:.6">Keep at <b>1</b> for a single-slot local server (KoboldCpp / llama.cpp) — it processes one at a time, so higher only risks "server busy" 503s. Raise it only for endpoints that truly parallelise (vLLM / multi-slot).</small>
                </div>
            </div>
        </details>

    `);

    // Persist field edits back through the host on change.
    const save = (patch) => ctx?.saveSettings?.(patch);
    $body.find('#bhp-endpoint').on('change', function () {
        save({ endpoint: this.value.trim() });
        // "Filled" ≠ "working": probe the new endpoint once so a dead URL surfaces
        // the unreachable banner instead of silently looking active.
        ctx.probeEndpoint?.();
    });
    $body.find('#bhp-model').on('change', function () { save({ model: this.value.trim() }); });
    $body.find('#bhp-key').on('change', function () { save({ apiKey: this.value }); });
    $body.find('#bhp-inferred').on('change', function () { save({ inferredColors: this.checked }); });
    $body.find('#bhp-validator').on('change', function () {
        save({ validator: { enabled: this.checked } });
        toast(this.checked ? 'Validator ON (next message)' : 'Validator OFF — raw model output (next message)');
    });
    $body.find('#bhp-inject').on('change', function () { save({ injectionPosition: this.value }); });
    $body.find('#bhp-depth').on('change', function () { save({ injectionDepth: parseInt(this.value, 10) || 0 }); });
    $body.find('#bhp-concurrency').on('change', function () {
        const n = Math.max(1, Math.min(64, parseInt(this.value, 10) || 1));
        this.value = n;
        save({ concurrency: n });
    });

    $body.find('#bhp-test').on('click', async function () {
        const $st = $body.find('#bhp-conn');
        $st.html('<span class="bh-dot bh-dot-busy"></span><span>probing /v1/models…</span>');
        try {
            const r = await ctx.probeEndpoint();
            if (r?.ok) {
                $st.html(`<span class="bh-dot bh-dot-ok"></span><span>${esc(r.servedModel || 'reachable')} · ${r.ms} ms</span>`);
                toast('Connection OK — endpoint reachable');
            } else {
                $st.html(`<span class="bh-dot bh-dot-bad"></span><span>${esc(r?.error || 'unreachable')}</span>`);
                toast('Connection failed — check the endpoint URL');
            }
        } catch (e) {
            $st.html(`<span class="bh-dot bh-dot-bad"></span><span>${esc(e?.message || 'error')}</span>`);
            toast('Connection failed');
        }
    });
    $body.find('#bhp-accent').on('change', function () {
        save({ matchThemeAccent: this.checked });
        const panel = document.getElementById('beholder_panel');
        if (this.checked) {
            panel.style.setProperty('--bh-accent-pref', 'var(--SmartThemeQuoteColor, #88aaff)');
            toast('Accent now follows the Marinara theme');
        } else {
            panel.style.removeProperty('--bh-accent-pref');
            toast('Accent: Beholder gold');
        }
    });

    // Render + wire the Local-model card now that its container exists, and
    // refresh it whenever a probe resolves (the host re-runs probeReadiness on
    // settings open). The card is the single seam to the browser-model lifecycle.
    renderBrowserCard($body.find('#bhp-lmcard'));
}

// ─── Local-model card (browser WebLLM) ─────────────────────────────────────
// The card lives at the top of the Settings → Connection section. It renders a
// single lifecycle state from ctx.getBrowserModelState() with three honest
// readiness rows (GPU hard-gate, Disk, RAM-as-hint) and ONE primary button
// whose label + action track the state. The button is wired to the matching
// host callback (onDownloadModel / onEnableBrowserModel / onDisableBrowserModel);
// views.js never touches the transport directly — it only drives the host.
//
// While a download is in flight the card owns a local progress bar fed by the
// onProgress({pct,text}) the host forwards from WebLLM's init callback; on
// success/failure the host calls refreshBrowserCard() and the card re-derives
// its state. A download is tracked locally so a Settings re-open mid-download
// reflects the 'downloading' state from the host instead.

// Copy + the primary-button spec for each lifecycle state. `btn=null` hides the
// primary button entirely (unconfigured / unsupported / downloading-handled).
const LM_STATES = {
    unconfigured: {
        cls: 'bh-lm-unconfigured', dot: 'warn',
        head: 'Browser model — coming soon',
        body: "The in-browser model isn't published yet. Point Beholder at any OpenAI-compatible "
            + 'endpoint to start tracking now — run the Beholder GGUF locally, or use a remote server.',
        btn: { id: 'endpoint', kind: 'primary', icon: 'fa-plug', label: 'Set up an endpoint' },
    },
    unsupported: {
        cls: 'bh-lm-unsupported', dot: 'bad',
        head: 'Browser model — not supported here',
        body: "This device can't run the model in your browser (it needs WebGPU with fp16 support). "
            + 'You can still track by pointing Beholder at any OpenAI-compatible endpoint — run the '
            + 'Beholder GGUF locally, or use a remote server.',
        btn: { id: 'endpoint', kind: 'primary', icon: 'fa-plug', label: 'Set up an endpoint' },
    },
    'not-downloaded': {
        cls: 'bh-lm-not-downloaded', dot: 'warn',
        head: 'Browser model — ready to download',
        body: 'Runs entirely in your browser on the GPU. Downloaded once, then cached on disk; '
            + 'no prose ever leaves your machine.',
        btn: { id: 'download', kind: 'primary', icon: 'fa-download', label: 'Download model' },
    },
    downloading: {
        cls: 'bh-lm-downloading', dot: 'busy',
        head: 'Browser model — downloading…',
        body: 'Streaming weights and compiling GPU kernels. Already-downloaded parts resume for free '
            + 'if the connection drops.',
        btn: { id: 'cancel', kind: '', icon: 'fa-xmark', label: 'Cancel' },
    },
    'ready-disabled': {
        cls: 'bh-lm-ready-disabled', dot: 'ok',
        head: 'Browser model — downloaded',
        body: 'Cached on disk and ready. Enabling loads it onto the GPU so Beholder can run '
            + 'extractions locally.',
        btn: { id: 'enable', kind: 'primary', icon: 'fa-bolt', label: 'Enable' },
    },
    'ready-enabled': {
        cls: 'bh-lm-ready-enabled', dot: 'ok',
        head: 'Browser model — active',
        body: 'Running locally on your GPU. Disabling frees the GPU memory; the weights stay '
            + 'cached on disk for an instant re-enable.',
        btn: { id: 'disable', kind: '', icon: 'fa-power-off', label: 'Disable' },
    },
    error: {
        cls: 'bh-lm-error', dot: 'bad',
        head: 'Browser model — error',
        body: "The browser model couldn't load. Retry, or keep tracking by pointing Beholder at any "
            + 'OpenAI-compatible endpoint instead (run the Beholder GGUF locally, or a remote server).',
        btn: { id: 'retry', kind: 'primary', icon: 'fa-rotate-right', label: 'Retry' },
        btn2: { id: 'endpoint', kind: '', icon: 'fa-plug', label: 'Use an endpoint' },
    },
};

// One readiness row: { dot, label, value }. Honest copy throughout — RAM is a
// hint (no free-RAM browser API), GPU info is reported as given (often masked).
function readinessRowsHtml(r) {
    const rows = [];
    const gpu = r?.gpu || {};
    if (gpu.ok) {
        const bits = [gpu.vendor || 'WebGPU', gpu.architecture || ''].filter(Boolean).join(' ');
        const ssbo = gpu.maxStorageBufferBindingSize
            ? ` · ${(gpu.maxStorageBufferBindingSize / (1024 * 1024)).toFixed(0)} MB SSBO` : '';
        rows.push({ dot: 'ok', label: 'GPU', value: `${esc(bits)}${ssbo}` });
    } else {
        const gpuVal = esc(gpu.reason || 'no WebGPU — required to run locally')
            + (gpu.hint ? `<br><span class="bh-lm-hint">${esc(gpu.hint)}</span>` : '');
        rows.push({ dot: 'bad', label: 'GPU', value: gpuVal });
    }
    const disk = r?.disk || {};
    if (disk.error) {
        rows.push({ dot: 'warn', label: 'Storage', value: 'unknown (browser does not report)' });
    } else if (typeof disk.freeBytes === 'number') {
        const freeGb = (disk.freeBytes / 1e9).toFixed(1);
        // This is the browser's per-origin Storage-API quota, NOT real disk free
        // (Firefox caps it ~10 GB) — labelled "Storage … browser quota" so a small
        // number doesn't read as "your disk is nearly full".
        rows.push({
            dot: disk.ok ? 'ok' : 'warn', label: 'Storage',
            value: `~${freeGb} GB available${disk.ok ? '' : ' — may be tight'} · browser quota${disk.persisted ? ', persisted' : ''}`,
        });
    } else {
        rows.push({ dot: 'warn', label: 'Storage', value: 'unknown' });
    }
    const ram = r?.ram || {};
    rows.push(ram.known
        ? { dot: 'ok', label: 'RAM', value: `~${ram.gb} GB (total, hint only)` }
        : { dot: 'warn', label: 'RAM', value: 'unknown (browser does not expose it)' });
    return rows.map(x => `
        <div class="bh-lm-readiness-row">
            <span class="bh-dot bh-dot-${x.dot}"></span>
            <span class="bh-lm-readiness-label">${esc(x.label)}</span>
            <span class="bh-lm-readiness-value">${x.value}</span>
        </div>`).join('');
}

// Track an in-flight download so the card can show its own progress bar even
// across re-renders (the host's getBrowserModelState() also returns
// 'downloading', but the % lives here, driven by the onProgress callback).
let lmDownloadActive = false;
let lmDownloadPct = 0;
let lmDownloadText = '';

function approxSizeLabel() {
    const mb = ctx?.getModelInfo?.()?.approxDownloadMB;
    if (!mb || !Number.isFinite(mb)) return '';
    return mb >= 1024 ? `~${(mb / 1024).toFixed(1)} GB` : `~${Math.round(mb)} MB`;
}

function renderBrowserCard($card) {
    if (!$card || !$card.length) return;
    const state = ctx?.getBrowserModelState?.() || 'unconfigured';
    const spec = LM_STATES[state] || LM_STATES.unconfigured;
    const readiness = ctx?.getReadiness?.() || {};
    const info = ctx?.getModelInfo?.() || {};
    const configured = !!ctx?.isModelConfigured?.();

    // Readiness rows are meaningful only when the model COULD run here (i.e. not
    // when it's unconfigured — nothing to gate yet). Show them otherwise.
    const showReadiness = state !== 'unconfigured';

    // Button label gets the size suffix on the download action.
    let btn = spec.btn;
    if (btn && btn.id === 'download') {
        const sz = approxSizeLabel();
        btn = { ...btn, label: sz ? `${btn.label} · ${sz}` : btn.label };
    }
    // Optional secondary action (e.g. the 'error' state offers Retry + "Use an endpoint").
    const btn2 = spec.btn2;

    // The progress bar shows during 'downloading'. % from the local tracker.
    const downloading = state === 'downloading' || lmDownloadActive;
    const pct = Math.max(0, Math.min(100, Math.round(lmDownloadPct)));
    // Honest progress: when WebLLM hasn't reported a real % yet, show an
    // indeterminate shimmer + the status text instead of a frozen 0% bar.
    const indet = downloading && pct <= 0;

    const idLine = configured && info.modelId
        ? `<code>${esc(info.modelId)}</code>${info.version ? ` · ${esc(info.version)}` : ''} · q4f16`
        : 'model id pending';
    const update = ctx?.getUpdateInfo?.() || {};

    $card.attr('class', `bh-localmodel-card ${spec.cls}`);
    $card.html(`
        <div class="bh-lm-head">
            <span class="bh-dot bh-dot-${spec.dot}"></span>
            <span class="bh-lm-title">${esc(spec.head)}</span>
        </div>
        <p class="bh-lm-copy">${esc(spec.body)}</p>
        <div class="bh-lm-modelid">${idLine}</div>
        ${update.available && !downloading ? `
        <div class="bh-lm-update">
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
            <span>Update available — <b>${esc(update.to)}</b></span>
            <button class="bh-btn bh-btn-primary bh-lm-btn" data-action="update"><i class="fa-solid fa-download"></i> Update</button>
        </div>` : ''}
        ${showReadiness ? `<div class="bh-lm-readiness">${readinessRowsHtml(readiness)}</div>` : ''}
        ${downloading ? `
        <div class="bh-lm-progress">
            <div class="bh-lm-progress-label">
                <span>${esc(lmDownloadText || 'preparing…')}</span>
                <span class="bh-lm-progress-pct">${indet ? '' : pct + '%'}</span>
            </div>
            <div class="bh-lm-progress-bar${indet ? ' bh-lm-indeterminate' : ''}" role="progressbar" aria-valuemin="0" aria-valuemax="100"${indet ? '' : ` aria-valuenow="${pct}"`}>
                <span class="bh-lm-progress-fill"${indet ? '' : ` style="width:${pct}%"`}></span>
            </div>
        </div>` : ''}
        <div class="bh-lm-action">
            ${btn && !downloading ? `
            <button class="bh-btn ${btn.kind === 'primary' ? 'bh-btn-primary' : ''} bh-lm-btn" data-action="${btn.id}">
                <i class="fa-solid ${btn.icon}"></i> ${esc(btn.label)}
            </button>` : ''}
            ${btn2 && !downloading ? `
            <button class="bh-btn ${btn2.kind === 'primary' ? 'bh-btn-primary' : ''} bh-lm-btn" data-action="${btn2.id}">
                <i class="fa-solid ${btn2.icon}"></i> ${esc(btn2.label)}
            </button>` : ''}
            ${downloading ? `
            <button class="bh-btn bh-lm-btn" data-action="cancel">
                <i class="fa-solid fa-xmark"></i> Cancel
            </button>` : ''}
        </div>
    `);

    $card.find('.bh-lm-btn').off('click').on('click', function () {
        const action = $(this).data('action');
        handleBrowserCardAction(action, $card);
    });
}

async function handleBrowserCardAction(action, $card) {
    try {
        if (action === 'download' || action === 'retry' || action === 'update') {
            const isUpdate = action === 'update';
            lmDownloadActive = true;
            lmDownloadPct = 0;
            lmDownloadText = isUpdate ? 'updating…' : 'starting…';
            renderBrowserCard($card);
            const run = isUpdate ? ctx?.onUpdateModel : ctx?.onDownloadModel;
            await run?.((p) => {
                lmDownloadPct = typeof p?.pct === 'number' ? p.pct : lmDownloadPct;
                lmDownloadText = p?.text || lmDownloadText;
                // Update only the progress sub-elements to avoid yanking focus.
                const pct = Math.max(0, Math.min(100, Math.round(lmDownloadPct)));
                const indet = pct <= 0;  // no real % yet → shimmer, never a frozen 0%
                $card.find('.bh-lm-progress-bar')
                    .toggleClass('bh-lm-indeterminate', indet)
                    .attr('aria-valuenow', indet ? null : pct);
                $card.find('.bh-lm-progress-fill').css('width', indet ? '' : `${pct}%`);
                $card.find('.bh-lm-progress-pct').text(indet ? '' : `${pct}%`);
                $card.find('.bh-lm-progress-label > span').first().text(lmDownloadText || 'preparing…');
            });
            lmDownloadActive = false;
            toast(isUpdate ? 'Updated — new browser model loaded' : 'Browser model ready — running locally on your GPU');
        } else if (action === 'enable') {
            await ctx?.onEnableBrowserModel?.();
            toast('Browser model enabled');
        } else if (action === 'disable') {
            await ctx?.onDisableBrowserModel?.();
            toast('Browser model disabled — GPU memory freed, weights stay cached');
        } else if (action === 'cancel') {
            // Cancel/abort the in-flight load (Pause is deferred → behaves as
            // cancel). The host's onDownloadModel rejects on abort; we just
            // clear the local download tracker and let the host refresh.
            lmDownloadActive = false;
            await ctx?.onDisableBrowserModel?.();
            toast('Download cancelled');
        } else if (action === 'endpoint') {
            // The card sits in Settings right above the Advanced custom-endpoint block —
            // expand it and focus the field so "Set up an endpoint" lands somewhere real
            // (same behaviour as the no-model banner's deep-link). No state change → don't
            // re-render (which would steal the focus we just placed).
            const $view = $card.closest('.bh-view');
            $view.find('.bh-adv-endpoint').prop('open', true);
            const $ep = $view.find('#bhp-endpoint');
            setTimeout(() => {
                $ep.length && $ep[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
                $ep.trigger('focus');
            }, 60);
            return;
        }
    } catch (err) {
        lmDownloadActive = false;
        toast(`Browser model: ${err?.message || 'action failed'}`);
    }
    // Re-derive from the host's authoritative state (the host also calls
    // refreshBrowserCard() after persisting, but refresh here too so the card
    // settles even if the host's refresh races the Settings view lifecycle).
    refreshBrowserCard();
}

// Host-driven re-render hook: re-render the card (if Settings is open) from the
// current getBrowserModelState(). Safe to call any time; no-ops when the card
// isn't mounted. Also called after probes resolve and after enable/disable.
export function refreshBrowserCard() {
    const $card = $('#beholder_panel #bhp-lmcard');
    if ($card.length) renderBrowserCard($card);
}

// ─── No-model banner ───────────────────────────────────────────────────────
// A persistent strip shown whenever the host signals there is no active
// transport (§9.5). The host drives it via setNoModelBanner(info | null). Two
// one-click actions route back to the host through ctx.onBannerAction(id).
// Copy adapts to the cause; the 'disabled' cause uses a calmer variant (the
// user turned the model off on purpose — not an alarm).

const BANNER_DEFAULTS = {
    'never-setup': {
        variant: 'warn',
        copy: "No extractor configured — Beholder isn't tracking. Point it at a local endpoint "
            + '(recommended) or a Marinara connection in Settings.',
        actions: [
            { id: 'endpoint', label: 'Open Settings' },
        ],
    },
    unsupported: {
        variant: 'warn',
        copy: 'No extractor configured — point Beholder at an endpoint in Settings to keep tracking.',
        actions: [
            { id: 'endpoint', label: 'Set up an extractor' },
        ],
    },
    'endpoint-unreachable': {
        variant: 'warn',
        copy: "Your extractor isn't responding — tracking paused. Recheck it in Settings.",
        actions: [
            { id: 'endpoint', label: 'Fix it in Settings' },
        ],
    },
    disabled: {
        variant: 'calm',
        copy: 'Tracking paused — set an extractor in Settings.',
        actions: [
            { id: 'endpoint', label: 'Open Settings' },
        ],
    },
    loading: {
        variant: 'loading',
        copy: 'Connecting to the extractor… tracking starts automatically.',
        actions: [],
    },
};

function ensureNoModelBanner($panel) {
    if ($panel.find('.bh-no-model-banner').length) return;
    // Sit the banner directly under the backfill status strip so it shares the
    // header-adjacent placement pattern (above the layer bar + the doll body).
    const $strip = $('<div class="bh-no-model-banner" hidden role="status" aria-live="polite"></div>');
    const $after = $panel.find('.beholder-backfill-status');
    if ($after.length) $after.after($strip);
    else $panel.find('.beholder-panel-header').after($strip);
}

// Host API: show/hide + populate the no-model banner. info = null hides it.
// info = { cause, copy?, actions? } — copy/actions default per cause if omitted.
export function setNoModelBanner(info) {
    const $panel = $('#beholder_panel');
    if (!$panel.length) return;
    ensureNoModelBanner($panel);
    const $banner = $panel.find('.bh-no-model-banner');
    if (!info) {
        $banner.prop('hidden', true).empty().removeClass('bh-banner-warn bh-banner-calm bh-banner-loading');
        return;
    }
    const cause = info.cause || 'never-setup';
    const def = BANNER_DEFAULTS[cause] || BANNER_DEFAULTS['never-setup'];
    const copy = info.copy || def.copy;
    const actions = Array.isArray(info.actions) && info.actions.length ? info.actions : def.actions;
    const variant = def.variant === 'calm' ? 'bh-banner-calm'
        : def.variant === 'loading' ? 'bh-banner-loading'
        : 'bh-banner-warn';
    const spinner = def.variant === 'loading'
        ? '<i class="fa-solid fa-spinner fa-spin bh-banner-spin" aria-hidden="true"></i> '
        : '';
    // Only render the actions row when there ARE actions — an empty row left a
    // dead gap under the copy (the "loading" banner has none).
    const actionsHtml = actions.length
        ? `<span class="bh-banner-actions">${actions.map(a => `
                    <button class="bh-btn bh-banner-btn ${a.id === 'enable' ? 'bh-btn-primary' : ''}" data-action="${esc(a.id)}">
                        ${esc(a.label)}
                    </button>`).join('')}</span>`
        : '';

    $banner
        .removeClass('bh-banner-warn bh-banner-calm bh-banner-loading')
        .addClass(variant)
        .prop('hidden', false)
        .html(`
            <span class="bh-banner-copy">${spinner}${esc(copy)}</span>
            ${actionsHtml}
        `);
    $banner.find('.bh-banner-btn').off('click').on('click', function () {
        ctx?.onBannerAction?.($(this).data('action'));
    });
}

// ─── Model-update dialog ────────────────────────────────────────────────────
// A prominent centered modal the host fires (via showUpdateDialog) when a newer
// model version publishes. Body-appended + position:fixed so it overlays the
// whole UI. Actions: update the in-browser model (re-download), grab the GGUF
// manually, or dismiss. Shown once per version so it doesn't nag.
let updateDialogShownFor = null;

export function showUpdateDialog(info) {
    if (!info || !info.to) return;
    if (updateDialogShownFor === info.to) return;
    updateDialogShownFor = info.to;
    const $panel = $('#beholder_panel');
    if (!$panel.length) return;
    closeUpdateDialog();
    const gguf = info.ggufUrl || 'https://huggingface.co/GetBeholder/Beholder-GGUF';
    const $strip = $(`
        <div class="bh-update-banner" role="status" aria-live="polite">
            <span class="bh-update-banner-copy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> New model — <b>${esc(info.from || '?')}</b> → <b>${esc(info.to)}</b>. Update the browser model, or grab the GGUF.</span>
            <span class="bh-update-banner-actions">
                <button class="bh-btn bh-btn-primary bh-update-now"><i class="fa-solid fa-download"></i> Update</button>
                <a class="bh-btn bh-update-gguf" href="${esc(gguf)}" target="_blank" rel="noopener noreferrer" title="Native GGUF build"><i class="fa-solid fa-arrow-up-right-from-square"></i> GGUF</a>
                <button class="bh-btn bh-update-later" title="Dismiss" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>
            </span>
        </div>
    `);
    // Sit with the other CTA strips (under the backfill status, else under header).
    const $bf = $panel.find('.beholder-backfill-status');
    if ($bf.length) $bf.after($strip);
    else $panel.find('.beholder-panel-header').after($strip);
    $strip.find('.bh-update-later').on('click', closeUpdateDialog);
    $strip.find('.bh-update-now').on('click', async function () {
        const $b = $(this);
        $b.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> 0%');
        try {
            await ctx?.onUpdateModel?.((p) => {
                const pct = typeof p?.pct === 'number' ? p.pct : 0;
                $b.html(`<i class="fa-solid fa-spinner fa-spin"></i> ${pct}%`);
            });
        } catch (e) {
            toast(`Update failed: ${e?.message || 'error'}`);
            $b.prop('disabled', false).html('<i class="fa-solid fa-download"></i> Update');
            return;
        }
        toast('Updated — new browser model loaded');
        closeUpdateDialog();
        refreshBrowserCard();
    });
}

function closeUpdateDialog() {
    $('#beholder_panel .bh-update-banner').remove();
}

// ─── Doctor view ───────────────────────────────────────────────────────────
// Render a single vital row from a { dot, label, value } record.
function vitalRowHtml(x) {
    return `
        <div class="bh-vital">
            <span class="bh-dot bh-dot-${x.dot}"></span>
            <span class="bh-vital-label">${esc(x.label)}</span>
            <span class="bh-vital-value">${x.value}</span>
        </div>`;
}

// Build the recent-extractions summary rows from the capture buffer.
function recentTurns() {
    const cap = ctx?.getCapture?.() || [];
    return cap.slice(-3).reverse().map((e) => {
        const slots = Object.values(e.delta || {}).reduce(
            (n, c) => n + Object.keys(c?.body || {}).length, 0);
        const errs = (e.validatorLog || []).filter(v => v.sev === 'error').length;
        const warns = (e.validatorLog || []).filter(v => v.sev === 'warn').length;
        return {
            msg: `#${e.msgId}`,
            latency: e.latencyMs != null ? `${(e.latencyMs / 1000).toFixed(1)} s` : '—',
            // A parse failure applies nothing, so "no change" would be a lie — call it out.
            delta: e.parseFailed ? '⚠ output did not parse'
                : (slots ? `${slots} slot${slots > 1 ? 's' : ''}` : 'no change'),
            validator: (e.validatorLog || []).length ? `${errs} err · ${warns} warn` : '—',
        };
    });
}

// Cap a long string for the report so a paste stays reasonable, flagging trims.
function clip(str, max = 1200) {
    const s = String(str ?? '');
    return s.length > max ? `${s.slice(0, max)} …[+${s.length - max} chars]` : s;
}

// Per-turn detail for the report: the raw model output and the APPLIED delta are
// state data (item/color/slot + character names) and are always included — they're
// the whole point of a state debugger. The model INPUT (`user`, which carries the
// RP narration) is withheld unless the user opts prose in.
function reportTurns(cap, includeProse) {
    if (!cap.length) return ['- (no extractions captured yet)'];
    return cap.slice(-5).reverse().flatMap((e) => {
        const lat = e.latencyMs != null ? `${(e.latencyMs / 1000).toFixed(1)}s` : '—';
        const raw = typeof e.raw === 'string' ? e.raw : JSON.stringify(e.raw ?? {});
        const errs = (e.validatorLog || []).filter(v => v.sev === 'error').length;
        const warns = (e.validatorLog || []).filter(v => v.sev === 'warn').length;
        const val = (e.validatorLog || []).length ? ` · validator ${errs} err/${warns} warn` : '';
        const fail = e.parseFailed ? ' · ⚠ OUTPUT DID NOT PARSE (truncated/runaway — nothing applied)' : '';
        const lines = [
            `- msg #${e.msgId} · ${lat}${val}${fail}`,
            // raw model output + applied delta are the whole point of the report —
            // keep them essentially full (a very high cap only guards a runaway model).
            `    raw:     ${clip(raw.replace(/\s+/g, ' '), 24000)}`,
            `    applied: ${clip(JSON.stringify(e.delta ?? {}), 24000)}`,
        ];
        // Prose is opt-in AND the reason you opted in is to debug an extraction —
        // so include the FULL model input (persona + state + narration), unclipped.
        if (includeProse) lines.push(`    input:   ${JSON.stringify(e.user ?? '')}`);
        return lines;
    });
}

function buildDiagnosticReport(includeProse) {
    const vitals = (ctx?.getDoctorVitals?.() || []).map(x =>
        `- ${x.label}: ${String(x.value).replace(/<[^>]+>/g, '')}${x.dot === 'warn' ? '  [!]' : ''}`).join('\n');
    const s = ctx?.getSettings?.() || {};
    const state = ctx?.getState?.() || {};
    const cap = ctx?.getCapture?.() || [];
    return [
        '```',
        'BEHOLDER DIAGNOSTIC REPORT',
        `generated: ${new Date().toISOString()}`,
        '',
        // Character NAMES are intentionally included (state + turns below): attribution,
        // color, and slot bugs are impossible to diagnose without them. The endpoint URL
        // + API key are still stripped — the VITALS "Endpoint" row reports only a
        // paste-safe kind (localhost / LAN IP / remote host). RP prose stays opt-in.
        'PRIVACY: API key + endpoint URL stripped. Character names ARE included (needed',
        '         to debug). RP narration (prose) is excluded unless opted in below.',
        '',
        'VITALS',
        vitals || '- (none)',
        '',
        'SETTINGS',
        `- model: ${s.model || ''}`,
        `- inject: ${s.injectionPosition} (depth ${s.injectionDepth})`,
        `- inferredColors: ${s.inferredColors}`,
        '',
        'CURRENT STATE',
        clip(JSON.stringify(state, null, 2), 24000),
        '',
        'RECENT EXTRACTION TURNS (newest first — raw model output + applied delta)',
        ...reportTurns(cap, includeProse),
        '',
        includeProse
            ? 'RP PROSE: INCLUDED above as each turn\'s `input` (explicit opt-in)'
            : 'RP PROSE: excluded (the model input / narration is withheld — toggle to include)',
        '```',
    ].join('\n');
}

function buildDoctorView($body) {
    const s = ctx?.getSettings?.() || {};
    const vitals = (ctx?.getDoctorVitals?.() || []).map(vitalRowHtml).join('');
    const turns = recentTurns().map(t => `
        <tr><td>${t.msg}</td><td>${t.latency}</td><td>${t.delta}</td><td>${t.validator}</td></tr>`).join('')
        || '<tr><td colspan="4" style="opacity:.5;">No extractions captured yet.</td></tr>';

    $body.html(`
        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-heart-pulse"></i> Vitals</summary>
            <div class="bh-vsection-body">
                <div class="bh-vitals">${vitals}</div>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-clock-rotate-left"></i> Recent extractions</summary>
            <div class="bh-vsection-body">
                <table class="bh-turns">
                    <thead><tr><th>msg</th><th>latency</th><th>delta</th><th>validator</th></tr></thead>
                    <tbody>${turns}</tbody>
                </table>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-file-medical"></i> Diagnostic report</summary>
            <div class="bh-vsection-body">
                <p>One block to paste into a bug report — it includes the <b>current state</b> and the
                   last few extractions (raw model output + applied delta). <b>Character names are
                   included</b>: attribution / color / slot bugs can't be diagnosed without them. Your
                   endpoint URL + API key are stripped, and RP prose is excluded unless you opt in.</p>
                <label class="bh-check">
                    <input type="checkbox" id="bhp-prose">
                    <span>Include RP prose (the model input) from the last 5 turns
                        <small>Off by default — your narration is private. State, deltas + names are included either way.</small></span>
                </label>
                <div class="bh-row-actions">
                    <button class="bh-btn bh-btn-primary" id="bhp-copyreport"><i class="fa-solid fa-copy"></i> Copy diagnostic report</button>
                    <button class="bh-btn" id="bhp-logstate"><i class="fa-solid fa-copy"></i> Copy current state (JSON)</button>
                </div>
                <details>
                    <summary style="cursor:pointer; opacity:.6; font-size:.9em;">Preview the report</summary>
                    <pre class="bh-code" id="bhp-reportpreview"></pre>
                </details>
            </div>
        </details>

        <details class="bh-vsection">
            <summary><i class="fa-solid fa-shield-halved"></i> Privacy &amp; debug</summary>
            <div class="bh-vsection-body">
                <p>Everything runs against <b>your</b> endpoint. Nothing leaves your machine except a
                   diagnostic report you copy yourself (and prose only if you opt in above).</p>
                <label class="bh-check">
                    <input type="checkbox" id="bhp-debug" ${s.debug ? 'checked' : ''}>
                    <span>Verbose console logging
                        <small>Logs each extraction (input · raw output · applied delta) to the browser console (F12).</small></span>
                </label>
                <div class="bh-row-actions">
                    <button class="bh-btn" id="bhp-sweep"><i class="fa-solid fa-wand-magic-sparkles"></i> Clean impossible state</button>
                    <button class="bh-btn bh-btn-danger" id="bhp-clear"><i class="fa-solid fa-eraser"></i> Clear chat state</button>
                </div>
                <p class="bh-help" style="opacity:.6; font-size:.85em; margin:6px 0 0;">
                    <b>Clean impossible state</b> re-checks the stored state and removes only
                    anatomically-impossible entries (an eyepatch worn on a hand, a concussion on
                    the back, a rank/status word used as a species). User-locked slots are never
                    touched.</p>
            </div>
        </details>
    `);

    const refreshPreview = () => {
        $body.find('#bhp-reportpreview').text(
            buildDiagnosticReport($body.find('#bhp-prose').prop('checked')));
    };
    refreshPreview();
    $body.find('#bhp-prose').on('change', refreshPreview);
    $body.find('#bhp-copyreport').on('click', () => {
        copyText(buildDiagnosticReport($body.find('#bhp-prose').prop('checked')),
            'Diagnostic report copied — paste it into the bug template');
    });
    $body.find('#bhp-logstate').on('click', () => {
        const json = JSON.stringify(ctx?.getState?.() || {}, null, 2);
        console.log('[Beholder] current chat state:\n' + json);
        copyText(json, 'Current state copied as JSON (also logged to console)');
    });
    $body.find('#bhp-debug').on('change', function () { ctx?.saveSettings?.({ debug: this.checked }); });
    $body.find('#bhp-clear').on('click', () => {
        ctx?.clearChatState?.();
        toast('Chat state cleared for this chat');
    });
    $body.find('#bhp-sweep').on('click', () => {
        const res = ctx?.sweepChatState?.();
        if (!res) return;
        if (res.changed) {
            toast(`Cleaned ${res.removed} impossible ${res.removed === 1 ? 'entry' : 'entries'} from stored state`);
        } else {
            toast('State is already clean — nothing impossible found');
        }
    });

    // Auto-probe the endpoint on open so the Model (served model) + Endpoint (reachable /
    // latency) rows show live data, not stale placeholders. Refresh only the vitals block
    // when it resolves — leaves scroll position + the other sections untouched.
    if (ctx?.probeEndpoint) {
        ctx.probeEndpoint().then(() => {
            $body.find('.bh-vitals').html((ctx?.getDoctorVitals?.() || []).map(vitalRowHtml).join(''));
        }).catch(() => {});
    }
}

// ─── Inspector view ────────────────────────────────────────────────────────
// The full round-trip for the most recent processed message: the system prompt,
// the model input (prose + previous state), the raw output, the validator log,
// and the merged delta that was applied.
function buildInspectorView($body) {
    const cap = ctx?.getCapture?.() || [];
    const entry = cap[cap.length - 1] || null;

    if (!entry) {
        $body.html(`
            <p style="opacity:.7;">No extraction has run yet in this chat. Send a message (or build
            history) and the most recent round-trip will appear here.</p>`);
        return;
    }

    const system = entry.system || '';
    const promptChars = commaNum(system.length);
    const rawOut = typeof entry.raw === 'string' ? entry.raw : JSON.stringify(entry.raw ?? {}, null, 1);
    const mergedDelta = JSON.stringify(entry.delta ?? {}, null, 1);
    const latency = entry.latencyMs != null ? `${(entry.latencyMs / 1000).toFixed(1)} s` : '—';
    const injected = (ctx?.getInjectedText?.() || '').trim();

    // A note-box directive sets state directly and BYPASSES the validator by design — so
    // "Off" there is misleading (it isn't disabled, it just doesn't apply to a manual edit).
    const isDirective = entry.kind === 'directive';
    const vlog = (entry.validatorLog || []).length
        ? entry.validatorLog.map(v => `
            <div class="bh-vlog-row bh-vlog-${v.sev === 'ok' ? 'ok' : v.sev}">
                <b>${esc(v.rule)}</b><span>${esc(v.text)}</span>
            </div>`).join('')
        : `<div class="bh-vlog-row bh-vlog-${entry.validatorActive || isDirective ? 'ok' : 'warn'}">
                <b>VALIDATOR</b><span>${entry.validatorActive
                    ? 'Active (parity with datagen) — no findings on this turn.'
                    : isDirective
                        ? 'Not applied — this turn was a manual directive (you set the state directly), so the validator is skipped by design.'
                        : 'Off — model output applied as received.'}</span>
           </div>`;

    $body.html(`
        <p style="margin:0 0 10px; opacity:.7;">The full round-trip for the most recent message —
        exactly what the model saw and answered. <b>Copy all</b> grabs a shareable reproducer.</p>
        ${entry.parseFailed ? `<div class="bh-vlog-row bh-vlog-error" style="margin:0 0 10px;">
            <b>OUTPUT DID NOT PARSE</b><span>The model produced ${(typeof entry.raw === 'string' ? entry.raw.length : 0)} chars
            that couldn't be parsed or repaired into JSON — a truncated or runaway generation. Nothing was
            applied this turn. Check the raw output below.</span></div>` : ''}

        <details class="bh-vsection">
            <summary><i class="fa-solid fa-scroll"></i> System prompt
                <span class="bh-pane-meta" id="bhp-sysmeta">${promptChars} chars</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(system)}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-feather-pointed"></i> Model input
                <span class="bh-pane-meta">prose + previous state</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(entry.user || '')}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-robot"></i> Raw model output
                <span class="bh-pane-meta">${latency}</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(rawOut)}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-syringe"></i> Injected into the RP model
                <span class="bh-pane-meta">current state · ${commaNum(injected.length)} chars</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${injected ? esc(injected) : '(nothing injected — state is empty)'}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-list-check"></i> Validator</summary>
            <div class="bh-vsection-body">
                <div class="bh-vlog">${vlog}</div>
            </div>
        </details>

        <details class="bh-vsection">
            <summary><i class="fa-solid fa-code-merge"></i> Merged delta → applied</summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(mergedDelta)}</pre>
            </div>
        </details>

        <div class="bh-row-actions" style="margin-top:4px;">
            <button class="bh-btn bh-btn-primary" id="bhp-copyall"><i class="fa-solid fa-copy"></i> Copy all (markdown)</button>
        </div>
    `);

    // Fill in the system-prompt fingerprint once the hash resolves.
    sha12(system).then((sha) => {
        $body.find('#bhp-sysmeta').text(`sha ${sha} · ${promptChars} chars`);
    });

    $body.find('#bhp-copyall').on('click', async () => {
        const sha = await sha12(system);
        const md = [
            '### Beholder extraction reproducer',
            `**system prompt:** sha \`${sha}\` · ${promptChars} chars`,
            '', '**input:**', '```', entry.user || '', '```',
            '', '**raw output:**', '```json', rawOut, '```',
            '', '**validator:**',
            ...((entry.validatorLog || []).length
                ? entry.validatorLog.map(v => `- [${v.sev}] ${v.rule}: ${v.text}`)
                : [entry.validatorActive ? '- validator active — no findings' : '- validator off']),
            '', '**merged delta:**', '```json', mergedDelta, '```',
        ].join('\n');
        copyText(md, 'Reproducer copied — paste anywhere');
    });
}

// ─── Help view ─────────────────────────────────────────────────────────────
function buildHelpView($body) {
    $body.html(`
        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-palette"></i> Reading the panel</summary>
            <div class="bh-vsection-body">
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-0"></span>pristine</div>
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-2"></span>damaged</div>
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-4"></span>broken</div>
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-holding"></span>held item · ✦</div>
                <div class="bh-legend-row"><span class="bh-legend-dot"></span>wound — fill tint on the silhouette, ✚ chip in the slot</div>
                <p style="margin-top:8px;">Ring around a body part = armor damage. Fill inside it = the body itself.
                   Tap any slot card to <b>edit or lock</b> it.</p>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-pen-nib"></i> Writing for the extractor</summary>
            <div class="bh-vsection-body">
                <ul class="bh-tips">
                    <li><b>Narrate state changes</b> — "she shrugs the cloak off" beats "(takes off cloak)" in dialogue.</li>
                    <li><b>Name items specifically</b> — "gunmetal vambrace" tracks better than "the armor".</li>
                    <li><b>Be explicit about loss</b> — "the glass slipped from her grip", not "her hand was empty".</li>
                    <li><b>Possessives are fine</b> ("his guard") when it's clear whose — avoid them in same-gender scenes.</li>
                </ul>
            </div>
        </details>

        <div class="bh-orn" aria-hidden="true"><span></span>◉<span></span></div>
        <p style="text-align:center; font-family: var(--bh-font-display); font-size:1.08em; opacity:.8; margin:0 0 6px;">
            Out of sight, out of prompt. <span style="color:var(--bh-gold,#ffeaa7);">Beholder doesn't blink.</span></p>
    `);
}

// ─── Slot editor + locks ───────────────────────────────────────────────────
function activeCharName() {
    return $('#beholder_panel .bh-char-doll').data('char') || null;
}

function wireSlotEditing($panel) {
    $panel.find('.beholder-panel-body')
        .off('click.bhEdit')
        .on('click.bhEdit', '.bh-slot-card', function (e) {
            if ($(e.target).closest('.bh-editor').length) return;
            e.stopPropagation();
            openEditor($(this));
        });
}

function closeEditor() {
    $('#beholder_panel .bh-editor').remove();
    $(document).off('click.bhEditor keydown.bhEditor');
}

function selectHtml(cls, values, current, labels) {
    const opts = values.map(v =>
        `<option value="${esc(v)}" ${v === (current ?? '') ? 'selected' : ''}>${esc(labels?.[v] ?? (v || '— color —'))}</option>`).join('');
    return `<select class="bh-select ${cls}">${opts}</select>`;
}

function wornRowHtml(w = {}) {
    return `<div class="bh-editor-row bh-editor-row-worn">
        <input class="bh-input bhe-item" type="text" placeholder="item" value="${esc(w.item || '')}">
        ${selectHtml('bhe-damage', DAMAGE_VALUES, w.damage || 'pristine')}
        ${selectHtml('bhe-color', COLOR_VALUES, (w.color || '').toLowerCase())}
        <button class="bh-editor-remove fa-solid fa-xmark" title="Remove"></button>
    </div>`;
}
function woundRowHtml(w = {}) {
    const text = typeof w === 'string' ? w : (w.text || '');
    const sev = typeof w === 'object' && w.severity ? String(w.severity) : 'serious';
    const bleeding = typeof w === 'object' && w.bleeding === true;
    return `<div class="bh-editor-row bh-editor-row-wound">
        <input class="bh-input bhe-wtext" type="text" placeholder="wound" value="${esc(text)}">
        ${selectHtml('bhe-wsev', SEVERITY_VALUES, sev)}
        <label class="bh-bleed-check" title="bleeding"><input type="checkbox" class="bhe-wbleed" ${bleeding ? 'checked' : ''}>🩸</label>
        <button class="bh-editor-remove fa-solid fa-xmark" title="Remove"></button>
    </div>`;
}

// ─── Shared editor form (used by the desktop popover AND the mobile sheet) ──
// The form body (worn / holding / wounds / flags) is identical in both
// presentations; only the surrounding chrome + placement differ.
export function editorFormHtml(slotState, isHand) {
    const holding = slotState.holding
        ? (typeof slotState.holding === 'string' ? { item: slotState.holding } : slotState.holding)
        : null;
    return `
        <div class="bh-editor-group-label">worn <span style="opacity:.5; letter-spacing:0; text-transform:none;">(outer → inner)</span></div>
        <div class="bhe-worn-list">${(slotState.worn || []).map(wornRowHtml).join('')}</div>
        <button class="bh-editor-add bhe-add-worn"><i class="fa-solid fa-plus"></i> add worn item</button>
        ${isHand ? `
        <div class="bh-editor-group-label">holding</div>
        <div class="bh-editor-row bhe-holding-row">
            <input class="bh-input bhe-hitem" type="text" placeholder="nothing held" value="${esc(holding?.item || '')}">
            ${selectHtml('bhe-hdamage', DAMAGE_VALUES, holding?.damage || 'pristine')}
            ${selectHtml('bhe-hcolor', COLOR_VALUES, (holding?.color || '').toLowerCase())}
            <button class="bh-editor-remove bhe-drop fa-solid fa-hand-holding" title="Drop item"></button>
        </div>` : ''}
        <div class="bh-editor-group-label">wounds</div>
        <div class="bhe-wound-list">${(slotState.wounds || []).map(woundRowHtml).join('')}</div>
        <button class="bh-editor-add bhe-add-wound"><i class="fa-solid fa-plus"></i> add wound</button>
        <div class="bh-editor-group-label">flags</div>
        <div class="bh-row-actions">
            <label class="bh-check"><input type="checkbox" class="bhe-bare" ${slotState.bare ? 'checked' : ''}>
                <span>bare <small>confirmed uncovered — clears worn on apply</small></span></label>
            <label class="bh-check"><input type="checkbox" class="bhe-missing" ${slotState.missing ? 'checked' : ''}>
                <span>missing <small>lost limb / feature — overrides everything</small></span></label>
        </div>`;
}

export function wireEditorForm($scope) {
    $scope.find('.bhe-add-worn').on('click', () => $scope.find('.bhe-worn-list').append(wornRowHtml()));
    $scope.find('.bhe-add-wound').on('click', () => $scope.find('.bhe-wound-list').append(woundRowHtml()));
    $scope.on('click', '.bh-editor-remove:not(.bhe-drop)', function (e) {
        // Don't let this bubble to the document "click-outside → close" handler:
        // removing the row detaches this button, and a detached target reads as an
        // outside click, closing the editor WITHOUT saving (the staged removal is
        // lost, so the item persists). Staged edit stays; Apply commits it.
        e.stopPropagation();
        $(this).closest('.bh-editor-row').remove();
    });
    $scope.find('.bhe-drop').on('click', () => { $scope.find('.bhe-hitem').val(''); toast('Item will be dropped on apply'); });
    $scope.find('.bhe-missing').on('change', function () {
        $(this).closest('.bh-editor-body').toggleClass('bhe-missing-mode', this.checked);
    });
}

// Read the form back into a slot-state object (the apply payload).
export function collectEditorForm($scope, isHand) {
    const next = {};
    if ($scope.find('.bhe-missing').prop('checked')) { next.missing = true; return next; }
    const worn = [];
    $scope.find('.bhe-worn-list .bh-editor-row').each(function () {
        const item = $(this).find('.bhe-item').val().trim();
        if (!item) return;
        const w = { item, damage: $(this).find('.bhe-damage').val() };
        const color = $(this).find('.bhe-color').val();
        if (color) w.color = color;
        worn.push(w);
    });
    const bare = $scope.find('.bhe-bare').prop('checked');
    if (bare) next.bare = true; else if (worn.length) next.worn = worn;
    if (isHand) {
        const hitem = $scope.find('.bhe-hitem').val().trim();
        if (hitem) {
            next.holding = { item: hitem, damage: $scope.find('.bhe-hdamage').val() };
            const hc = $scope.find('.bhe-hcolor').val();
            if (hc) next.holding.color = hc;
        }
    }
    const wounds = [];
    $scope.find('.bhe-wound-list .bh-editor-row').each(function () {
        const text = $(this).find('.bhe-wtext').val().trim();
        if (!text) return;
        wounds.push({ text, severity: $(this).find('.bhe-wsev').val(), bleeding: $(this).find('.bhe-wbleed').prop('checked') });
    });
    if (wounds.length) next.wounds = wounds;
    return next;
}

// Apply a user slot edit. The write is delegated to the host so it persists to
// chat metadata, marks the slot user-edited, re-injects, and re-renders.
export function applySlotEdit(char, slot, next) {
    ctx?.applyUserEdit?.(char, slot, next);
}

export function lockToggleHtml(key) {
    const on = locksHas(key);
    return `<span class="bh-lock-toggle ${on ? 'bh-locked-on' : ''}" title="Locked slots ignore model updates — your value wins until you unlock.">
        <i class="fa-solid ${on ? 'fa-lock' : 'fa-lock-open'}"></i><span>${on ? 'locked' : 'lock'}</span></span>`;
}
function wireLockToggle($toggle, char, slot, label) {
    const key = lockKey(char, slot);
    $toggle.on('click', function () {
        const on = !locksHas(key);
        ctx?.setLock?.(char, slot, on);
        $(this).toggleClass('bh-locked-on', on).find('i').attr('class', `fa-solid ${on ? 'fa-lock' : 'fa-lock-open'}`);
        $(this).find('span').text(on ? 'locked' : 'lock');
        decorateCards();
        toast(on ? `🔒 ${char} · ${label} locked — model updates ignored` : `${char} · ${label} unlocked`);
    });
}

// ─── Desktop: tap-a-card → anchored popover editor ─────────────────────────
function openEditor($card) {
    closeEditor();
    const $panel = $('#beholder_panel');
    const slot = $card.data('slot');
    const char = activeCharName();
    if (!slot || !char) return;
    const state = ctx?.getState?.() || {};
    const slotState = state[char]?.body?.[slot] || {};
    const slotLabel = $card.find('.bh-slot-name').first().text() || slot;
    const isHand = HAND_SLOTS.has(slot);

    const $ed = $(`
        <div class="bh-editor" role="dialog" aria-label="Edit ${esc(slotLabel)}">
            <div class="bh-editor-head">
                <span class="bh-editor-title">${esc(char)}</span>
                <span class="bh-editor-slot">· ${esc(slotLabel)}</span>
                ${lockToggleHtml(lockKey(char, slot))}
                <span class="bh-editor-close fa-solid fa-xmark" title="Close"></span>
            </div>
            <div class="bh-editor-body">${editorFormHtml(slotState, isHand)}</div>
            <div class="bh-editor-foot">
                <button class="bh-btn bhe-cancel">Cancel</button>
                <button class="bh-btn bh-btn-primary bhe-apply"><i class="fa-solid fa-check"></i> Apply</button>
            </div>
        </div>
    `);

    $panel.append($ed);
    const panelRect = $panel[0].getBoundingClientRect();
    const cardRect = $card[0].getBoundingClientRect();
    const edW = Math.min(330, panelRect.width - 16);
    $ed.css({ width: `${edW}px` });
    let left = cardRect.left - panelRect.left;
    left = Math.max(8, Math.min(left, panelRect.width - edW - 8));
    let top = cardRect.bottom - panelRect.top + 6;
    const edH = $ed.outerHeight() || 320;
    if (top + edH > panelRect.height - 8) {
        top = Math.max(44, cardRect.top - panelRect.top - edH - 6);
    }
    $ed.css({ left: `${left}px`, top: `${top}px` });

    $ed.on('mousedown', (e) => e.stopPropagation());
    $ed.find('.bh-editor-close, .bhe-cancel').on('click', closeEditor);
    wireEditorForm($ed);
    wireLockToggle($ed.find('.bh-lock-toggle'), char, slot, slotLabel);
    if (slotState.missing) $ed.find('.bh-editor-body').addClass('bhe-missing-mode');
    $ed.find('.bhe-apply').on('click', () => {
        applySlotEdit(char, slot, collectEditorForm($ed, isHand));
        closeEditor();
        toast(`✎ ${char} · ${slotLabel} updated — user edits persist until you change them`);
    });
    setTimeout(() => {
        $(document).on('click.bhEditor', (e) => {
            // A control that removed itself (the item-remove ×) leaves a DETACHED
            // target whose .closest() finds nothing — that's not an outside click.
            if (e.target && e.target.isConnected === false) return;
            if (!$(e.target).closest('.bh-editor,.bh-slot-card').length) closeEditor();
        });
        $(document).on('keydown.bhEditor', (e) => { if (e.key === 'Escape') closeEditor(); });
    }, 0);
}

// ─── Mobile / list view: "Edit slots" → bottom sheet (picker → editor) ─────
// The phone view is inherently different from the desktop tap-a-card popover:
// one "Edit slots" button opens a bottom sheet that lists EVERY slot (with its
// current contents + lock/edited marks, off-body slots hidden); tapping any
// slot — empty or full — swaps the sheet to the editor for it. So the picker is
// the single add-AND-edit surface for touch.
const PICKER_REGIONS = [
    { label: 'Head & Face', slots: ['head', 'face', 'left_eye', 'right_eye', 'left_ear', 'right_ear', 'mouth', 'neck'] },
    { label: 'Torso',       slots: ['left_shoulder', 'right_shoulder', 'chest', 'back', 'waist'] },
    { label: 'Arms & Hands', slots: ['left_arm', 'right_arm', 'left_hand', 'right_hand'] },
    { label: 'Legs & Feet', slots: ['left_leg', 'right_leg', 'left_foot', 'right_foot'] },
    { label: 'Species',     slots: ['tail', 'hind_left_leg', 'hind_right_leg', 'hind_left_foot', 'hind_right_foot'] },
];
const SPECIES_CONDITIONAL = new Set(['tail', 'hind_left_leg', 'hind_right_leg', 'hind_left_foot', 'hind_right_foot']);
// Species that add otherwise-hidden conditional slots to the picker.
const FAMILY_EXTRA = {
    centauroid: new Set(['tail', 'hind_left_leg', 'hind_right_leg', 'hind_left_foot', 'hind_right_foot']),
    serpentine: new Set(['tail']),
    digitigrade: new Set(['tail']),
};

const SLOT_LABELS = {
    head: 'head', face: 'face', neck: 'neck', chest: 'chest', back: 'back', waist: 'waist',
    mouth: 'mouth', tail: 'tail',
    left_eye: 'L. eye', right_eye: 'R. eye', left_ear: 'L. ear', right_ear: 'R. ear',
    left_shoulder: 'L. shoulder', right_shoulder: 'R. shoulder',
    left_arm: 'L. arm', right_arm: 'R. arm', left_hand: 'L. hand', right_hand: 'R. hand',
    left_leg: 'L. leg', right_leg: 'R. leg', left_foot: 'L. foot', right_foot: 'R. foot',
    hind_left_leg: 'L. hind leg', hind_right_leg: 'R. hind leg',
    hind_left_foot: 'L. hind foot', hind_right_foot: 'R. hind foot',
};

function slotSummary(sd) {
    if (!sd) return { text: 'empty', cls: 'bh-pick-empty' };
    if (sd.missing) return { text: 'missing', cls: 'bh-pick-missing' };
    const parts = (sd.worn || []).map(w => w.item).filter(Boolean);
    if (sd.holding) parts.push('✦ ' + (typeof sd.holding === 'string' ? sd.holding : sd.holding.item));
    const nw = (sd.wounds || []).length;
    let text = parts.join(', ');
    if (nw) text += (text ? ' · ' : '') + `${nw} wound${nw > 1 ? 's' : ''}`;
    if (!text) return sd.bare ? { text: 'bare', cls: 'bh-pick-bare' } : { text: 'empty', cls: 'bh-pick-empty' };
    return { text, cls: '' };
}

export function closeEditSheet() {
    $('#beholder_panel .bh-edit-sheet, #beholder_panel .bh-sheet-backdrop').remove();
    $(document).off('keydown.bhSheet');
}

function openEditSheet() {
    closeEditor();
    closeEditSheet();
    const $panel = $('#beholder_panel');
    const $backdrop = $('<div class="bh-sheet-backdrop"></div>');
    const $sheet = $(`
        <div class="bh-edit-sheet" role="dialog" aria-label="Edit slots">
            <div class="bh-sheet-head">
                <span class="bh-sheet-back fa-solid fa-arrow-left" title="Back to slots" hidden></span>
                <span class="bh-sheet-title">Edit a slot</span>
                <span class="bh-sheet-close fa-solid fa-xmark" title="Close"></span>
            </div>
            <div class="bh-sheet-body"></div>
        </div>`);
    $panel.append($backdrop).append($sheet);
    $sheet.on('mousedown', (e) => e.stopPropagation());
    $backdrop.on('click', closeEditSheet);
    $sheet.find('.bh-sheet-close').on('click', closeEditSheet);
    $(document).on('keydown.bhSheet', (e) => { if (e.key === 'Escape') closeEditSheet(); });
    showSlotPicker($sheet);
}

function showSlotPicker($sheet) {
    const char = activeCharName();
    if (!char) { closeEditSheet(); return; }
    const state = ctx?.getState?.() || {};
    const body = state[char]?.body || {};
    const family = familyOf(state[char]?.species);
    const offBody = OFF_BODY_SLOTS[family] || new Set();

    const groups = PICKER_REGIONS.map((region) => {
        const slots = region.slots.filter((s) => {
            if (offBody.has(s)) return false;
            if (SPECIES_CONDITIONAL.has(s)) return (FAMILY_EXTRA[family]?.has(s)) || body[s] != null;
            return true;
        });
        if (!slots.length) return '';
        const rows = slots.map((s) => {
            const sum = slotSummary(body[s]);
            const key = lockKey(char, s);
            const marks = (locksHas(key) ? '<i class="fa-solid fa-lock bh-pick-mark bh-pick-lock"></i>' : '')
                        + (editedHas(key) ? '<span class="bh-pick-mark bh-pick-edited">✎</span>' : '');
            return `<button class="bh-pick-slot" data-slot="${s}">
                <span class="bh-pick-label">${SLOT_LABELS[s] || s}</span>
                <span class="bh-pick-summary ${sum.cls}">${esc(sum.text)}</span>
                ${marks}
                <i class="fa-solid fa-chevron-right bh-pick-arrow"></i>
            </button>`;
        }).join('');
        return `<div class="bh-pick-region"><div class="bh-pick-region-head">${region.label}</div>${rows}</div>`;
    }).join('');

    $sheet.find('.bh-sheet-back').prop('hidden', true).off('click');
    $sheet.find('.bh-sheet-title').text(`${char} — edit a slot`);
    $sheet.find('.bh-sheet-body').scrollTop(0).html(`<div class="bh-slot-picker">${groups}</div>`);
    $sheet.find('.bh-pick-slot').on('click', function () {
        showSlotEditorScreen($sheet, $(this).data('slot'));
    });
}

function showSlotEditorScreen($sheet, slot) {
    const char = activeCharName();
    if (!char || !slot) return;
    const state = ctx?.getState?.() || {};
    const slotState = state[char]?.body?.[slot] || {};
    const isHand = HAND_SLOTS.has(slot);
    const label = SLOT_LABELS[slot] || slot;

    $sheet.find('.bh-sheet-back').prop('hidden', false).off('click').on('click', () => showSlotPicker($sheet));
    $sheet.find('.bh-sheet-title').html(`${esc(char)} <span style="opacity:.55">· ${esc(label)}</span>`);
    $sheet.find('.bh-sheet-body').scrollTop(0).html(`
        <div class="bh-sheet-lockrow">${lockToggleHtml(lockKey(char, slot))}</div>
        <div class="bh-editor-body">${editorFormHtml(slotState, isHand)}</div>
        <div class="bh-editor-foot">
            <button class="bh-btn bhe-cancel2">Back</button>
            <button class="bh-btn bh-btn-primary bhe-apply"><i class="fa-solid fa-check"></i> Apply</button>
        </div>`);
    const $scope = $sheet.find('.bh-sheet-body');
    wireEditorForm($scope);
    wireLockToggle($scope.find('.bh-lock-toggle'), char, slot, label);
    if (slotState.missing) $scope.find('.bh-editor-body').addClass('bhe-missing-mode');
    $scope.find('.bhe-cancel2').on('click', () => showSlotPicker($sheet));
    $scope.find('.bhe-apply').on('click', () => {
        applySlotEdit(char, slot, collectEditorForm($scope, isHand));
        toast(`✎ ${char} · ${label} updated`);
        showSlotPicker($sheet);   // back to the list; sheet stays open for more edits
    });
}

// ─── Card decorations (locks + user-edited) ────────────────────────────────
function decorateCards() {
    const char = activeCharName();
    if (!char) return;
    $('#beholder_panel .bh-slot-card').each(function () {
        const $c = $(this);
        const key = lockKey(char, $c.data('slot'));
        const locked = locksHas(key);
        $c.toggleClass('bh-slot-locked', locked);
        $c.toggleClass('bh-slot-user-edited', editedHas(key));
        const hasGlyph = $c.find('.bh-slot-lock-glyph').length > 0;
        if (locked && !hasGlyph) {
            $c.find('.bh-slot-name').first()
                .after('<span class="bh-slot-lock-glyph fa-solid fa-lock" title="locked — model updates ignored"></span>');
        } else if (!locked && hasGlyph) {
            $c.find('.bh-slot-lock-glyph').remove();
        }
    });
}

// ─── Panel layout switch ───────────────────────────────────────────────────
// One of three densities, driven by a single in-panel switch:
//   'paired'  → silhouette + L/R aligned rows, ghost-fill coupling (default)
//   'columns' → silhouette + the host's packed two-column layout (paired off)
//   'list'    → the digest: single-column Wounds→Held→Worn→State, no
//               silhouette, most compact (also auto-used below 360px)
//
// The layout mode is owned by settings.layout. The silhouette grid is built
// natively by the doll renderer (it reads the mode); this function only
// persists the choice, toggles the compact class, drives the renderer, and
// re-marks the in-panel switches.
export function setPanelLayout(mode) {
    const layout = ['paired', 'columns', 'list'].includes(mode) ? mode : 'paired';
    const $panel = $('#beholder_panel');
    ctx?.saveSettings?.({ layout });
    $panel.toggleClass('bh-layout-compact', layout === 'list');
    ctx?.setDollLayout?.(layout);
    ctx?.rerender?.();
}

function currentLayout() {
    const s = ctx?.getSettings?.() || {};
    return ['paired', 'columns', 'list'].includes(s.layout) ? s.layout : 'paired';
}

function markLayoutSwitches($panel) {
    const layout = currentLayout();
    $panel.find('.bh-layout-switch .bh-ls-opt').each(function () {
        this.classList.toggle('bh-ls-active', this.dataset.layout === layout);
    });
}

// ─── Re-bind hook (called by the host after every panel render) ────────────
// The host emits the cards, header tools, layout switch, and digest toolbar
// natively; after each render this re-applies card decorations and (re)binds
// the slot-edit, layout-switch, and edit-slots click handlers.
export function onPanelRendered() {
    const $panel = $('#beholder_panel');
    if (!$panel.length) return;
    wireSlotEditing($panel);
    decorateCards();
    $panel.find('.bh-layout-switch .bh-ls-opt')
        .off('click.bhLs')
        .on('click.bhLs', function (e) {
            e.stopPropagation();
            setPanelLayout($(this).data('layout'));
        });
    $panel.find('.bh-digest-edit')
        .off('click.bhEditSheet')
        .on('click.bhEditSheet', function (e) {
            e.stopPropagation();
            openEditSheet();
        });
    markLayoutSwitches($panel);
}

// ─── Note box (chat-bar directive helper) ──────────────────────────────────
// The host wires the actual ST chat input; this captures a free-text intent and
// hands it to the host as a directive to apply before the next AI turn.
export function wireNoteBox({ input, button, onDirective }) {
    const fire = () => {
        const text = input.value.trim();
        if (!text) { toast('Type an intent first — e.g. "set my sword to broken"'); return; }
        input.value = '';
        onDirective?.(text);
        toast(`✦ Applied now: "${text}" — your edit wins (and is in the prompt for the next reply)`);
    };
    button.addEventListener('click', fire);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') fire(); });
}
