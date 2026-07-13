// Bundle the verbatim Beholder index.js + the ST-compat shim + the reused core into
// one import/export-free IIFE. Marinara's extension loader inlines the JS inside
// `function(marinara){ ... }` and runs it from a Blob module, so the output must
// contain no top-level import/export and no `import.meta`.
import { build } from "esbuild";
import { dirname, resolve } from "node:path";

// panel.js imports `./paperdoll.js?v=48` (an ST cache-buster) — strip the query.
const stripImportQuery = {
  name: "strip-import-query",
  setup(b) {
    b.onResolve({ filter: /\.js\?/ }, (args) => {
      if (args.kind === "entry-point") return null;
      const clean = args.path.replace(/\?.*$/, "");
      return { path: clean.startsWith(".") ? resolve(dirname(args.importer), clean) : clean };
    });
  },
};

// Shelve the in-browser WebLLM model: replace webllm-transport.js with a stub so its
// Web Worker + CDN dynamic import + `import.meta.url` never enter the bundle. The
// browser-model card then honestly reports "not available" and steers to an endpoint.
const shelveWebllm = {
  name: "shelve-webllm",
  setup(b) {
    b.onResolve({ filter: /webllm-transport\.js(\?.*)?$/ }, () => ({ path: "webllm-transport", namespace: "webllm-stub" }));
    b.onLoad({ filter: /.*/, namespace: "webllm-stub" }, () => ({
      contents: `export class WebLLMTransport {
        constructor() {}
        async ready() { throw new Error('In-browser model is shelved in the Marinara build — use a custom endpoint.'); }
        async load()  { throw new Error('In-browser model is shelved in the Marinara build — use a custom endpoint.'); }
        async chatCompletion() { throw new Error('In-browser model is shelved in the Marinara build.'); }
        status() { return { state: 'unconfigured', backend: 'webllm' }; }
        async unload() {}
        async hasInCache() { return false; }
      }`,
      loader: "js",
    }));
  },
};

// Fully shelve the browser model at the CONFIG level too, so index.js reports it as
// unavailable (no "update model" banner, no "can't run in browser" banner, no CSP
// attempt to load @mlc-ai/web-llm). The no-model banner then cleanly points at an endpoint.
const shelveModelConfig = {
  name: "shelve-model-config",
  setup(b) {
    b.onResolve({ filter: /model-config\.js(\?.*)?$/ }, () => ({ path: "model-config", namespace: "mc-stub" }));
    b.onLoad({ filter: /.*/, namespace: "mc-stub" }, () => ({
      contents: `export const MODEL_CONFIG = { modelVersion:null, modelId:null, modelUrl:null, modelLib:null, versionUrl:null, vramRequiredMB:null, approxDownloadMB:null };
export function isModelConfigured(){ return false; }
export function toModelRecord(){ throw new Error('In-browser model is shelved in the Marinara build.'); }`,
      loader: "js",
    }));
  },
};

await build({
  entryPoints: ["index.js"],
  bundle: true,
  format: "iife",
  target: "es2022",
  platform: "browser",
  outfile: "dist/beholder.js",
  legalComments: "none",
  loader: { ".css": "text", ".png": "dataurl" },
  plugins: [stripImportQuery, shelveWebllm, shelveModelConfig],
  logLevel: "info",
});

console.log("built dist/beholder.js");
