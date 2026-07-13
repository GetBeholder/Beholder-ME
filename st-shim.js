// SillyTavern-compatibility shim for Marinara Engine.
//
// This is the ONLY Marinara-specific file. It exports the exact host seams the
// verbatim Beholder `index.js` imports from SillyTavern's script.js / extensions.js,
// backed by Marinara instead — so index.js (and every view/banner/backfill/seed it
// drives) runs UNCHANGED. Marinara's extension helper `marinara` is a global here.
//
// Seam map:
//   extension_settings / saveSettingsDebounced   -> localStorage (global config)
//   chat_metadata      / saveMetadataDebounced    -> localStorage (per active chat)
//   getContext().chat                             -> /api/chats/:id/messages (full list)
//   getContext().characters                       -> /api/characters/:id cards
//   setExtensionPrompt                            -> a chat-scoped constant lorebook entry
//   eventSource / event_types                     -> a driver that watches Marinara
//                                                    and emits ST message events

import jQuery from "jquery";
import BEHOLDER_CSS from "./style.css";
import FA_EMBED from "./fa-embed.css";
import BH_LOGO from "./bh-logo.png"; // Beholder brand mark (data URI) for the edge tab
import { setDollLayout } from "./paperdoll.js";

if (typeof window !== "undefined") {
  window.$ = window.jQuery = jQuery;
}

// Host baseline ST provides but Marinara doesn't: load Beholder's stylesheet, remap
// ST theme tokens onto Marinara's, anchor the panel top-right (clear of the composer),
// and supply text glyphs for the FontAwesome icons ST would load. Not "integration" —
// just the environment index.js/panel.js/views.js assume.
// The mono/LONG extraction prompt for GENERAL (non-trained) models — hardcoded here on
// purpose so it isn't a loose, casually-editable file. The TRAINED Beholder model uses the
// 5-pass SHORT prompts instead (short_pass_prompts.js). Must stay under 4000 chars (ME
// proxy `instruction` cap). Applied automatically when a Marinara connection is chosen.
const GENERAL_PROMPT = `You track characters' physical state in roleplay. Read the new message and output JSON only — no prose, no commentary, no markdown.
OUTPUT: always emit {"changed": <bool>}. Add a "delta" object ONLY when changed=true. If a 'Current state' is given, set changed=true only when a character's physical state actually changes in this message, and put ONLY the changed characters and fields under delta; if nothing changes output exactly {"changed": false} (when unsure, false). If NO current state is given (snapshot), set changed=true and put each character's FULL current state in delta. If a 'Persona: <name>' line is given, that character maps to the key "self"; otherwise first-person I/me = "self".
SCHEMA (per character): {"<char>": {"body": {"<slot>": {"worn": [{"item": str, "material"?: str, "color"?: str, "damage": "pristine|damaged|cracked|broken"}], "holding": {"item": str, "damage": str}, "wounds": [{"text": str, "severity": "minor|serious|critical", "bleeding": bool}], "bare": bool, "missing": bool}}, "species"?: str}}.
SLOTS: head, face, neck, chest, back, waist, left_shoulder, right_shoulder, left_arm, right_arm, left_hand, right_hand, left_leg, right_leg, left_foot, right_foot, left_eye, right_eye, left_ear, right_ear, mouth; plus tail and hind_left_leg/hind_right_leg/hind_left_foot/hind_right_foot for non-human species. holding is only on hands. 'damage' is required on every worn AND held item (default pristine). Include 'species' ONLY when non-human. item/material/color/damage/species/text/severity are plain strings; bare/missing/bleeding are plain bools. Emit color/material ONLY when the prose states them, each in its OWN field, never inside item ({"item":"cloak","color":"red"}, not "red cloak"). A garment covering several slots is emitted on EACH slot it covers.
RULES:
- NEVER-STATE: a noun in the prose is NOT enough. Emit only what a character actually WEARS, HOLDS, or is WOUNDED BY. Do NOT emit scenery/background items, another character's items, briefly-handled tools (a whetstone, a cup set back down), or the character's own anatomy/appearance (scars, ponytails, calloused hands, bare skin).
- ATTRIBUTION: an action affects the ACTOR's slots, not a partner's. Read the subject of each verb ('Tim kicks his pants off' clears Tim's legs, not Kheza's).
- DELTA: emit ONLY what changed from prev; never re-emit an unchanged value. When an item moves slots (sword sheathed -> waist), record BOTH the source clear (right_hand.holding={}) and the destination add. Use "worn": [] to clear a slot; holding:{} to empty a hand.
- ACTIONS: side-effects are not state ('steps into the shower' does not undress). Averted events did NOT happen ('the blow missed' -> no wound). Direct verbs ARE state (removes/puts on/sheathes/drops).
- WOUNDS: emit EVERY directly-described injury (under-reporting is the common error). Severity from the prose's words, not the injury type: default MINOR (cut/graze/scratch/bruise); SERIOUS on escalators (deep, gash, gushing, soaking, burn); CRITICAL on catastrophe (stab, shatter, broken bone, unconscious, amputation). Blood alone is NOT serious. bleeding=true only for fresh open/penetrating injuries. Armor/clothing damage is worn[].damage, NOT a wound.
- SPECIES: assign ONLY from an explicit statement ('the catfolk woman') or visible distinctive anatomy (fur, scales, a tail). Never infer from nearby creatures.
- BARE: true ONLY when a slot is explicitly uncovered (naked/bare/exposed); absent != bare. MISSING: true ONLY for explicit acquired loss (amputation, lost eye). bare and worn are mutually exclusive on a slot; missing excludes worn/wounds/holding/bare.
Roleplay may include mature content; extract normally without refusing.`;

