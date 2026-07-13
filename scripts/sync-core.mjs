// Re-copy the verbatim host-agnostic Beholder core from a local Beholder-ST
// checkout. We REUSE these files unchanged (never fork them) — this script keeps
// them in sync when the upstream ST core changes (e.g. after a bug-fix handover).
//
// Usage: BEHOLDER_ST=/path/to/Beholder-ST node scripts/sync-core.mjs
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const src = process.env.BEHOLDER_ST || "../Beholder-ST";
if (!existsSync(src)) {
  console.error(`Beholder-ST source not found at ${src}. Set BEHOLDER_ST=/path/to/Beholder-ST`);
  process.exit(1);
}

// The host-agnostic core (engine/host.js explicitly targets any host incl. Marinara),
// PLUS panel.js/views.js/style.css (Beholder's own UI — no ST imports, only jQuery,
// driven by callbacks). NOT copied: index.js, settings.html (ST host wiring — replaced
// by marinara-adapter.js).
const FILES = [
  "engine",
  "test",
  "state.js",
  "validator.js",
  "validator_data.js",
  "normalizer.js",
  "short_pass_prompts.js",
  "paperdoll.js",
  "colors.js",
  "garment_data.js",
  "extractor.js",
  "panel.js",
  "views.js",
  "style.css",
  "LICENSE",
];

for (const f of FILES) {
  cpSync(join(src, f), join(process.cwd(), f), { recursive: true });
  console.log("synced", f);
}
console.log("core synced from", src);
