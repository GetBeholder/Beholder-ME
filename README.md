# Beholder — for Marinara Engine

[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](LICENSE)

A physical-state tracker for **Marinara Engine** roleplay — clothing (per body slot),
held items, wounds, and species — kept consistent and shown as a live paper-doll.

### → What it is and why: **[getbeholder.com](https://getbeholder.com)**

This README is just **install & setup**. For what Beholder does and why, see the site.

This is the Marinara Engine port of **[Beholder-ST](https://github.com/GetBeholder/Beholder-ST)**.
The extraction engine, state model, validator, and paper-doll are the *same* code as the
SillyTavern extension; only the host wiring (`st-shim.js`) is Marinara-specific.

> **Preview.** Usable and actively developed; not yet 1.0.

---

## Requirements

- A recent **Marinara Engine**.
- A **Beholder extractor endpoint** — any OpenAI-compatible server
  (llama.cpp · KoboldCpp · vLLM · LM&nbsp;Studio · Ollama) running the extractor model.
  GGUF weights: **[GetBeholder/Beholder-GGUF](https://huggingface.co/GetBeholder/Beholder-GGUF)**.

> The in-browser (WebGPU) model from the SillyTavern build is **not** available in the
> Marinara build — Beholder-ME extracts through your own endpoint (or a Marinara
> connection, see below).

## Install

It's **one JavaScript file** — download it and import it. No build step, no npm.

1. Download **[`beholder.js`](beholder.js)** from this repo *(open the file → **Download raw**)*.
2. In Marinara, open **Settings → Extension Library → Import Extension File** and pick
   `beholder.js`.
3. Done. A **Beholder button** (the eye logo) appears in the **Roleplay** chat toolbar —
   click it to open the panel.

To update later, download the newer `beholder.js` and import it again.

## Setup

Open the Beholder panel → **⚙ Settings → Connection**:

1. Under **Local endpoint (recommended)**, paste your extractor's URL —
   e.g. `http://localhost:5077/v1` — and click **Use**. The status line turns to
   **✓ Extractor set**.
2. (Optional) open the **Doctor (🩺)** and hit **Test connection** to confirm it reaches
   your server and to see the served model.

That's it — from the next message, the paper-doll starts tracking state. To backfill an
existing chat, use the panel's **Build / Rebuild** menu.

> **⚡ Give the extractor its own endpoint.** Don't extract on the *same* single-slot
> server that runs your RP model — each extraction evicts your RP context from the KV
> cache, so the next reply re-prefills everything (slow on a big chat). Run the extractor
> as its own instance on its own port.

<details>
<summary><b>Alternative: a Marinara connection</b> (officially unsupported)</summary>

Instead of a local endpoint you can point Beholder at a connection from Marinara's
**Connections** panel (Settings → Connection → *A Marinara connection*). Keyed connections
route through Marinara's server so the API key never reaches the extension. Note this uses
a **general** model, not the trained Beholder model, so accuracy varies (GPT-5.5+ suggested).
A local endpoint running the real extractor is always preferred — and a set local endpoint
always wins over a connection.
</details>

## Configuration

Beholder Settings (**⚙**):

| Setting | Default | What it does |
|---|---|---|
| **Endpoint** | *(blank)* | OpenAI-compatible extractor URL. A set endpoint always wins over a Marinara connection. |
| **Model** | `ChatML` | Model name sent to the endpoint (most local servers ignore it and serve whatever's loaded). |
| **API key** | *(none)* | Optional bearer token for the endpoint. |
| **Inject state as** | In-chat | `In-chat at depth` (recommended) or `Don't inject` (track only). |
| **Injection depth** | `1` | Where the state block lands — `1` = one before the last message. |
| **Endpoint concurrency** | `1` | Max parallel extraction requests. Keep `1` for a single-slot local server; raise only for one that truly parallelises (vLLM / multi-slot). |
| **Validator** | On | Strip structurally-impossible state (e.g. an eyepatch worn on a hand) before it reaches the doll. |
| **Inferred colours** | On | Show colours the model inferred, not only ones stated verbatim. |

### Display (Marinara-only)

Beholder Settings → **Display** adds presentation tweaks for Marinara's roleplay UI:
remove the avatar fade, show the full portrait, widescreen chat, colour quoted dialogue,
a portrait-size slider, and **Bypass Marinara Scene scaffolding** (turn a Scene chat into a
normal preset-driven chat that honours your prompt preset).

## Develop

```bash
npm test            # run the verbatim-core parity suite
npm run build       # bundle the core + st-shim -> dist/beholder.js
npm run sync-core   # re-copy the host-agnostic core from a local Beholder-ST checkout
```

To iterate on a running instance: `npm run build`, then reload the tab.

## License

The **extension code** in this repository is licensed under **GNU AGPL-3.0-only**
(see [LICENSE](LICENSE)).

The **trained extractor model**, its adapters, datasets, validation rule set, and training
pipeline are **licensed separately** and are *not* part of this repository's AGPL grant.
They are not granted for commercial use without explicit permission.

---

**[getbeholder.com](https://getbeholder.com)** · ported from
**[Beholder-ST](https://github.com/GetBeholder/Beholder-ST)**