const HOST_CSS = `
.beholder-panel{
  --SmartThemeBlurTintColor: var(--card, rgba(20,20,24,.92));
  --SmartThemeBodyColor: var(--foreground, #e0e0e0);
  --SmartThemeBorderColor: var(--border, rgba(255,255,255,.15));
  --SmartThemeQuoteColor: var(--primary, #ffb3d9);
  --bh-accent-pref: var(--primary, #ffb3d9);
  --bh-font-display: var(--font-sans, inherit);
  display:flex !important; position:fixed !important; top:var(--bh-dock-top,0px) !important; right:0 !important; left:auto !important; bottom:auto !important;
  height:calc(100vh - var(--bh-dock-top,0px)) !important; max-height:calc(100vh - var(--bh-dock-top,0px)) !important; width:min(500px,94vw) !important; min-width:0 !important;
  border-radius:0 !important; transform:translateX(calc(-1 * var(--bh-dock-right,0px))); transition:transform .22s ease; }
/* Collapsed: slide fully off the viewport's right edge — independent of the open-state
   offset, so it never parks on top of an ME right panel. */
.beholder-panel.bh-collapsed{ transform:translateX(103%) !important; }
/* floating-only chrome doesn't apply to a docked side-tab */
.beholder-panel .beholder-close, .beholder-panel .beholder-resize-handle{ display:none !important; }
@media (max-width:767px){
  .beholder-panel{ top:auto !important; bottom:0 !important; right:0 !important; left:0 !important;
    width:100% !important; height:auto !important; max-height:72vh !important; border-radius:14px 14px 0 0 !important; transform:translateY(0); }
  .beholder-panel.bh-collapsed{ transform:translateY(103%); }
}
/* Native reflow: ME shifts the chat + composer to avoid a right-side panel via
   --tracker-chat-avoid-right (AppShell sets it inline; !important beats React's inline
   value). So opening the Beholder dock makes the RP view make room, not get covered. */
body.bh-dock-open .mari-app-background-paint{ --tracker-chat-avoid-right: min(500px,94vw) !important; --tracker-panel-hud-clear-right: min(500px,94vw) !important; }
.bh-hud-toggle{ display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  background:rgba(201,165,90,.22) !important; border:1px solid rgba(201,165,90,.55) !important;
  box-shadow:0 0 0 1px rgba(201,165,90,.12) inset !important; }
.bh-hud-toggle:hover{ background:rgba(201,165,90,.40) !important; border-color:rgba(233,205,119,.85) !important; }
.bh-hud-toggle:hover img{ filter:brightness(1.12) }
/* FontAwesome glyphs are provided by the embedded subset font — see fa-embed.css (injected below). */

#bh-extractor-modal .bh-ex-card{background:var(--card,#141414);color:var(--foreground,#eee);border:1px solid var(--border,#d4adfc33);border-radius:12px;padding:14px;width:min(460px,92vw);max-height:86vh;overflow:auto;font-family:var(--font-sans,inherit)}
#bh-extractor-modal .bh-ex-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
#bh-extractor-modal .bh-ex-opt{border:1px solid var(--border,#d4adfc33);border-radius:8px;padding:10px;margin-bottom:10px}
#bh-extractor-modal .bh-ex-disabled{opacity:.55}
#bh-extractor-modal .bh-ex-title{font-weight:700;margin-bottom:2px}
#bh-extractor-modal .bh-ex-sub{font-size:12px;opacity:.8;margin-bottom:8px}
#bh-extractor-modal .bh-ex-tag{font-size:11px;border:1px solid var(--border,#d4adfc33);border-radius:6px;padding:1px 6px;margin-left:6px;opacity:.85}
#bh-extractor-modal .bh-ex-warn{color:var(--primary,#ffb3d9);border-color:var(--primary,#ffb3d9)}
#bh-extractor-modal .bh-ex-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
#bh-extractor-modal .bh-ex-url,#bh-extractor-modal .bh-ex-conn{flex:1;min-width:0;background:var(--input,#1a1a2e);color:inherit;border:1px solid var(--border,#d4adfc33);border-radius:6px;padding:5px 7px;font-size:12px;margin-bottom:6px}
#bh-extractor-modal button{cursor:pointer;background:var(--primary,#ffb3d9);color:var(--primary-foreground,#0a0a0a);border:0;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600}
#bh-extractor-modal .bh-ex-x{background:transparent;color:inherit;font-size:15px;padding:0 4px}
#bh-extractor-modal .bh-ex-link{font-size:12px;color:var(--primary,#ffb3d9);text-decoration:underline}

/* ── ME theming: track the SELECTED ME theme (surfaces, text, accent, borders). ──────
   Beholder ships a brand-gold accent; here we remap its accent + the ST theme seams onto
   ME's shadcn theme vars (--background/--card/--foreground/--primary/--border/--input) so
   the panel matches whatever theme the user picked — light or dark. The remap is applied
   to the panel AND to every Beholder surface that mounts on <body> (tools menu, edit sheet,
   note box) so they inherit the same palette. Semantic colors (damage tiers, the literal
   "gold" color swatch, wound red) are intentionally left untouched. */
.beholder-panel, .beholder-tools-menu, .bh-edit-sheet, .bh-edit-popover, .bh-sheet-backdrop, .beholder-notebox{
  --SmartThemeBlurTintColor: var(--card); --SmartThemeBodyColor: var(--foreground);
  --SmartThemeBorderColor: var(--border); --SmartThemeQuoteColor: var(--primary); --SmartThemeEmColor: var(--primary);
  --bh-gold: var(--primary) !important; --bh-gold-deep: var(--primary) !important;
  --bh-accent: var(--primary) !important; --bh-accent-pref: var(--primary) !important; --bh-holding: var(--primary) !important; }
.beholder-panel{ background:var(--background) !important; color:var(--foreground) !important;
  backdrop-filter:none !important; -webkit-backdrop-filter:none !important; font-family:var(--font-sans,inherit) !important;
  border-left:1px solid var(--border) !important; box-shadow:-12px 0 34px rgba(0,0,0,.38) !important; }
.beholder-panel .bh-view, .beholder-panel .bh-view-head, .beholder-panel .beholder-panel-body, .beholder-panel .beholder-backfill-status{ background:var(--background) !important; color:var(--foreground) !important; }
.beholder-panel .beholder-panel-header{ background:var(--card) !important; border-bottom:1px solid var(--border) !important; }
.beholder-panel .bh-vsection, .beholder-panel .bh-conn-opt, .beholder-panel details.bh-vsection, .beholder-tools-menu{ background:var(--card) !important; border-color:var(--border) !important; }
.beholder-panel input, .beholder-panel select, .beholder-panel textarea{ background:var(--input) !important; border:1px solid var(--border) !important; color:var(--foreground) !important; }
.beholder-panel .bh-conn-tag-warn{ color:var(--primary) !important; border-color:var(--primary) !important; }
.beholder-panel .bh-conn-hint{ font-size:12px; opacity:.8; margin:0 0 8px; }
/* The docked panel is wide — show every tool inline; drop ST's narrow-mode ⋯ overflow. */
.beholder-panel .beholder-tools-more{ display:none !important; }
.beholder-panel .beholder-tool-btn{ display:inline-flex !important; align-items:center; justify-content:center; }
/* In-browser model is permanently shelved for ME — hide its card + "Active now" line. */
.beholder-panel #bhp-opt-browser, .beholder-panel .bh-localmodel-card, .beholder-panel .bh-conn-active{ display:none !important; }
/* Remaining hardcoded golds the var-remap can't reach (literal rgba / hex). */
.beholder-panel .bh-placeholder-note{ color:var(--primary) !important; background:color-mix(in srgb, var(--primary) 12%, transparent) !important; border-color:color-mix(in srgb, var(--primary) 42%, transparent) !important; }
.beholder-panel .bh-placeholder-note b{ color:var(--primary) !important; }
.beholder-panel .bh-slot-card.bh-hover-link, .beholder-panel .bh-chip-spanning.bh-hover-link{ background:color-mix(in srgb, var(--primary) 12%, transparent) !important; border-color:color-mix(in srgb, var(--primary) 55%, transparent) !important; }
/* No-model banner (warn/loading): swap the gold tint for the ME accent. */
.beholder-panel .bh-no-model-banner.bh-banner-warn, .beholder-panel .bh-no-model-banner.bh-banner-loading{ background:color-mix(in srgb, var(--primary) 12%, transparent) !important; border-bottom-color:color-mix(in srgb, var(--primary) 40%, transparent) !important; }
.beholder-panel .bh-no-model-banner .bh-banner-copy b{ color:var(--primary) !important; }
.beholder-panel .bh-no-model-banner.bh-banner-warn .bh-banner-icon{ color:var(--primary) !important; text-shadow:none !important; }
/* Slot editor CTA (Apply) + active lock: style.css hardcodes LITERAL gold (rgba(201,165,90) /
   rgba(255,234,167)) NOT via the remappable --bh-* vars, and the editor renders in the edit
   SHEET (mobile) / POPOVER (desktop), which sit OUTSIDE .beholder-panel — so the panel-scoped
   overrides never reached them and they stayed gold. Map them to the theme accent here. */
.beholder-panel .bh-btn-primary, .bh-edit-sheet .bh-btn-primary, .bh-edit-popover .bh-btn-primary{
  background:color-mix(in srgb, var(--primary) 20%, transparent) !important;
  border-color:color-mix(in srgb, var(--primary) 55%, transparent) !important;
  color:var(--primary) !important; }
.beholder-panel .bh-btn-primary:hover, .bh-edit-sheet .bh-btn-primary:hover, .bh-edit-popover .bh-btn-primary:hover{
  box-shadow:0 4px 18px color-mix(in srgb, var(--primary) 22%, transparent) !important; border-color:var(--primary) !important; }
.beholder-panel .bh-lock-toggle.bh-locked-on, .bh-edit-sheet .bh-lock-toggle.bh-locked-on, .bh-edit-popover .bh-lock-toggle.bh-locked-on{
  color:var(--primary) !important; border-color:color-mix(in srgb, var(--primary) 50%, transparent) !important;
  text-shadow:0 0 8px color-mix(in srgb, var(--primary) 40%, transparent) !important; }
.bh-edit-sheet::before{ background:linear-gradient(90deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 40%, transparent) 22%, transparent 60%) !important; }
/* Drop the ◉ brand dot + sub-view crumb; hide ST's collapsed "Advanced: custom endpoint". */
.beholder-panel .beholder-panel-title::before{ content:none !important; }
.beholder-panel .bh-view-crumb{ display:none !important; }
.beholder-panel .bh-adv-endpoint{ display:none !important; }
/* Back arrow points toward the docked (right) edge. */
.beholder-panel .bh-view-back, .beholder-panel .bh-sheet-back{ transform:scaleX(-1); }
/* Close button, top-left of the header — keeps the title clustered on the left. */
.beholder-panel .beholder-panel-title{ margin-right:auto; }
.beholder-panel .bh-dock-close{ cursor:pointer; font-size:15px; line-height:1; opacity:.6; padding:0 12px 0 2px; color:var(--foreground); }
.beholder-panel .bh-dock-close:hover{ opacity:1; color:var(--primary); }
/* Note box (one-shot state directive) above ME's composer — styled like an ME input. */
.beholder-notebox{ display:flex; gap:8px; align-items:center; margin:0 auto 8px; max-width:986px; width:100%; box-sizing:border-box; padding:0 12px; pointer-events:auto; }
.beholder-notebox-input{ flex:1; min-width:0; background:var(--input) !important; color:var(--foreground) !important; border:1px solid var(--border) !important; border-radius:12px !important; padding:9px 13px !important; font-size:13px; font-family:var(--font-sans,inherit); }
.beholder-notebox-btn{ background:var(--primary) !important; color:var(--primary-foreground) !important; border:0 !important; border-radius:12px !important; padding:9px 14px !important; cursor:pointer; }
/* Connection chooser (Settings → CONNECTION): status/warning + local endpoint + ME connection. */
.beholder-panel .bh-conn2{ display:flex; flex-direction:column; gap:10px; margin:2px 0 12px; }
.beholder-panel .bh-conn2-status{ font-size:12.5px; padding:8px 10px; border-radius:8px; border:1px solid var(--border); background:var(--card); }
.beholder-panel .bh-conn2-status.warn{ color:var(--primary) !important; border-color:var(--primary) !important; }
.beholder-panel .bh-conn2-status code{ font-size:11px; opacity:.85; }
.beholder-panel .bh-conn2-opt{ background:var(--card) !important; border:1px solid var(--border); border-radius:10px; padding:10px; }
.beholder-panel .bh-conn2-h{ display:flex; align-items:center; gap:8px; font-weight:700; font-size:13px; margin-bottom:3px; }
.beholder-panel .bh-conn2-rec{ font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:var(--primary-foreground); background:var(--primary); border-radius:5px; padding:1px 6px; }
.beholder-panel .bh-conn2-hint{ font-size:11.5px; opacity:.82; margin-bottom:8px; line-height:1.45; }
.beholder-panel .bh-conn2-hint a{ color:var(--primary); }
.beholder-panel .bh-conn2-row{ display:flex; gap:6px; align-items:center; }
.beholder-panel .bh-conn2-row input, .beholder-panel .bh-conn2-row select{ flex:1; min-width:0; }
.beholder-panel .bh-conn2 .bh-btn{ background:var(--primary) !important; color:var(--primary-foreground) !important; border:0; border-radius:8px; padding:7px 13px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap; }
.beholder-panel .bh-conn2 .bh-btn:hover{ filter:brightness(1.08); }
.beholder-panel .bh-linklike{ background:none; border:0; color:var(--primary); font-size:11px; cursor:pointer; padding:0; text-decoration:underline; }
.beholder-panel .bh-linklike:hover{ filter:brightness(1.15); }
/* Optional (Beholder Settings): drop Marinara's fade on roleplay avatars. The bottom fade is a
   mask on the panel STACK + the img, so strip those. The rpg-avatar-panel-tail is a BLURRED
   duplicate (blur 14px) that ME masks down to a thin sliver as a soft reflection — unmasking it
   reveals the whole blur ("vague from the middle out"), so HIDE the tail instead. */
body.bh-no-avatar-fade .rpg-avatar-panel-stack,
body.bh-no-avatar-fade .rpg-avatar-panel-media img,
body.bh-no-avatar-fade .rpg-avatar-panel img{ -webkit-mask-image:none !important; mask-image:none !important; }
body.bh-no-avatar-fade .rpg-avatar-panel-tail{ display:none !important; }
body.bh-no-avatar-fade .rpg-avatar-panel::after{ display:none !important; }
/* Optional (Beholder Settings): SHOW FULL PORTRAIT. ME crops the avatar to a fixed 11rem*scale box
   (object-cover object-top) so only the top shows. Put the stack/media/img back in flow with a
   natural (auto) height + object-contain so the WHOLE image shows and drives its own height; the
   rail's overflow is opened and the outer flex is items-stretch, so a short message just grows the
   bubble with empty space beneath the text (per user). Tail/glow hidden in this mode. */
body.bh-full-portrait .mari-roleplay-avatar-panel-rail{ overflow:visible !important; align-items:stretch !important; }
body.bh-full-portrait .rpg-avatar-panel-stack{ position:relative !important; height:auto !important; top:auto !important; left:auto !important; }
body.bh-full-portrait .rpg-avatar-panel-media{ position:relative !important; height:auto !important; inset:auto !important; }
body.bh-full-portrait .rpg-avatar-panel-media img{ position:relative !important; inset:auto !important; height:auto !important; width:100% !important; object-fit:contain !important; }
body.bh-full-portrait .rpg-avatar-panel-tail{ display:none !important; }
body.bh-full-portrait .rpg-avatar-panel::after{ display:none !important; }
/* Widescreen chat — on a wide monitor ME centres the roleplay column at 58rem and lets 1fr
   grid spacers eat the rest, so text bunches in a narrow strip. The column width comes from
   one var (--mari-roleplay-message-column-width) used by the grid track AND the body width;
   bump it to fill the viewport. Texting mode caps bubbles at max-w-[72%] instead — widen that too. */
body.bh-wide-chat [data-chat-mode="roleplay"]{ --mari-roleplay-message-column-width: 92vw !important; }
body.bh-wide-chat [class*="max-w-[72%]"]{ max-width: 92% !important; }
/* Widen Beholder's own note box to match the widened chat column (it has its own 986px cap
   rather than following ME's column var). */
body.bh-wide-chat .beholder-notebox{ max-width: 92vw !important; }
/* Color quoted dialogue (mellow orange default; --bh-quote-color left as a var for a future
   picker). ME renders dialogue as <strong class="text-black dark:text-white"> when no persona
   dialogue-colour is set — target that so only quotes recolour, not all bold. */
body.bh-quote-color .mari-message strong.text-black,
body.bh-quote-color .mari-roleplay-message-body strong.text-black{ color: var(--bh-quote-color, #e0a566) !important; }
/* Optional (Beholder Settings): BIGGER roleplay portraits. Widening only the rail changes
   the panel's aspect and crops a tall portrait ("cut in half"), so instead boost the avatar
   scale proportionally (beyond ME's 2.5× cap) — the whole cropped avatar just gets larger
   (wider AND taller), no extra cropping. */
body.bh-big-portraits .mari-message{ --roleplay-avatar-scale: var(--bh-portrait-scale, 3) !important; }
`;

