// Beholder normalizer -- converts inbound RP prose into the canonical surface form
// the extractor was trained on.
//
// Canonical form: plain prose, dialogue inline in double-quotes with attribution; no asterisks,
// labeled-dialogue blocks, stage-direction brackets, BBCode, HTML, or markdown.

const TONE_ADVERB = {
    quiet: "quietly", dry: "drily", tired: "tiredly", cold: "coldly", soft: "softly",
    sharp: "sharply", flat: "flatly", grim: "grimly", warm: "warmly", calm: "calmly",
    firm: "firmly", gentle: "gently", harsh: "harshly", bitter: "bitterly", weary: "wearily",
    sad: "sadly", angry: "angrily", nervous: "nervously", cheerful: "cheerfully",
    breathless: "breathlessly", hoarse: "hoarsely", amused: "with amusement",
};

function toneToAdverb(tone) {
    return TONE_ADVERB[(tone || "").trim().toLowerCase()] || "";
}

function titleCase(s) {
    return (s || "").trim().toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

function decodeEntities(s) {
    return s
        .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// Build a natural dialogue attribution, fixing terminal punctuation:
//   "Better."  -> "Better," X said.      (period -> comma)
//   "Where?"   -> "Where?" X said.       (keep ? / !, no comma)
function attributeDialogue(speech, name, adverb) {
    speech = (speech || "").trim().replace(/^"+|"+$/g, "").trim();
    const said = `${name} said${adverb ? " " + adverb : ""}`;
    const last = speech.slice(-1);
    if (last === ".") return `"${speech.slice(0, -1)}," ${said}.`;
    if (last === "?" || last === "!") return `"${speech}" ${said}.`;
    return `"${speech}," ${said}.`;
}

/**
 * Normalize an RP message to canonical plain-prose form.
 * @param {string} message - Raw message text from SillyTavern
 * @param {string|null} personaName - User's persona display name (reserved for first->third conversion)
 * @returns {string} canonical normalized text
 */
export function normalize(message, personaName = null) {
    let text = message || "";

    // 1. Strip OOC notes:  (OOC: ...) / ((OOC: ...)) / [OOC: ...]
    text = text.replace(/[(\[]+\s*OOC:[^)\]]*[)\]]+/gi, "");

    // 2. Labeled-dialogue blocks (quoted):  Name (Tone): "speech"
    text = text.replace(
        /^([A-Z][A-Za-z'\- ]+?)\s*\(([^)]+)\):\s*"([^"]+)"\s*$/gm,
        (_m, name, tone, speech) => attributeDialogue(speech, name.trim(), toneToAdverb(tone)));

    // 3. Script-style ALLCAPS dialogue (unquoted):  NAME (Tone): speech
    text = text.replace(
        /^([A-Z][A-Z'\- ]+?)\s*\(([^)]+)\):\s*(.+?)\s*$/gm,
        (_m, name, tone, speech) => attributeDialogue(speech, titleCase(name), toneToAdverb(tone)));

    // 4. Whole-line stage-direction brackets:  [Tim sits.]  (before BBCode strip)
    text = text.replace(/^\s*\[([^\]]+)\]\s*$/gm, (_m, inner) => {
        let s = inner.trim();
        if (s && !/[.!?]$/.test(s)) s += ".";
        return s;
    });

    // 5. Strip BBCode tags ([b], [color=red], [/url], ...)
    text = text.replace(/\[\/?[a-z][a-z0-9=#:_,\- ]*\]/gi, "");

    // 6. Strip HTML + decode entities
    text = text.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, "");
    text = decodeEntities(text);

    // 7. Strip markdown emphasis + leading block markup
    text = text.replace(/\*\*([^*]+?)\*\*/g, "$1")
               .replace(/__([^_]+?)__/g, "$1")
               .replace(/~~([^~]+?)~~/g, "$1")
               .replace(/(?<![A-Za-z0-9])_([^_\n]+?)_(?![A-Za-z0-9])/g, "$1");
    text = text.replace(/```[a-zA-Z]*\n?/g, "")
               .replace(/^\s{0,3}#{1,6}\s+/gm, "")
               .replace(/^\s{0,3}>\s?/gm, "")
               .replace(/^\s{0,3}[-*+]\s+/gm, "");

    // 8. Unwrap asterisk-action blocks:  *Tim shifts.* -> Tim shifts.
    text = text.replace(/\*([^*]+?)\*/g, (_m, inner) => {
        let s = inner.trim();
        if (s && !/[.!?]$/.test(s)) s += ".";
        return s;
    });

    // 9. Normalize whitespace: join lines into flowing prose, collapse spaces, trim.
    text = text.replace(/[ \t]*\n[ \t]*/g, "\n")
               .replace(/\n{2,}/g, " ")
               .replace(/\n/g, " ")
               .replace(/[ \t]{2,}/g, " ")
               .trim();

    return text;
}

export default normalize;