function mountBaseline() {
  try {
    marinara.addStyle(BEHOLDER_CSS);
    marinara.addStyle(HOST_CSS);
    marinara.addStyle(FA_EMBED); // real FontAwesome-solid glyphs (subset), ME ships lucide only
  } catch {}
  // The panel is opened from the logo icon in ME's roleplay top bar (mountHudToggle),
  // next to the chat-settings controls — no separate edge tab.
  applyMobileLayout();
}

const MODULE_NAME = "beholder";
const LS_SETTINGS = "beholder:settings";
const LS_CHAT = (id) => `beholder:chat:${id}`;
const LS_ACTIVE = "marinara-active-chat-id";
const activeChatId = () => localStorage.getItem(LS_ACTIVE) || "";

// ── extension_settings (global) ──────────────────────────────────────────────
export const extension_settings = (() => {
  try {
    return JSON.parse(localStorage.getItem(LS_SETTINGS) || "{}");
  } catch {
    return {};
  }
})();
let settingsTimer = null;
export function saveSettingsDebounced() {
  clearTimeout(settingsTimer);
  settingsTimer = setTimeout(() => {
    try {
      localStorage.setItem(LS_SETTINGS, JSON.stringify(extension_settings));
    } catch {}
  }, 250);
}

// Suppress the first-run onboarding popover (panel.js shows it once unless
// settings.panel.onboarded is set). Pre-set the flag here so panel.js stays verbatim.
{
  const s = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
  s.panel = { visible: true, collapsed: false, pos: null, ...(s.panel || {}), onboarded: true };
}

// ── chat_metadata (per active chat; a live object index.js reads as chat_metadata[MODULE_NAME]) ──
export const chat_metadata = {};
function loadChatMeta(id) {
  for (const k of Object.keys(chat_metadata)) delete chat_metadata[k];
  if (!id) return;
  try {
    Object.assign(chat_metadata, JSON.parse(localStorage.getItem(LS_CHAT(id)) || "{}"));
  } catch {}
}
let metaTimer = null;
export function saveMetadataDebounced() {
  clearTimeout(metaTimer);
  metaTimer = setTimeout(() => {
    const id = activeChatId();
    if (!id) return;
    try {
      localStorage.setItem(LS_CHAT(id), JSON.stringify(chat_metadata));
    } catch {}
  }, 250);
}

// ── extension prompt enums ────────────────────────────────────────────────────
export const extension_prompt_types = { IN_PROMPT: "in_prompt", IN_CHAT: "in_chat", BEFORE_PROMPT: "before_prompt", NONE: "none" };
export const extension_prompt_roles = { SYSTEM: "system", USER: "user", ASSISTANT: "assistant" };

// ── eventSource ───────────────────────────────────────────────────────────────
export const event_types = {
  MESSAGE_RECEIVED: "message_received",
  MESSAGE_SENT: "message_sent",
  CHAT_CHANGED: "chat_changed",
  GENERATION_STARTED: "generation_started",
  MESSAGE_SWIPED: "message_swiped",
  MESSAGE_DELETED: "message_deleted",
  MESSAGE_UPDATED: "message_updated",
};
const listeners = new Map();
export const eventSource = {
  on(type, fn) {
    if (!listeners.has(type)) listeners.set(type, []);
    listeners.get(type).push(fn);
  },
  off(type, fn) {
    const a = listeners.get(type);
    if (a) listeners.set(type, a.filter((f) => f !== fn));
  },
  once(type, fn) {
    const w = (...args) => {
      eventSource.off(type, w);
      return fn(...args);
    };
    eventSource.on(type, w);
  },
  async emit(type, ...args) {
    for (const fn of listeners.get(type) || []) {
      try {
        await fn(...args);
      } catch (e) {
        console.warn("[beholder-shim] listener error", type, e);
      }
    }
  },
};

// ── getContext ────────────────────────────────────────────────────────────────
let chatCache = []; // [{ mes, is_user, _id }]
let charsCache = []; // character-card data objects
let personaName = ""; // chat persona name (from /api/characters/personas/:id)
let personaDesc = ""; // chat persona description → seeds the "self" card (getCardSeedSource)
let currentMode = null; // Beholder tracks (and shows) in Roleplay mode only, for now

export function getContext() {
  return {
    chat: chatCache,
    name1: personaName,
    name2: charsCache[0]?.name || "",
    // ST power-user persona seam: index.js getCardSeedSource() reads the persona
    // description from powerUserSettings.persona_description to seed the "self" card.
    powerUserSettings: { persona_description: personaDesc },
    characters: charsCache,
    characterId: charsCache.length ? 0 : undefined,
    this_chid: charsCache.length ? 0 : undefined,
    setExtensionPrompt,
    // Best-effort no-ops for ST helpers seedFromCards / others may call.
    substituteParams: (t) => t,
  };
}

// setExtensionPrompt -> ONE chat-scoped constant lorebook entry, kept idempotent.
// type 'none' or empty text clears it. constant + position "at message depth" ==
// ST's IN_CHAT depth-N SYSTEM injection; never front-of-context.
//
// HISTORY (bug fixed): the old version cached the lorebook/entry ids in module vars +
// the SHARED chat_metadata LS key. That key is rewritten wholesale by saveMetadataDebounced
// (which doesn't carry the ids), so the cache was wiped constantly; combined with the
// fire-and-forget call (no serialization), nearly every injection raced to POST a BRAND-NEW
// lorebook. A single chat piled up 100+ constant entries that ALL injected at once ->
// duplicated/stale "Current physical state" lines. Now: a single serialized init per chat
// that DISCOVERS and reuses the existing lorebook+entry from the server (deleting any
// duplicates it finds), cached under a DEDICATED key that nothing else touches.
const LS_LB = (id) => `beholder:lb:${id}`;
const asList = (r) => (Array.isArray(r) ? r : (r && (r.data || r.entries || r.items)) || []);
let lbChatId = "";
let lbReady = null;      // Promise<{lorebookId, entryId}> for lbChatId
let injectChain = Promise.resolve();   // serializes all injections (no create races)

async function ensureLbEntry(chatId) {
  if (lbReady && lbChatId === chatId) return lbReady;
  lbChatId = chatId;
  lbReady = (async () => {
    let lorebookId = "", entryId = "";
    try {
      const c = JSON.parse(localStorage.getItem(LS_LB(chatId)) || "{}");
      lorebookId = c.lorebookId || ""; entryId = c.entryId || "";
    } catch {}
    // Authoritative: reuse an existing Beholder lorebook for this chat; delete any extras.
    if (!lorebookId) {
      let mine = [];
      try { mine = asList(await marinara.apiFetch("/lorebooks")).filter((l) => l && l.chatId === chatId && /Beholder/.test(l.name || "")); } catch {}
      if (mine.length) {
        lorebookId = mine[0].id;
        // Delete leftover duplicates in the BACKGROUND (a chat with a big backlog from the
        // old bug shouldn't stall this injection on 100+ awaited DELETEs) — they clear within
        // seconds and future turns stay at one.
        for (const extra of mine.slice(1)) marinara.apiFetch(`/lorebooks/${extra.id}`, { method: "DELETE" }).catch(() => {});
      }
    }
    if (!lorebookId) {
      try { const res = await marinara.apiFetch("/lorebooks", { method: "POST", body: JSON.stringify({ name: "Beholder — Physical State", chatId }) }); lorebookId = res?.id ?? res?.data?.id ?? ""; } catch {}
    }
    // Reuse the lorebook's single entry (delete extras) so we PATCH rather than pile up.
    if (lorebookId && !entryId) {
      let entries = [];
      try { entries = asList(await marinara.apiFetch(`/lorebooks/${lorebookId}/entries`)); } catch {}
      if (entries.length) {
        entryId = entries[0].id;
        for (const extra of entries.slice(1)) { try { await marinara.apiFetch(`/lorebooks/${lorebookId}/entries/${extra.id}`, { method: "DELETE" }); } catch {} }
      }
    }
    try { localStorage.setItem(LS_LB(chatId), JSON.stringify({ lorebookId, entryId })); } catch {}
    return { lorebookId, entryId };
  })();
  return lbReady;
}

async function setExtensionPromptImpl(_key, text, type, depth, _scan, _role) {
  const chatId = activeChatId();
  if (!chatId) return;
  const clear = type === "none" || !text;
  const ids = await ensureLbEntry(chatId);
  if (!ids.lorebookId) return;
  const entry = { lorebookId: ids.lorebookId, name: "Beholder state", content: clear ? "" : String(text), constant: true, position: 2, depth: Number(depth) || 1, role: "system", enabled: !clear };
  try {
    if (!ids.entryId) {
      const created = await marinara.apiFetch(`/lorebooks/${ids.lorebookId}/entries`, { method: "POST", body: JSON.stringify(entry) });
      ids.entryId = created?.id ?? created?.data?.id ?? "";
      try { localStorage.setItem(LS_LB(chatId), JSON.stringify(ids)); } catch {}
    } else {
      await marinara.apiFetch(`/lorebooks/${ids.lorebookId}/entries/${ids.entryId}`, { method: "PATCH", body: JSON.stringify(entry) });
    }
  } catch (e) {
    console.warn("[beholder-shim] injection failed:", e?.message || e);
  }
}
// Serialize: chain each call after the previous so concurrent injections never both
// see an empty entryId and race to create duplicates.
function setExtensionPrompt(...a) {
  injectChain = injectChain.then(() => setExtensionPromptImpl(...a)).catch(() => {});
}
function loadRaw(k) {
  try {
    return JSON.parse(localStorage.getItem(k) || "{}");
  } catch {
    return {};
  }
}

// ── Driver: fetch messages/cards, swap metadata on chat change, emit ST events ──
async function refreshChat() {
  const id = activeChatId();
  if (!id) {
    chatCache = [];
    return;
  }
  const msgs = await marinara.apiFetch(`/chats/${id}/messages`).catch(() => []);
  chatCache = (Array.isArray(msgs) ? msgs : []).map((m) => ({ mes: m.content || "", is_user: m.role === "user", _id: m.id }));
}
async function refreshChars() {
  const id = activeChatId();
  charsCache = [];
  personaName = "";
  personaDesc = "";
  if (!id) return;
  const chat = await marinara.apiFetch(`/chats/${id}`).catch(() => null);
  currentMode = chat?.mode ?? null;
  // The CHAT's persona → the "self" card seed (index.js reads name1 +
  // powerUserSettings.persona_description). Fetch by id via /characters/personas/:id —
  // many users have no globally-active persona, so /personas/active returns null. Seed
  // from description + appearance (appearance is the physical-state–rich field).
  try {
    const pid = chat?.personaId;
    const p = pid ? await marinara.apiFetch(`/characters/personas/${pid}`) : null;
    if (p && typeof p === "object") {
      personaName = p.name || "";
      personaDesc = [p.description, p.appearance].filter((x) => x && String(x).trim()).join("\n\n");
    }
  } catch {}
  let ids = [];
  try {
    ids = JSON.parse(chat?.characterIds || "[]");
  } catch {}
  for (const cid of ids) {
    const c = await marinara.apiFetch(`/characters/${cid}`).catch(() => null);
    if (!c) continue;
    try {
      const d = typeof c.data === "string" ? JSON.parse(c.data) : c.data || c;
      charsCache.push({ ...d, avatar: cid });
    } catch {}
  }
}

let prevSig = null; // [{is_user, hash}] snapshot to diff against
const sigOf = (arr) => arr.map((m) => ({ u: m.is_user, h: hashText(m.mes) }));
function hashText(t) {
  let h = 0;
  const s = String(t || "");
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return `${h}:${s.length}`;
}

// Rebuild chatCache and translate the diff vs the previous snapshot into ST events.
async function pump(initial = false) {
  await refreshChat();
  const sig = sigOf(chatCache);

  // Roleplay-only (for now): keep chatCache fresh for getContext, but never emit
  // tracking events outside Roleplay mode.
  if (currentMode !== "roleplay") {
    prevSig = sig;
    return;
  }

  if (initial || prevSig === null) {
    prevSig = sig; // prime — never retro-extract history (matches ST's live-only tracking)
    return;
  }

  // Deletion (shorter now) — emit MESSAGE_DELETED with the new length; index.js drops
  // tail deltas + replays survivors.
  if (sig.length < prevSig.length) {
    prevSig = sig;
    await eventSource.emit(event_types.MESSAGE_DELETED, sig.length);
    return;
  }

  // Find the first index whose message is new or changed.
  let firstChanged = -1;
  for (let i = 0; i < sig.length; i++) {
    const p = prevSig[i];
    if (!p || p.u !== sig[i].u || p.h !== sig[i].h) {
      firstChanged = i;
      break;
    }
  }
  prevSig = sig;
  if (firstChanged === -1) return;

  // New tail messages → MESSAGE_SENT (user) / MESSAGE_RECEIVED (AI), in order.
  // A changed existing message → MESSAGE_UPDATED (re-extract + re-apply later).
  for (let i = firstChanged; i < sig.length; i++) {
    if (i < origPrevLen) {
      await eventSource.emit(event_types.MESSAGE_UPDATED, i);
    } else if (sig[i].u) {
      await eventSource.emit(event_types.MESSAGE_SENT, i);
    } else {
      await eventSource.emit(event_types.MESSAGE_RECEIVED, i);
    }
  }
}
// Pre-diff length of the previous snapshot (set by drivePump), used to tell a NEW
// tail message from a CHANGED existing one.
let origPrevLen = 0;

// Wrap pump to snapshot the pre-diff length (for new-vs-changed classification).
async function drivePump(initial = false) {
  origPrevLen = prevSig ? prevSig.length : 0;
  await pump(initial);
}

let seenChat = "";
// ── Marinara Scene bypass (opt-in: settings.nukeScene) ───────────────────────
// Marinara "Scene" chats inject a hardcoded prompt scaffold (a <role> block, a long
// <output_format>/guidelines rubric, and an LLM-authored POV/tense/scene_instructions
// block) and are CREATED with promptPresetId:null — so the user's own prompt preset is
// never loaded inside a scene. Verified in ME source: that scaffold is injected only when
// chatMeta.sceneStatus==="active" (generate.routes.ts → injectSceneContextMessages), and
// the preset chain has NO global fallback (prompt-preset-selection.ts). So to make the
// user's preset authoritative we (1) flip sceneStatus to "concluded" — the same value ME
// uses when a scene ends, which turns the scaffold off — and (2) copy the ORIGIN chat's
// preset onto the scene. Fully reversible: we stash the originals + a marker, and restore
// them if the setting is turned back off. All via the public chat API (never core edits).
function parseMeta(m) {
  if (!m) return {};
  if (typeof m === "object") return m;
  try { return JSON.parse(m) || {}; } catch { return {}; }
}
let sceneSyncBusy = "";
async function maybeSyncScene(chatId) {
  const s = extension_settings[MODULE_NAME] || {};
  if (!chatId || sceneSyncBusy === chatId) return;
  sceneSyncBusy = chatId;
  try {
    let chat;
    try { chat = await marinara.apiFetch(`/chats/${chatId}`); } catch { return; }
    if (!chat || !chat.id) return;
    const meta = parseMeta(chat.metadata);
    if (s.nukeScene) {
      if (meta.sceneStatus === "active" && !meta.beholderSceneNuked) {
        let originPreset = null;
        if (meta.sceneOriginChatId) {
          try { const o = await marinara.apiFetch(`/chats/${meta.sceneOriginChatId}`); originPreset = (o && o.promptPresetId) || null; } catch {}
        }
        await marinara.apiFetch(`/chats/${chatId}/metadata`, { method: "PATCH", body: JSON.stringify({
          sceneStatus: "concluded",              // turns off the hardcoded scene scaffold
          beholderSceneNuked: true,
          beholderPrevSceneStatus: meta.sceneStatus,
          beholderPrevPresetId: chat.promptPresetId ?? null,
        }) });
        if (originPreset) {
          await marinara.apiFetch(`/chats/${chatId}`, { method: "PATCH", body: JSON.stringify({ promptPresetId: originPreset }) });
        }
        banner(originPreset ? "Beholder: Scene scaffold off — using your preset" : "Beholder: Scene scaffold off (no origin preset found)");
      }
    } else if (meta.beholderSceneNuked) {
      // Setting turned off → restore a scene we previously converted.
      await marinara.apiFetch(`/chats/${chatId}/metadata`, { method: "PATCH", body: JSON.stringify({
        sceneStatus: meta.beholderPrevSceneStatus || "active",
        beholderSceneNuked: false,
      }) });
      await marinara.apiFetch(`/chats/${chatId}`, { method: "PATCH", body: JSON.stringify({ promptPresetId: meta.beholderPrevPresetId ?? null }) });
      banner("Beholder: Scene scaffold restored");
    }
  } finally {
    sceneSyncBusy = "";
  }
}

async function onChatMaybeChanged() {
  const id = activeChatId();
  if (id === seenChat) return;
  seenChat = id;
  lbReady = null;   // re-discover the lorebook/entry for the new chat on next injection
  lbChatId = "";
  loadChatMeta(id);
  prevSig = null;
  void maybeSyncScene(id); // opt-in Scene→preset conversion — fire early + independently, so a
                           // failure in the pump below can't skip it (no-op unless enabled + active scene)
  await refreshChars();
  await drivePump(true); // prime the new chat (no emit)
  await eventSource.emit(event_types.CHAT_CHANGED);
  applyModeVisibility();
  mountExtractorButton();
  mountHudToggle();
}

// Boot the driver. Delayed initial pass so index.js's boot finishes registering its
// eventSource.on handlers before we emit the first CHAT_CHANGED.
// ── Roleplay-only visibility + docked side-tab ──────────────────────────────
function applyModeVisibility() {
  const rp = currentMode === "roleplay";
  const panel = document.getElementById("beholder_panel");
  if (panel && !rp) panel.classList.add("bh-collapsed"); // keep off-screen outside roleplay
  if (!rp) {
    document.body.classList.remove("bh-dock-open");
    document.querySelector(".beholder-notebox")?.remove(); // note box is roleplay-only
  } else {
    window.__beholderMountNoteBox?.();
  }
  document.querySelectorAll(".bh-hud-toggle").forEach((b) => (b.style.display = rp ? "" : "none"));
}

let dockInit = false;
function ensureDockInit() {
  const panel = document.getElementById("beholder_panel");
  if (panel && !dockInit) {
    panel.classList.add("bh-collapsed"); // start closed; slides in on toggle
    document.body.classList.remove("bh-dock-open");
    dockInit = true;
  }
}
function toggleDock() {
  if (currentMode !== "roleplay") return;
  const panel = document.getElementById("beholder_panel");
  if (!panel) return;
  panel.classList.toggle("bh-collapsed");
  // Sync ME's native chat reflow to the dock's open state.
  document.body.classList.toggle("bh-dock-open", !panel.classList.contains("bh-collapsed"));
  syncDockOffset();
}
function closeDock() {
  const panel = document.getElementById("beholder_panel");
  if (panel) panel.classList.add("bh-collapsed");
  document.body.classList.remove("bh-dock-open");
}
// ME's own right-side panels (tracker, etc.) are flex siblings that SHRINK `.mari-main`,
// but Beholder is viewport-fixed at right:0 — so when one opens it would overlap that panel
// AND leave an empty gap (the chat over-compresses). Keep Beholder flush with main's right
// edge: right = (total width of whatever ME docked on the right) = innerWidth - main.right.
function syncDockOffset() {
  const panel = document.getElementById("beholder_panel");
  const main = document.querySelector(".mari-main");
  if (!panel || !main) return;
  const off = Math.max(0, Math.round(window.innerWidth - main.getBoundingClientRect().right));
  panel.style.setProperty("--bh-dock-right", off + "px");
  // Top: start the panel right below the app TOP BAR (against it). Its right-side nav stays
  // reachable above the panel, and the chat toolbar row reflows to the LEFT of the panel
  // (--tracker-chat-avoid-right), so it isn't covered either — no need to drop lower.
  const topbar = document.querySelector("header.mari-topbar");
  const top = topbar ? Math.round(topbar.getBoundingClientRect().bottom) : 0;
  panel.style.setProperty("--bh-dock-top", top + "px");
}
// Apply the optional Beholder "Display" tweaks (roleplay-avatar fade + portrait width) by
// toggling body classes/vars that HOST_CSS keys off.
function applyDisplayTweaks() {
  if (typeof document === "undefined") return;
  const s = extension_settings[MODULE_NAME] || {};
  document.body.classList.toggle("bh-no-avatar-fade", !!s.noAvatarFade);
  document.body.classList.toggle("bh-full-portrait", !!s.fullPortrait);
  document.body.classList.toggle("bh-wide-chat", !!s.wideChat);
  document.body.classList.toggle("bh-quote-color", !!s.quoteColor);
  const sz = (s.portraitScale || "").trim();
  document.body.classList.toggle("bh-big-portraits", !!sz);
  if (sz) document.body.style.setProperty("--bh-portrait-scale", sz);
  else document.body.style.removeProperty("--bh-portrait-scale");
}
// A close (✕) button at the top-left of the panel header — collapses the dock.
// Injected + re-injected by the same observer that mounts the other chrome.
function mountPanelClose() {
  const header = document.querySelector("#beholder_panel .beholder-panel-header");
  if (!header || header.querySelector(".bh-dock-close")) return;
  const btn = document.createElement("span");
  btn.className = "bh-dock-close fa-solid fa-xmark";
  btn.setAttribute("role", "button");
  btn.setAttribute("tabindex", "0");
  btn.title = "Close Beholder";
  header.insertBefore(btn, header.firstChild);
  btn.addEventListener("mousedown", (e) => e.stopPropagation()); // don't start a header drag
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeDock();
  });
}
// Inject the Beholder toggle into ME's roleplay HUD next to the tracker-panel
// toggle (`[data-tracker-panel-toggle]` — a stable anchor). Idempotent; the body
// observer re-runs it after React re-renders.
function mountHudToggle() {
  if (currentMode !== "roleplay") return;
  // Mount the Beholder logo button in ME's chat toolbar (the "chat settings" row:
  // Chat Summary / Active Context / Author's Notes / Gallery). Clone a live toolbar
  // button's classes so ours is pixel-identical to the native controls.
  const sibling = document.querySelector(".marinara-chat-toolbar-button");
  if (!sibling) return;
  if (document.querySelector(".bh-hud-toggle")) return; // idempotent; observer re-runs
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = sibling.className + " bh-hud-toggle";
  btn.title = "Beholder — physical state";
  btn.setAttribute("aria-label", "Beholder");
  btn.innerHTML = `<img src="${BH_LOGO}" alt="" style="width:18px;height:18px;border-radius:50%;display:block">`;
  // sibling may be wrapped in a single-child popover div; insert after that wrapper so
  // we land in the toolbar row alongside the other buttons.
  const wrapper = sibling.parentElement && sibling.parentElement.children.length === 1 ? sibling.parentElement : sibling;
  wrapper.after(btn);
  btn.addEventListener("click", toggleDock);
}
// Mobile uses the doll's compact list layout; desktop restores the user's choice.
function applyMobileLayout() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  try {
    setDollLayout(mobile ? "list" : extension_settings[MODULE_NAME]?.layout || "paired");
  } catch {}
}

// ── Extractor picker: ME-native "where does extraction run" ─────────────────
const GGUF_URL = "https://huggingface.co/GetBeholder/Beholder-GGUF";
function escapeHtmlLite(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}
function setEndpoint(url) {
  // "Local endpoint" = the TRAINED Beholder model → 5-pass SHORT prompts (systemPrompt empty).
  const s = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
  s.endpoint = (url || "").trim();
  if (s.endpoint) { delete s.meConnectionId; delete s.meConnName; }
  if (s.systemPrompt === GENERAL_PROMPT) { s.systemPrompt = ""; delete s.systemPromptTag; } // drop the auto mono prompt for the trained model
  saveSettingsDebounced();
}
function useConnection(id, name, keyless, baseUrl) {
  // A Marinara connection = a GENERAL model → single mono call with the bundled 4k LONG prompt.
  const s = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
  s.systemPrompt = GENERAL_PROMPT;
  s.systemPromptTag = "general-4k"; // the bundled mono prompt — Doctor surfaces this tag
  if (keyless && baseUrl) {
    s.endpoint = baseUrl; // reachable directly — no proxy needed
    delete s.meConnectionId;
    delete s.meConnName;
  } else {
    s.meConnectionId = id; // keyed → route through ME's server proxy (key stays server-side)
    s.meConnName = name || id;
    s.endpoint = "";
  }
  saveSettingsDebounced();
}
function clearExtractor() {
  const s = extension_settings[MODULE_NAME] || {};
  s.endpoint = "";
  delete s.meConnectionId;
  delete s.meConnName;
  if (s.systemPrompt === GENERAL_PROMPT) { s.systemPrompt = ""; delete s.systemPromptTag; }
  saveSettingsDebounced();
}
// Transport for a KEYED Marinara connection: routes the completion through ME's server
// (POST /api/agents/suite/rewrite) so the connection's stored key is injected server-side
// and never reaches the extension. index.js's getActiveTransport() returns this when a
// meConnectionId is set. Keyless/local connections use a direct endpoint instead.
function makeMeConnTransport(connId) {
  return {
    async chatCompletion({ system, user, signal }) {
      const data = await marinara.apiFetch("/agents/suite/rewrite", {
        method: "POST",
        body: JSON.stringify({
          connectionId: connId,
          instruction: String(system || "Extract the physical state.").slice(0, 3990),
          selectedText: String(user || "").slice(0, 49990),
          agentName: "Beholder",
        }),
        signal,
      });
      return (data && data.rewrittenText ? String(data.rewrittenText) : "").trim();
    },
    status() {
      return { state: "ready", backend: "me-connection" };
    },
  };
}
if (typeof window !== "undefined") window.__bhMakeMeTransport = (id) => makeMeConnTransport(id);
async function createBeholderConnection(url) {
  // Best-effort: extraction is driven by settings.endpoint; the connection is just
  // so it shows up in ME's connection list too.
  try {
    await marinara.apiFetch("/connections", {
      method: "POST",
      body: JSON.stringify({ name: "Beholder Extractor", provider: "custom", baseUrl: url, model: "ChatML" }),
    });
  } catch {
    /* ignore — endpoint still set */
  }
}
function banner(msg) {
  const t = marinara.addElement(document.body, "div", { textContent: msg });
  if (!t) return;
  t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9300;background:var(--card,#141414);color:var(--foreground,#eee);border:1px solid var(--border,#d4adfc33);border-radius:8px;padding:8px 14px;font-size:13px";
  marinara.setTimeout(() => t.remove(), 2600);
}
let connCache = null; // Marinara connections, prefetched at startup so the dropdown never flashes empty
// Redesigned Settings → CONNECTION UI: an always-visible chooser with a status/warning
// line, a Local-endpoint field (recommended), and a Marinara-connection picker (keyed
// connections route through ME's proxy). Replaces ST's collapsed "Advanced: custom
// endpoint" + in-browser cards, which read as cryptic in ME.
function renderConnStatus(el) {
  if (!el) return;
  const s = extension_settings[MODULE_NAME] || {};
  const ep = (s.endpoint || "").trim();
  const general = s.systemPrompt === GENERAL_PROMPT;
  if (s.meConnectionId) {
    el.className = "bh-conn2-status ok";
    el.innerHTML = `<b>✓ Extractor set</b> — Marinara connection <code>${escapeHtmlLite(s.meConnName || s.meConnectionId)}</code> · via Marinara · general model`;
  } else if (ep) {
    el.className = "bh-conn2-status ok";
    el.innerHTML = general
      ? `<b>✓ Extractor set</b> — general model at <code>${escapeHtmlLite(ep)}</code>`
      : `<b>✓ Extractor set</b> — Beholder model at <code>${escapeHtmlLite(ep)}</code>`;
  } else {
    el.className = "bh-conn2-status warn";
    el.innerHTML = `<b>⚠ No extractor configured.</b> Beholder can't track state yet — choose one below.`;
  }
}
async function injectConnCardIntoSettings() {
  const view = document.querySelector('#beholder_panel .bh-view[data-view="settings"]');
  if (!view || view.querySelector("#bh-conn2")) return;
  const epInput = view.querySelector("#bhp-endpoint");
  const section = (epInput && epInput.closest(".bh-vsection")) || view.querySelector(".bh-vsection");
  if (!section) return;
  const body = section.querySelector(".bh-vsection-body") || section;
  // Hide ST's bundled "Advanced: custom endpoint" details — replaced by our clean field.
  const advanced = epInput && epInput.closest("details");
  if (advanced) advanced.style.setProperty("display", "none", "important");

  const s = extension_settings[MODULE_NAME] || {};
  const card = document.createElement("div");
  card.id = "bh-conn2";
  card.className = "bh-conn2";
  card.innerHTML = `
    <div class="bh-conn2-status"></div>
    <div class="bh-conn2-opt">
      <div class="bh-conn2-h"><span class="bh-conn2-t">Local endpoint</span><span class="bh-conn2-rec">recommended</span></div>
      <div class="bh-conn2-hint">Run the Beholder model in llama.cpp / KoboldCpp / LM Studio and paste its URL. <a href="${GGUF_URL}" target="_blank" rel="noopener">Get the model ↗</a></div>
      <div class="bh-conn2-row"><input id="bh-conn2-url" type="text" placeholder="http://127.0.0.1:8080/v1" value="${escapeHtmlLite(s.endpoint || "")}"><button class="bh-btn" id="bh-conn2-url-use">Use</button></div>
    </div>
    <div class="bh-conn2-opt">
      <div class="bh-conn2-h"><span class="bh-conn2-t">A Marinara connection</span><span class="bh-conn-tag bh-conn-tag-warn">unsupported</span></div>
      <div class="bh-conn2-hint">Uses a connection from Marinara's Connections panel — keyed ones run <b>through Marinara</b>, so your key never leaves it. Note: this uses a general model, not the trained Beholder model, so accuracy varies (GPT-5.5+ suggested).</div>
      <div class="bh-conn2-row"><select id="bh-conn2-sel"><option value="">Loading…</option></select><button class="bh-btn" id="bh-conn2-conn-use">Use</button></div>
    </div>`;
  body.insertBefore(card, body.firstChild);
  const statusEl = card.querySelector(".bh-conn2-status");
  renderConnStatus(statusEl);

  // Beholder-added "Display" section — roleplay presentation tweaks.
  if (!view.querySelector("#bh-display-extra")) {
    const S = extension_settings[MODULE_NAME] || {};
    const psize = S.portraitScale || "";
    const chk = (k) => (S[k] ? " checked" : "");
    const disp = document.createElement("details");
    disp.className = "bh-vsection";
    disp.id = "bh-display-extra";
    disp.open = true;
    disp.innerHTML = `
      <summary><i class="fa-solid fa-eye"></i> Display</summary>
      <div class="bh-vsection-body">
        <label class="bh-check">
          <input type="checkbox" id="bh-nofade"${chk("noAvatarFade")}>
          <span>Remove avatar fade
            <small>Strips Marinara's soft fade at the bottom of roleplay portraits so a full-body avatar shows crisp to the feet.</small></span>
        </label>
        <label class="bh-check" style="margin-top:8px">
          <input type="checkbox" id="bh-fullportrait"${chk("fullPortrait")}>
          <span>Show full portrait
            <small>Always shows the whole avatar (no top-crop). If a message is short the bubble just grows taller with empty space beneath the text.</small></span>
        </label>
        <label class="bh-check" style="margin-top:8px">
          <input type="checkbox" id="bh-widechat"${chk("wideChat")}>
          <span>Widescreen chat
            <small>Uses the full window width for messages instead of Marinara's narrow centered column — pairs with bigger portraits.</small></span>
        </label>
        <label class="bh-check" style="margin-top:8px">
          <input type="checkbox" id="bh-quotecolor"${chk("quoteColor")}>
          <span>Colour quoted text
            <small>Tints "dialogue" a mellow orange.</small></span>
        </label>
        <hr style="border:0;border-top:1px solid var(--border);margin:12px 0 10px;opacity:.55">
        <label class="bh-check">
          <input type="checkbox" id="bh-nukescene"${chk("nukeScene")}>
          <span>Bypass Marinara Scene scaffolding
            <small>Marinara "Scene" chats ignore your prompt preset and inject their own hardcoded rubric. When on, Beholder turns any Scene you open into a normal preset-driven chat — the scaffold is disabled and the preset from the chat the Scene was launched from is restored. Reversible: turn this off to put the Scene back.</small></span>
        </label>
        <div style="margin-top:12px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
            <span style="font-size:12px;font-weight:600">Portrait size <span id="bh-psize-val" style="opacity:.7;font-weight:400">${psize ? psize + "×" : "off"}</span></span>
            <button type="button" id="bh-psize-off" class="bh-linklike">reset</button>
          </div>
          <input type="range" id="bh-psize" min="1" max="6" step="0.25" value="${psize || "2.5"}" style="width:100%">
          <small style="display:block;opacity:.72;font-size:11px;margin-top:4px">Scales the whole portrait up proportionally (past Marinara's 2.5× cap) — bigger BOTH ways, so a tall avatar isn't cropped. "reset" hands size back to Marinara's own slider.</small>
        </div>
      </div>`;
    section.after(disp);
    const bind = (id, key) => disp.querySelector(id).addEventListener("change", function () {
      const st = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
      st[key] = this.checked;
      saveSettingsDebounced();
      applyDisplayTweaks();
    });
    bind("#bh-nofade", "noAvatarFade");
    bind("#bh-fullportrait", "fullPortrait");
    bind("#bh-widechat", "wideChat");
    bind("#bh-quotecolor", "quoteColor");
    // Scene bypass: a data operation (not a CSS tweak), so apply/restore the current chat now.
    disp.querySelector("#bh-nukescene").addEventListener("change", function () {
      const st = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
      st.nukeScene = this.checked;
      saveSettingsDebounced();
      void maybeSyncScene(activeChatId());
    });
    // Portrait-size slider: live (input) update + a "reset" that hands size back to ME's slider.
    const psizeInput = disp.querySelector("#bh-psize");
    const psizeVal = disp.querySelector("#bh-psize-val");
    psizeInput.addEventListener("input", function () {
      const st = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
      st.portraitScale = this.value;
      psizeVal.textContent = this.value + "×";
      saveSettingsDebounced();
      applyDisplayTweaks();
    });
    disp.querySelector("#bh-psize-off").addEventListener("click", function () {
      const st = (extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {});
      st.portraitScale = "";
      psizeVal.textContent = "off";
      psizeInput.value = "2.5";
      saveSettingsDebounced();
      applyDisplayTweaks();
    });
  }

  card.querySelector("#bh-conn2-url-use").addEventListener("click", () => {
    const url = card.querySelector("#bh-conn2-url").value.trim();
    if (!url) return;
    setEndpoint(url);
    renderConnStatus(statusEl);
    banner("Beholder extractor set to the local endpoint");
  });

  const sel = card.querySelector("#bh-conn2-sel");
  const truthy = (v) => v === true || v === "true";
  // Beholder extracts via chat/completions — only TEXT/LLM connections work. Image/video-gen
  // connections (a ComfyUI/imagegen entry) can't run an extraction, so keep them out of the
  // picker. LLM connections of any kind — including agent-model ones (defaultForAgents) — stay.
  const NON_TEXT = new Set(["image_generation", "video_generation"]);
  const isTextConn = (c) =>
    c && !NON_TEXT.has(c.provider) && !c.comfyuiWorkflow && !c.imageService && !c.imageEndpointId && !c.imageGenerationSource;
  const fillConns = (conns) => {
    const usable = (conns || []).filter(isTextConn);
    if (!usable.length) {
      sel.innerHTML = `<option value="">No text/LLM connections — add one in Marinara → Connections</option>`;
      return;
    }
    sel.innerHTML =
      `<option value="">Pick a connection…</option>` +
      usable
        .map((c) => {
          const keyless = !!c.baseUrl && (c.apiKeyEncrypted === "" || c.apiKeyEncrypted == null);
          const tags = [];
          if (truthy(c.isDefault)) tags.push("main");
          if (truthy(c.defaultForAgents)) tags.push("agent");
          const label = `${c.name}${tags.length ? " [" + tags.join(", ") + "]" : ""}${keyless ? "" : " · keyed"}`;
          return `<option value="${escapeHtmlLite(c.id)}" data-keyless="${keyless ? 1 : 0}" data-baseurl="${escapeHtmlLite(c.baseUrl || "")}" data-name="${escapeHtmlLite(c.name)}">${escapeHtmlLite(label)}</option>`;
        })
        .join("");
    if (s.meConnectionId) sel.value = s.meConnectionId;
  };
  if (connCache) {
    fillConns(connCache); // instant — prefetched at startup
  } else {
    try {
      const r = await marinara.apiFetch("/connections");
      connCache = Array.isArray(r) ? r : [];
    } catch {
      connCache = [];
    }
    fillConns(connCache);
  }

  card.querySelector("#bh-conn2-conn-use").addEventListener("click", () => {
    const opt = sel.selectedOptions && sel.selectedOptions[0];
    if (!opt || !opt.value) return;
    const keyless = opt.dataset.keyless === "1" && !!opt.dataset.baseurl;
    useConnection(opt.value, opt.dataset.name, keyless, opt.dataset.baseurl);
    banner(`Beholder extractor set to ${opt.dataset.name}${keyless ? " (direct)" : " (via Marinara)"}`);
    renderConnStatus(statusEl);
  });
}

// Rebrand ST wording that leaks into the reused views (the Doctor "SILLYTAVERN" vital,
// the "Match SillyTavern theme accent" toggle, etc.).
function rebrandStText() {
  const scope = document.getElementById("beholder_panel");
  if (!scope) return;
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
  const hits = [];
  let n;
  while ((n = walker.nextNode())) if (/SillyTavern/i.test(n.nodeValue)) hits.push(n);
  for (const t of hits) t.nodeValue = t.nodeValue.replace(/SILLYTAVERN/g, "MARINARA").replace(/SillyTavern/g, "Marinara");
  // also the "your ST theme's quote color" copy
  const w2 = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
  let m;
  while ((m = w2.nextNode())) if (/\bST theme\b/.test(m.nodeValue)) m.nodeValue = m.nodeValue.replace(/\bST theme\b/g, "Marinara theme");
}

function startDriver() {
  jQuery(() => {
    mountBaseline();
    setTimeout(async () => {
      seenChat = activeChatId();
      loadChatMeta(seenChat);
      void maybeSyncScene(seenChat); // the initial chat is primed here (not via onChatMaybeChanged, which
                                     // early-returns since seenChat is already set) — so sync it here too
      marinara.apiFetch("/connections").then((r) => { connCache = Array.isArray(r) ? r : []; }).catch(() => {}); // warm the connection dropdown
      await refreshChars();
      await drivePump(true);
      await eventSource.emit(event_types.CHAT_CHANGED);
      ensureDockInit();
      applyModeVisibility();
      rebrandStText();
      mountHudToggle();
      mountPanelClose();
      applyDisplayTweaks();
      marinara.on(window, "resize", applyMobileLayout);
      syncDockOffset();
      marinara.on(window, "resize", syncDockOffset);
      const _mainEl = document.querySelector(".mari-main");
      if (_mainEl && typeof ResizeObserver !== "undefined") {
        try { new ResizeObserver(syncDockOffset).observe(_mainEl); } catch {}
      }

      // Keep the toolbar Beholder button ALWAYS present. React re-renders the chat toolbar
      // (new message, mode/state change, …) and drops our injected button; the 1s body
      // observer re-adds it but leaves a visible gap. This dedicated keeper re-mounts it
      // within a frame of removal. Cheap + idempotent (the mount guard stops any loop).
      if (typeof MutationObserver !== "undefined") {
        let keeperPending = false;
        try {
          new MutationObserver(() => {
            if (keeperPending) return;
            keeperPending = true;
            requestAnimationFrame(() => {
              keeperPending = false;
              if (currentMode === "roleplay" && !document.querySelector(".bh-hud-toggle")) mountHudToggle();
            });
          }).observe(document.body, { childList: true, subtree: true });
        } catch {}
      }

      // Snappy: when a Beholder view opens (tool button), inject the conn card +
      // rebrand ST text right away instead of waiting on the observer's debounce.
      // Inject the moment a Beholder view opens. The tool buttons call e.stopPropagation()
      // (panel.js), so a bubble-phase listener never fires — listen in the CAPTURE phase.
      // The view is built a tick later, so retry briefly until it exists (idempotent; the
      // prefetched connCache then fills the dropdown instantly, no empty flash).
      document.body.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t && t.closest && t.closest('#beholder_panel .beholder-tool-btn[data-view]'))) return;
        let tries = 0;
        const tick = () => {
          void injectConnCardIntoSettings();
          rebrandStText();
          if (++tries < 16 && !document.querySelector("#bh-conn2")) marinara.setTimeout(tick, 20);
        };
        tick();
      }, true);

      // Turn finished → re-pump (emits MESSAGE_RECEIVED for the new AI message).
      marinara.on(window, "marinara:generation-complete", () => void drivePump());

      // Keep the newest message in view after generation. Bigger Beholder portraits make a
      // finished message taller than the height ME pinned the scroll to, so once the box
      // settles the message's tail drops below the fold — the chat "flinches up" and the user
      // has to scroll down. Re-pin to the bottom across a couple of settle frames, but ONLY
      // when the user was actually following the stream (near the bottom) — never yank someone
      // who scrolled up to read history. A resize doesn't fire 'scroll', so the last observed
      // position reflects intent before the box grew.
      let bhNearBottom = true;
      const bhScroller = () => document.querySelector(".mari-messages-scroll, .rpg-chat-messages-mobile");
      const bhIsScroller = (el) => !!(el && el.classList && (el.classList.contains("mari-messages-scroll") || el.classList.contains("rpg-chat-messages-mobile")));
      document.addEventListener("scroll", (e) => {
        const el = e.target;
        if (!bhIsScroller(el)) return;
        bhNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
      }, true);
      marinara.on(window, "marinara:generation-complete", () => {
        if (currentMode !== "roleplay" || !bhNearBottom) return;
        const pin = () => { const el = bhScroller(); if (el) el.scrollTop = el.scrollHeight; };
        requestAnimationFrame(() => requestAnimationFrame(pin));
        marinara.setTimeout(pin, 140);
        marinara.setTimeout(pin, 400);
      });
      // Catch edits / swipes / deletes that fire no event. Debounced.
      let moTimer = null;
      marinara.observe(
        document.body,
        () => {
          if (moTimer) return;
          moTimer = marinara.setTimeout(() => {
            moTimer = null;
            ensureDockInit();
            mountHudToggle();
            mountPanelClose();
            syncDockOffset();
            if (currentMode === "roleplay") window.__beholderMountNoteBox?.();
            void injectConnCardIntoSettings();
            rebrandStText();
            void drivePump();
          }, 1000);
        },
        { childList: true, subtree: true },
      );
      // Chat switch has no event — poll the active-chat id.
      marinara.setInterval(() => void onChatMaybeChanged(), 1200);
    }, 800);
  });
}
startDriver();
