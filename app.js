/* Refresh Computers – Product Labels app v1.3. Built from src/labels-app.html.
   Loaded by the labels.html launcher page. Contains no secrets: the RepairShopr API key stays in the browser's localStorage. */
(function () {
  var st = document.createElement("style"); st.id = "rl-app-css"; st.textContent = "\n  @page { size: 3.5in 1.125in; margin: 0; }\n  :root { --ink:#111; --muted:#666; --line:#ddd; --accent:#0b62c4; --bad:#b3261e; }\n  * { box-sizing: border-box; }\n  body { margin:0; font: 15px/1.4 Arial, Helvetica, sans-serif; color:var(--ink); background:#f4f5f7; }\n  header { background:#16263d; color:#fff; padding:10px 18px; display:flex; align-items:center; gap:14px; }\n  header h1 { font-size:18px; margin:0; flex:1; }\n  header button { background:transparent; color:#fff; border:1px solid #fff6; }\n  main { max-width:1100px; margin:0 auto; padding:16px 18px 40px; }\n  .card { background:#fff; border:1px solid var(--line); border-radius:8px; padding:14px 16px; margin-bottom:14px; }\n  .card h2 { font-size:15px; margin:0 0 8px; }\n  button { font:inherit; padding:7px 14px; border-radius:6px; border:1px solid #bbb; background:#fff; cursor:pointer; }\n  button.primary { background:var(--accent); border-color:var(--accent); color:#fff; font-weight:bold; }\n  button.big { font-size:17px; padding:10px 22px; }\n  button:disabled { opacity:.5; cursor:default; }\n  input[type=text], input[type=password], input[type=number], select { font:inherit; padding:7px 9px; border:1px solid #bbb; border-radius:6px; }\n  .row { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }\n  #entry { flex:1; min-width:260px; font-size:17px; }\n  .hint { color:var(--muted); font-size:13px; }\n  #status { min-height:20px; margin-top:8px; font-size:14px; }\n  #status.err { color:var(--bad); font-weight:bold; }\n  table { border-collapse:collapse; width:100%; }\n  th, td { text-align:left; padding:6px 6px; border-bottom:1px solid var(--line); vertical-align:middle; font-size:14px; }\n  th { font-size:12px; text-transform:uppercase; color:var(--muted); }\n  td.num { white-space:nowrap; }\n  td input[type=number] { width:64px; }\n  .tag { display:inline-block; font-size:11px; padding:1px 6px; border-radius:9px; background:#eef; color:#334; margin-left:4px; }\n  .tag.serial { background:#e6f4ea; color:#145a2a; }\n  .tag.warn { background:#fdecea; color:var(--bad); }\n  #picklist .item { display:flex; gap:10px; align-items:center; padding:6px 4px; border-bottom:1px solid var(--line); cursor:pointer; }\n  #picklist .item:hover { background:#f0f6ff; }\n  #picklist .item .nm { flex:1; }\n  #picklist .item .up { width:150px; }\n  #picklist .item .pr, #picklist .item .qty { width:100px; text-align:right; white-space:nowrap; }\n  #picklist .item .qty.zero { color:var(--muted); }\n  #picklist .item.head { cursor:default; font-size:12px; text-transform:uppercase; color:var(--muted); font-weight:bold; }\n  #picklist .item.head:hover { background:transparent; }\n  #previews { display:flex; flex-wrap:wrap; gap:14px; }\n  #previews .pv { background:#fff; }\n  #previews .pv svg { width:5.25in; height:1.6875in; display:block; border:1px solid #999; box-shadow:0 1px 4px #0002; }\n  #previews .cap { font-size:12px; color:var(--muted); }\n  dialog { border:none; border-radius:10px; padding:20px 22px; max-width:560px; width:92vw; box-shadow:0 10px 40px #0005; }\n  dialog::backdrop { background:#0007; }\n  dialog h3 { margin:0 0 6px; font-size:18px; }\n  dialog .pname { font-weight:bold; margin-bottom:12px; }\n  .choice { display:flex; gap:12px; margin:14px 0 4px; }\n  .choice button { flex:1; padding:14px 10px; font-size:16px; }\n  #serialList { margin:8px 0; max-height:260px; overflow:auto; border:1px solid #ccc; border-radius:6px; padding:4px 0; }\n  #serialList label { display:flex; gap:8px; align-items:center; padding:4px 10px; font-family:Consolas,Menlo,monospace; font-size:15px; cursor:pointer; }\n  #serialList label:hover { background:#f2f6fc; }\n  #serialList label.on { background:#e6f4ea; }\n  #serialList label.used { color:#888; cursor:default; }\n  #serialList label.flash { outline:2px solid #1a7f37; }\n  #serialStatus.err { color:#b00020; font-weight:bold; }\n  #serialStatus.ok { color:#1a7f37; }\n  #kindInfo2.err { color:#b00020; font-weight:bold; }\n  button:disabled { opacity:.45; cursor:not-allowed; }\n  details summary { cursor:pointer; font-weight:bold; }\n  ol.steps li { margin-bottom:4px; }\n  #sheet { display:none; }\n\n  @media print {\n    html, body { margin:0 !important; padding:0 !important; background:#fff; }\n    body > *:not(#sheet) { display:none !important; }\n    #sheet { display:block !important; }\n    #sheet .page { width:3.5in; height:1.125in; overflow:hidden; break-after:page; page-break-after:always; margin:0; padding:0; }\n    #sheet .page:last-child { break-after:auto; page-break-after:auto; }\n    #sheet svg { width:3.5in; height:1.125in; display:block; }\n  }\n";
  document.head.appendChild(st);
  var boot = document.getElementById("rl-boot"); if (boot) boot.remove();
  var wrap = document.createElement("div"); wrap.innerHTML = "\n<header>\n  <h1>Refresh Computers – Product Labels <span style=\"font-weight:normal;font-size:13px;opacity:.8\">DYMO 30252 · <span id=\"appVer\"></span></span></h1>\n  <button id=\"btnSettings\" type=\"button\">Settings / API key</button>\n</header>\n<div id=\"bootNote\" style=\"display:none;background:#fff4ce;border-bottom:1px solid #e0c97a;padding:6px 18px;font-size:13px\"></div>\n\n<main>\n  <div id=\"notChrome\" class=\"card\" style=\"display:none;border-color:var(--bad);background:#fdecea\">\n    <b style=\"color:var(--bad)\">Please use Google Chrome.</b> This page is open in another browser, and labels may print at the wrong size.\n    Close this window and open labels with the <b>\"Print Labels\"</b> shortcut (or <b>Print Labels.bat</b>), which always opens Google Chrome.\n  </div>\n  <div class=\"card\">\n    <h2>1. Find products</h2>\n    <div class=\"row\">\n      <input id=\"entry\" type=\"text\" autocomplete=\"off\" autofocus\n             placeholder=\"Scan or type a UPC, RepairShopr product ID, or part of a product name\">\n      <select id=\"mode\" title=\"How to read what you typed\">\n        <option value=\"auto\">Auto</option>\n        <option value=\"upc\">UPC only</option>\n        <option value=\"id\">Product ID only</option>\n        <option value=\"search\">Name search</option>\n      </select>\n      <button id=\"btnFind\" class=\"primary\" type=\"button\">Find</button>\n    </div>\n    <div class=\"hint\">Press Enter after each one (a barcode scanner does this for you). Several UPCs/IDs at once: separate with spaces, commas or new lines.</div>\n    <div id=\"status\"></div>\n    <div id=\"pickwrap\" style=\"display:none;margin-top:10px\">\n      <div class=\"row\" style=\"justify-content:space-between\"><b id=\"pickTitle\">Pick a product</b>\n        <button id=\"btnPickClose\" type=\"button\">Close</button></div>\n      <div id=\"picklist\"></div>\n      <div style=\"margin-top:6px\"><button id=\"btnMore\" type=\"button\" style=\"display:none\">Show more results</button></div>\n    </div>\n  </div>\n\n  <div class=\"card\">\n    <h2>2. Labels to print</h2>\n    <table id=\"queue\"><thead><tr><th>Product</th><th>Barcode</th><th>Price</th><th>Copies</th><th></th></tr></thead><tbody></tbody></table>\n    <div id=\"emptyq\" class=\"hint\" style=\"padding:8px 0\">No labels yet. Find a product above.</div>\n    <div class=\"row\" style=\"margin-top:12px\">\n      <button id=\"btnPrint\" class=\"primary big\" type=\"button\" disabled>Print labels</button>\n      <span id=\"count\" class=\"hint\"></span>\n      <span style=\"flex:1\"></span>\n      <button id=\"btnClear\" type=\"button\">Clear list</button>\n    </div>\n  </div>\n\n  <div class=\"card\">\n    <h2>Preview <span class=\"hint\">(one of each label, shown larger than real size)</span></h2>\n    <div id=\"previews\"></div>\n  </div>\n\n  <div class=\"card\">\n    <details id=\"howto\">\n      <summary>Chrome print settings for the DYMO (check these the first time)</summary>\n      <ol class=\"steps\">\n        <li><b>Destination / Printer:</b> DYMO LabelWriter 450</li>\n        <li>Click <b>More settings</b>. <b>Paper size:</b> 30252 Address (1-1/8\" x 3-1/2\")</li>\n        <li><b>Layout:</b> Landscape (use Portrait only if the preview shows the label sideways)</li>\n        <li><b>Margins:</b> None</li>\n        <li><b>Scale:</b> Default (100). Do not use \"Fit to page\".</li>\n        <li><b>Headers and footers:</b> unchecked. Background graphics can stay off.</li>\n        <li>The print preview should show one label per page with nothing cut off. Chrome remembers these settings next time.</li>\n        <li>If the bars print grey or blurry: Windows Printers &gt; DYMO LabelWriter 450 &gt; Printing preferences &gt; Advanced &gt; Print Quality: <b>Barcodes and Graphics</b>.</li>\n      </ol>\n    </details>\n  </div>\n</main>\n\n<div id=\"sheet\"></div>\n\n<!-- Settings dialog -->\n<dialog id=\"dlgSettings\">\n  <h3>RepairShopr API key</h3>\n  <p class=\"hint\" style=\"margin-top:0\">Get a key from your manager. It is saved only in this browser on this computer, so you enter it once per computer.</p>\n  <div class=\"row\"><input id=\"keyInput\" type=\"password\" style=\"flex:1\" autocomplete=\"off\" placeholder=\"Paste the API key here\">\n    <button id=\"btnShowKey\" type=\"button\">Show</button></div>\n  <details style=\"margin-top:12px\"><summary class=\"hint\">Advanced</summary>\n    <div style=\"margin-top:6px\" class=\"hint\">RepairShopr API address</div>\n    <input id=\"baseInput\" type=\"text\" style=\"width:100%\" spellcheck=\"false\">\n  </details>\n  <div id=\"keyStatus\" style=\"min-height:20px;margin-top:10px\"></div>\n  <div class=\"row\" style=\"justify-content:flex-end;margin-top:8px\">\n    <button id=\"btnForget\" type=\"button\">Remove key from this computer</button>\n    <button id=\"btnKeyCancel\" type=\"button\">Cancel</button>\n    <button id=\"btnKeySave\" class=\"primary\" type=\"button\">Save</button>\n  </div>\n</dialog>\n\n<!-- Laptop / tablet: which label? -->\n<dialog id=\"dlgKind\">\n  <h3>Which label?</h3>\n  <div class=\"pname\" id=\"kindName\"></div>\n  <div class=\"hint\" id=\"kindInfo\"></div>\n  <div class=\"hint\" id=\"kindInfo2\"></div>\n  <div class=\"choice\">\n    <button id=\"btnKindSerial\" class=\"primary\" type=\"button\">In-Stock Label<br><small>(serial number)</small></button>\n    <button id=\"btnKindBasic\" type=\"button\">Basic Label<br><small>(product ID/UPC)</small></button>\n  </div>\n  <div class=\"row\" style=\"justify-content:flex-end\"><button id=\"btnKindSkip\" type=\"button\">Skip this product</button></div>\n</dialog>\n\n<!-- Serial entry -->\n<dialog id=\"dlgSerial\">\n  <h3>In-Stock Label – pick the serial number(s)</h3>\n  <div class=\"pname\" id=\"serialName\"></div>\n  <div class=\"hint\">Tick the units to label, or scan / type a serial and press Enter. Only serials that RepairShopr lists as <b>In Stock</b> for this product are accepted. One label per serial.</div>\n  <div class=\"row\"><input id=\"serialInput\" type=\"text\" style=\"flex:1\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"Scan or type serial, then Enter\">\n    <button id=\"btnSerialAdd\" type=\"button\">Select</button></div>\n  <div id=\"serialStatus\" class=\"hint\" style=\"min-height:18px\"></div>\n  <div class=\"row\" style=\"justify-content:space-between\"><span class=\"hint\" id=\"serialCount\"></span>\n    <span><button id=\"btnSerialAll\" type=\"button\">Select all</button> <button id=\"btnSerialNone\" type=\"button\">Clear</button></span></div>\n  <div id=\"serialList\"></div>\n  <div class=\"row\" style=\"justify-content:flex-end;margin-top:8px\">\n    <button id=\"btnSerialCancel\" type=\"button\">Cancel</button>\n    <button id=\"btnSerialDone\" class=\"primary\" type=\"button\">Done</button>\n  </div>\n</dialog>\n\n";
  while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  document.title = "Refresh Computers – Product Labels";
})();
(function () {
"use strict";
/* ======================= version ======================= */
const APP_VERSION = "1.3";               // bump this for every publish (build.js copies it into version.json)
/* ======================= settings ======================= */
const DEFAULT_BASE = "https://refreshcomputers.repairshopr.com/api/v1";
const LS_KEY = "refreshLabels.apiKey", LS_BASE = "refreshLabels.baseUrl";
const getKey = () => localStorage.getItem(LS_KEY) || "";
const getBase = () => (localStorage.getItem(LS_BASE) || DEFAULT_BASE).replace(/\/+$/, "");

/* ======================= label geometry (points; 72pt = 1in) — same as labels.py ======================= */
const W = 252, H = 81;                 // 3.5in x 1.125in
const M = 0.06 * 72;                   // 4.32pt margin
const MR = 0.25 * 72;                  // 18pt right margin (Dymo clips the right edge)
const DIVIDER_Y = 47.0;                // divider height from the bottom
const GAP = 5.0;                       // gap between name column and price column
const DOT = 72 / 300;                  // LabelWriter 450 = 300 dpi
const FAMILY = "Arial, Helvetica, Arimo, 'Liberation Sans', 'Nimbus Sans', sans-serif"; // Helvetica metrics

/* ======================= text measuring ======================= */
const mctx = document.createElement("canvas").getContext("2d");
mctx.fontKerning = "none";              // ReportLab/PDF metrics have no kerning; SVG text below also has it off
function textW(s, bold, size) {
  mctx.font = (bold ? "bold " : "") + "100px " + FAMILY;
  return mctx.measureText(s).width * size / 100;
}
function wrap(text, bold, size, width) {
  const lines = []; let cur = "";
  for (let word of text.split(/\s+/).filter(Boolean)) {
    while (textW(word, bold, size) > width) {            // very long token: hard break
      let cut = word.length;
      while (cut > 1 && textW(word.slice(0, cut), bold, size) > width) cut--;
      if (cur) { lines.push(cur); cur = ""; }
      lines.push(word.slice(0, cut)); word = word.slice(cut);
    }
    const trial = (cur + " " + word).trim();
    if (textW(trial, bold, size) <= width) cur = trial; else { lines.push(cur); cur = word; }
  }
  if (cur) lines.push(cur);
  return lines;
}
function ellipsize(text, bold, size, width) {
  if (textW(text, bold, size) <= width) return text;
  while (text && textW(text + "…", bold, size) > width) text = text.slice(0, -1);
  return text.trimEnd() + "…";
}
function fitName(name, width, height, descH) {
  const avail = height - descH;
  for (let s10 = 100; s10 >= 60; s10 -= 5) {
    const size = s10 / 10, lead = size * 1.08, lines = wrap(name, true, size, width);
    if (lines.length * lead <= avail + 1e-9) return { size, lead, lines };
  }
  const size = 6.0, lead = 6.48, maxl = Math.max(1, Math.floor(avail / lead));
  const lines = wrap(name, true, size, width).slice(0, maxl);
  lines[lines.length - 1] = ellipsize(lines[lines.length - 1] + " …", true, size, width);
  return { size, lead, lines };
}

/* ======================= helpers ======================= */
function num(v) { if (v === null || v === undefined || v === "") return null; const n = Number(v); return isFinite(n) ? n : null; }
function money(v) { const n = num(v); return n === null ? null : "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function clean(s) {
  let t = String(s || "").replace(/<[^>]+>/g, " ");
  if (/&[#a-z0-9]+;/i.test(t)) t = new DOMParser().parseFromString("<!doctype html><body>" + t.replace(/</g, "&lt;"), "text/html").body.textContent;
  return t.replace(/\s+/g, " ").trim();
}
function isLaptopOrTablet(p) {
  // Top-level RS category, e.g. "Laptop Computers;Dell" or "Tablets". ("Accessories;Laptop Bags" is NOT a laptop.)
  const cat = String(p.category_path || p.product_category || "");
  const top = cat.split(";")[0];
  return /\b(laptops?|tablets?|notebooks?)\b/i.test(top);
}
function stockQty(p) {
  // RS product JSON: "quantity" = on-hand count (integer). Missing/null/non-numeric -> blank ("—").
  const n = num(p && p.quantity);
  return n === null ? null : Math.round(n);
}

/* ======================= Code 128 (B and C, auto-switching, like ReportLab) ======================= */
const C128 = ["212222","222122","222221","121223","121322","131222","122213","122312","132212","221213",
"221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212",
"223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323",
"131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123",
"113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113",
"312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214",
"112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142",
"121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341",
"131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232",
"2331112"];
function c128Values(data) {
  const isD = i => i < data.length && data.charCodeAt(i) >= 48 && data.charCodeAt(i) <= 57;
  const runAt = i => { let j = i; while (isD(j)) j++; return j - i; };
  const r0 = runAt(0);
  let set = (r0 >= 4 || (r0 === 2 && data.length === 2)) ? "C" : "B";
  const vals = [set === "C" ? 105 : 104];
  let i = 0;
  while (i < data.length) {
    if (set === "C") {
      if (runAt(i) >= 2) { vals.push(parseInt(data.substr(i, 2), 10)); i += 2; continue; }
      vals.push(100); set = "B";                       // switch to Code B
    }
    const r = runAt(i);
    if (((r >= 4 && i + r === data.length) || r >= 6) && r % 2 === 0) { vals.push(99); set = "C"; continue; }
    const c = data.charCodeAt(i);
    if (c < 32 || c > 126) throw new Error("Barcode can only use normal letters, digits and symbols");
    vals.push(c - 32); i++;                            // odd digit runs: first digit in B, then switch
  }
  let sum = vals[0];
  for (let k = 1; k < vals.length; k++) sum += k * vals[k];
  vals.push(sum % 103, 106);
  return vals;
}
function c128Modules(data) {               // [[isBar, widthModules], ...]
  const out = [];
  for (const v of c128Values(data)) {
    const pat = C128[v];
    for (let k = 0; k < pat.length; k++) out.push([k % 2 === 0, +pat[k]]);
  }
  return out;
}

/* ======================= SVG label ======================= */
const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs, text) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (text !== undefined) e.textContent = text;
  return e;
}
function fy(y) { return +(H - y).toFixed(3); }    // labels.py y (from bottom) -> svg y (from top)
function drawLabel(p, code) {
  const svg = el("svg", { xmlns: NS, viewBox: `0 0 ${W} ${H}`, width: "3.5in", height: "1.125in",
    "font-family": FAMILY, "text-rendering": "geometricPrecision",
    style: "font-kerning:none;font-variant-ligatures:none" });
  const warn = [];
  const name = clean(p.name) || "(no name)", desc = clean(p.description);
  const retail = num(p.price_retail), whole = num(p.price_wholesale);
  const top = H - M, right = W - MR;
  const text = (x, y, s, size, bold, anchor) => svg.appendChild(el("text", { x: +x.toFixed(3), y: fy(y),
    "font-size": size, "font-weight": bold ? "bold" : "normal", "text-anchor": anchor || "start", fill: "#000" }, s));
  const line = (x1, y1, x2, y2, w) => svg.appendChild(el("line", { x1: +x1.toFixed(3), y1: fy(y1), x2: +x2.toFixed(3), y2: fy(y2),
    stroke: "#000", "stroke-width": w }));

  // prices (top-right)
  let priceW;
  if (retail !== null && whole !== null && whole > 0 && whole < retail) {
    const rT = money(retail), wT = money(whole), rBase = top - 8.0, wBase = rBase - 14.0;
    const rW = textW(rT, false, 10), wW = textW(wT, true, 14);
    text(right, rBase, rT, 10, false, "end");
    const sy = rBase + 10 * 0.33;
    line(right - rW - 0.5, sy, right + 0.5, sy, 0.9);
    text(right, wBase, wT, 14, true, "end");
    priceW = Math.max(rW, wW);
  } else {
    const t = money(retail) || money(whole) || "";
    text(right, top - 11.0, t, 14, true, "end");
    priceW = textW(t, true, 14);
  }

  // name + description (top-left)
  const colW = W - M - MR - priceW - GAP, headH = top - (DIVIDER_Y + 2.0);
  const descSize = 6.0, descLead = desc ? descSize * 1.15 : 0;
  const f = fitName(name, colW, headH, descLead);
  let y = top - f.size * 0.80;
  for (const ln of f.lines) { text(M, y, ln, f.size, true); y -= f.lead; }
  if (desc) {
    const lastBase = y + f.lead, dy = lastBase - f.size * 0.25 - 1.6 - descSize * 0.8;
    text(M, Math.max(dy, DIVIDER_Y + 2.0), ellipsize(desc, false, descSize, colW), descSize, false);
  }

  // divider
  line(M, DIVIDER_Y, W - MR, DIVIDER_Y, 0.6);

  // barcode + human-readable text
  if (code) {
    const txtSize = 6.0, txtBase = M + 4.5;                 // raised: Dymo clips the bottom edge
    const bcBottom = txtBase + txtSize * 0.8 + 1.8, bcH = DIVIDER_Y - 2.5 - bcBottom;
    const maxW = W - 2 * M - 8;
    const mods = c128Modules(code), total = mods.reduce((a, m) => a + m[1], 0);
    let bw = null;
    for (const dots of [4, 3, 2]) if (total * dots * DOT <= maxW) { bw = dots * DOT; break; }
    if (bw === null) { bw = maxW / total; warn.push("barcode is very long; bars are thinner than 2 printer dots and may not scan"); }
    const bcW = total * bw;
    let x = Math.round(((W - bcW) / 2) / DOT) * DOT;         // start on a whole printer dot
    const g = el("g", { fill: "#000", "shape-rendering": "crispEdges" });
    for (const [bar, n] of mods) {
      if (bar) g.appendChild(el("rect", { x: +x.toFixed(4), y: fy(bcBottom + bcH), width: +(n * bw).toFixed(4), height: +bcH.toFixed(3) }));
      x += n * bw;
    }
    svg.appendChild(g);
    text(W / 2, txtBase, code, txtSize, false, "middle");
  } else warn.push("no UPC in RepairShopr, so no barcode");
  return { svg, warn };
}

/* ======================= RepairShopr API (GET only) ======================= */
class RSError extends Error {}
async function rsGet(path, params) {
  const key = getKey();
  if (!key) { openSettings(); throw new RSError("Enter the RepairShopr API key first (Settings)."); }
  let url = getBase() + path;
  if (params) url += "?" + new URLSearchParams(params).toString();
  let res;
  try {
    res = await fetch(url, { method: "GET", headers: { "Authorization": "Bearer " + key, "Accept": "application/json" }, cache: "no-store" });
  } catch (e) { throw new RSError("Can't reach RepairShopr. Check the internet connection."); }
  if (res.status === 404) return null;
  if (res.status === 401 || res.status === 403) throw new RSError("RepairShopr rejected the API key (HTTP " + res.status + "). Open Settings and check the key.");
  if (res.status === 429) throw new RSError("RepairShopr says too many requests. Wait a few seconds and try again.");
  if (!res.ok) throw new RSError("RepairShopr error HTTP " + res.status);
  return res.json();
}
function asProduct(d) { if (!d || typeof d !== "object") return null; const p = d.product || d; return p && p.id ? p : null; }
const byId = async id => asProduct(await rsGet("/products/" + encodeURIComponent(id)));
async function search(q, page) {
  const d = await rsGet("/products", { query: q, page: page || 1 }) || {};
  return { products: d.products || [], meta: d.meta || {} };
}
async function byUpc(code) {
  const p = asProduct(await rsGet("/products/barcode", { barcode: code }));
  if (p) return p;
  const r = await search(code);                       // fallback: exact upc_code match from search
  return r.products.find(x => String(x.upc_code || "").trim() === code) || null;
}
async function lookup(token, mode) {
  let order;
  if (mode === "id") order = [byId];
  else if (mode === "upc") order = [byUpc];
  else if (/^\d+$/.test(token) && token.length >= 7) order = [byId, byUpc];   // RS ids are 8 digits here
  else order = [byUpc].concat(/^\d+$/.test(token) ? [byId] : []);          // shop UPCs are short
  for (const fn of order) { const p = await fn(token); if (p) return p; }
  return null;
}

/* In-stock serials for one product: GET /products/{id}/product_serials?status=in_stock (100 per page) */
const normSerial = s => String(s == null ? "" : s).trim().toUpperCase();
async function inStockSerials(p) {
  const out = [], seen = new Set();
  for (let page = 1; page <= 100; page++) {
    let d;
    try { d = await rsGet("/products/" + encodeURIComponent(p.id) + "/product_serials", { status: "in_stock", page }); }
    catch (e) {
      if (/HTTP 40[13]/.test(e.message)) throw new RSError("RepairShopr would not show this product's serial numbers (" + (e.message.match(/HTTP \d+/) || [""])[0] + "). The API key needs the \"Products - List/Search\" permission.");
      throw e;
    }
    const rows = (d && d.product_serials) || [];
    for (const r of rows) {
      const sn = String(r.serial_number == null ? "" : r.serial_number).trim();
      const st = String(r.status || "").toLowerCase().replace(/[\s_-]+/g, " ").trim();
      if (!sn || st !== "in stock" || seen.has(normSerial(sn))) continue;
      seen.add(normSerial(sn)); out.push(sn);
    }
    const tp = d && d.meta && Number(d.meta.total_pages);
    if (!rows.length || !tp || page >= tp) break;
  }
  return out;
}

/* ======================= queue ======================= */
let queue = [];      // {p, code, kind:'basic'|'serial', copies, warn}
const $ = id => document.getElementById(id);
function status(msg, err) { const s = $("status"); s.textContent = msg || ""; s.className = err ? "err" : ""; }
function addRow(p, code, kind) {
  let warn = [];
  try { warn = drawLabel(p, code).warn; } catch (e) { status(e.message, true); return; }
  queue.push({ p, code, kind, copies: 1, warn });
  render();
}
function render() {
  const tb = $("queue").tBodies[0]; tb.textContent = "";
  const pv = $("previews"); pv.textContent = "";
  const sheet = $("sheet"); sheet.textContent = "";
  let total = 0;
  queue.forEach((q, i) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const nm = document.createElement("div"); nm.textContent = clean(q.p.name); td1.appendChild(nm);
    const sub = document.createElement("div"); sub.className = "hint"; sub.textContent = "ID " + q.p.id + (q.p.product_category ? " · " + q.p.product_category : ""); td1.appendChild(sub);
    const td2 = document.createElement("td");
    td2.textContent = q.code || "—";
    const tg = document.createElement("span"); tg.className = "tag" + (q.kind === "serial" ? " serial" : "");
    tg.textContent = q.kind === "serial" ? "In-Stock Label (serial number)" : "Basic Label (product ID/UPC)"; td2.appendChild(tg);
    for (const w of q.warn) { const t = document.createElement("span"); t.className = "tag warn"; t.textContent = "⚠ " + w; td2.appendChild(t); }
    const td3 = document.createElement("td"); td3.className = "num";
    td3.textContent = [money(q.p.price_retail), money(q.p.price_wholesale)].filter(Boolean).join(" / ");
    const td4 = document.createElement("td");
    const ci = document.createElement("input"); ci.type = "number"; ci.min = 1; ci.max = 200; ci.value = q.copies;
    ci.addEventListener("change", () => { q.copies = Math.max(1, Math.min(200, parseInt(ci.value, 10) || 1)); render(); });
    td4.appendChild(ci);
    const td5 = document.createElement("td"); td5.style.whiteSpace = "nowrap";
    if (q.kind === "basic" && (q.p.serialized || isLaptopOrTablet(q.p))) {
      const sb = document.createElement("button"); sb.type = "button"; sb.textContent = "+ Serial";
      sb.title = "Add an In-Stock Label with a serial number for this product";
      sb.addEventListener("click", async () => {
        sb.disabled = true; status("Getting in-stock serial numbers for " + clean(q.p.name) + "…");
        let list;
        try { list = await inStockSerials(q.p); } catch (e) { sb.disabled = false; status(e.message, true); return; }
        sb.disabled = false;
        if (!list.length) { status("RepairShopr has no in-stock serial numbers for " + clean(q.p.name) + ". Only the Basic Label (product ID/UPC) can be printed.", true); return; }
        status("");
        const s = await askSerials(q.p, list);
        s.forEach(x => addRow(q.p, x, "serial"));
        if (s.length) status("Added " + s.length + " In-Stock Label" + (s.length > 1 ? "s" : "") + ": " + clean(q.p.name));
      });
      td5.appendChild(sb);
    }
    const rb = document.createElement("button"); rb.type = "button"; rb.textContent = "Remove";
    rb.addEventListener("click", () => { queue.splice(i, 1); render(); });
    td5.appendChild(rb);
    tr.append(td1, td2, td3, td4, td5); tb.appendChild(tr);

    const box = document.createElement("div"); box.className = "pv";
    box.appendChild(drawLabel(q.p, q.code).svg);
    const cap = document.createElement("div"); cap.className = "cap"; cap.textContent = "× " + q.copies + "  ·  " + (q.code || "no barcode");
    box.appendChild(cap); pv.appendChild(box);
    for (let c = 0; c < q.copies; c++) {
      const pg = document.createElement("div"); pg.className = "page";
      pg.appendChild(drawLabel(q.p, q.code).svg); sheet.appendChild(pg); total++;
    }
  });
  $("emptyq").style.display = queue.length ? "none" : "";
  $("btnPrint").disabled = total === 0;
  $("count").textContent = total ? total + " label" + (total > 1 ? "s" : "") + " will print" : "";
}

/* ======================= dialogs ======================= */
function askKind(p, serials, serialErr) {
  return new Promise(resolve => {
    const d = $("dlgKind");
    $("kindName").textContent = clean(p.name);
    $("kindInfo").textContent = (p.product_category || "") + (p.upc_code ? " · UPC " + p.upc_code : "");
    const i2 = $("kindInfo2"), n = serials ? serials.length : 0;
    $("btnKindSerial").disabled = !n;
    if (serialErr) { i2.className = "err hint"; i2.textContent = serialErr + " Only the Basic Label (product ID/UPC) is available."; }
    else if (!n) { i2.className = "err hint"; i2.textContent = "No in-stock serial numbers in RepairShopr for this product, so only the Basic Label (product ID/UPC) is available."; }
    else { i2.className = "hint"; i2.textContent = n + " serial number" + (n > 1 ? "s" : "") + " in stock."; }
    const done = v => { d.onclose = null; d.close(); resolve(v); };
    $("btnKindSerial").onclick = () => done("serial");
    $("btnKindBasic").onclick = () => done("basic");
    $("btnKindSkip").onclick = () => done(null);
    d.onclose = () => resolve(null);
    d.showModal(); (n ? $("btnKindSerial") : $("btnKindBasic")).focus();
  });
}
function askSerials(p, available) {
  return new Promise(resolve => {
    const d = $("dlgSerial"), inp = $("serialInput"), list = $("serialList"), st = $("serialStatus");
    const queued = new Set(queue.filter(q => q.kind === "serial" && q.p.id === p.id).map(q => normSerial(q.code)));
    const boxes = new Map();          // normalized serial -> {cb, lab, sn}
    $("serialName").textContent = clean(p.name);
    list.textContent = ""; inp.value = "";
    const say = (msg, cls) => { st.textContent = msg || ""; st.className = "hint" + (cls ? " " + cls : ""); };
    const count = () => {
      const n = [...boxes.values()].filter(b => b.cb.checked).length;
      $("serialCount").textContent = n + " of " + available.length + " in-stock serial" + (available.length > 1 ? "s" : "") + " selected";
      $("btnSerialDone").textContent = n ? "Add " + n + " label" + (n > 1 ? "s" : "") : "Done";
    };
    for (const sn of available) {
      const lab = document.createElement("label"), cb = document.createElement("input");
      cb.type = "checkbox"; cb.value = sn;
      const used = queued.has(normSerial(sn));
      if (used) { cb.disabled = true; lab.className = "used"; }
      lab.append(cb, document.createTextNode(sn + (used ? "  (already in the print list)" : "")));
      cb.addEventListener("change", () => { lab.classList.toggle("on", cb.checked); count(); });
      list.appendChild(lab); boxes.set(normSerial(sn), { cb, lab, sn, used });
    }
    say(""); count();
    const select = () => {
      const raw = inp.value; inp.value = ""; inp.focus();
      const key = normSerial(raw);
      if (!key) return;
      const b = boxes.get(key);
      if (!b) { say("✗ \"" + raw.trim() + "\" is not an in-stock serial number for this product. Not added. Check the sticker, or pick from the list.", "err"); return; }
      if (b.used) { say(b.sn + " is already in the print list.", "err"); return; }
      if (b.cb.checked) { say(b.sn + " is already selected.", "ok"); }
      else { b.cb.checked = true; b.lab.classList.add("on"); say("✓ " + b.sn + " selected.", "ok"); count(); }
      b.lab.scrollIntoView({ block: "nearest" }); b.lab.classList.add("flash"); setTimeout(() => b.lab.classList.remove("flash"), 900);
    };
    const done = v => { d.onclose = null; inp.onkeydown = null; d.close(); resolve(v); };
    $("btnSerialAdd").onclick = select;
    $("btnSerialAll").onclick = () => { boxes.forEach(b => { if (!b.used) { b.cb.checked = true; b.lab.classList.add("on"); } }); count(); };
    $("btnSerialNone").onclick = () => { boxes.forEach(b => { b.cb.checked = false; b.lab.classList.remove("on"); }); count(); };
    $("btnSerialDone").onclick = () => {
      if (inp.value.trim()) { select(); if (st.className.includes("err")) return; }
      const picked = available.filter(sn => { const b = boxes.get(normSerial(sn)); return b && b.cb.checked && !b.used; });
      if (!picked.length) { say("Tick at least one serial number, or scan one (or Cancel).", "err"); return; }
      done(picked);
    };
    $("btnSerialCancel").onclick = () => done([]);
    inp.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); select(); } };
    d.onclose = () => resolve([]);
    d.showModal(); inp.focus();
  });
}
async function addProduct(p) {
  if (isLaptopOrTablet(p)) {
    let serials = [], serr = null;
    status("Getting in-stock serial numbers for " + clean(p.name) + "…");
    try { serials = await inStockSerials(p); } catch (e) { serr = e.message; }
    status("");
    const kind = await askKind(p, serials, serr);
    if (kind === "serial") {
      const s = await askSerials(p, serials);
      if (!s.length) { status("No serial selected – nothing added for " + clean(p.name)); return; }
      s.forEach(x => addRow(p, x, "serial"));
      status("Added " + s.length + " In-Stock Label" + (s.length > 1 ? "s" : "") + ": " + clean(p.name));
      return;
    }
    if (kind !== "basic") { status("Skipped " + clean(p.name)); return; }
  }
  const code = String(p.upc_code || p.product_code || "").trim();
  addRow(p, code, "basic");
  status("Added: " + clean(p.name) + (code ? "" : "  (no UPC in RepairShopr – label has no barcode)"), !code);
}

/* ======================= find / pick list ======================= */
let pickQuery = null, pickPage = 1, busy = false;
function showPick(q, res, append) {
  const list = $("picklist");
  if (!append) {
    list.textContent = "";
    const hd = document.createElement("div"); hd.className = "item head";
    for (const [cls, t] of [["nm", "Product"], ["up", "UPC"], ["pr", "Price"], ["qty", "Qty in Stock"]]) {
      const c = document.createElement("span"); c.className = cls; c.textContent = t; hd.appendChild(c);
    }
    list.appendChild(hd);
  }
  $("pickTitle").textContent = `Pick a product for "${q}" (${res.meta.total_entries ?? res.products.length} found)`;
  for (const p of res.products) {
    const it = document.createElement("div"); it.className = "item"; it.tabIndex = 0;
    const nm = document.createElement("span"); nm.className = "nm"; nm.textContent = clean(p.name);
    if (p.disabled) { const t = document.createElement("span"); t.className = "tag warn"; t.textContent = "disabled"; nm.appendChild(t); }
    const up = document.createElement("span"); up.className = "hint up"; up.textContent = "UPC " + (p.upc_code || "—");
    const pr = document.createElement("span"); pr.className = "num pr"; pr.textContent = money(p.price_wholesale) && num(p.price_wholesale) > 0 ? money(p.price_wholesale) : (money(p.price_retail) || "");
    const qn = stockQty(p);
    const qt = document.createElement("span"); qt.className = "qty" + (qn !== null && qn <= 0 ? " zero" : "");
    qt.textContent = qn === null ? "—" : String(qn); qt.title = "Qty in Stock (RepairShopr)";
    const go = async () => { await addProduct(p); $("entry").focus(); };
    it.addEventListener("click", go);
    it.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
    it.append(nm, up, pr, qt); list.appendChild(it);
  }
  $("btnMore").style.display = (res.meta.total_pages && pickPage < res.meta.total_pages) ? "" : "none";
  $("pickwrap").style.display = "";
}
async function doSearch(q) {
  pickQuery = q; pickPage = 1;
  const r = await search(q, 1);
  if (!r.products.length) { status(`Nothing found for "${q}".`, true); return; }
  if (r.products.length === 1) { $("pickwrap").style.display = "none"; await addProduct(r.products[0]); return; }
  showPick(q, r, false);
  status("Several products match – click the right one below.");
}
async function find() {
  if (busy) return;
  const raw = $("entry").value.trim(), mode = $("mode").value;
  if (!raw) return;
  busy = true; $("btnFind").disabled = true;
  try {
    if (mode === "search") { status("Searching…"); await doSearch(raw); $("entry").value = ""; return; }
    // several codes: split on new lines / commas; a line of only digits+spaces is split on spaces too
    let tokens = [];
    for (const part of raw.split(/[\n,;]+/)) {
      const t = part.trim(); if (!t) continue;
      if (/^[\d\s]+$/.test(t)) tokens.push(...t.split(/\s+/)); else tokens.push(t);
    }
    const missing = [];
    for (const t of tokens) {
      status("Looking up " + t + "…");
      const p = await lookup(t, mode);
      if (p) await addProduct(p);
      else missing.push(t);
    }
    $("entry").value = "";
    if (missing.length === 1 && tokens.length === 1 && mode === "auto") {
      status("Searching names for " + missing[0] + "…"); await doSearch(missing[0]);
    } else if (missing.length) status("Not found in RepairShopr: " + missing.join(", "), true);
  } catch (e) { status(e.message, true); }
  finally { busy = false; $("btnFind").disabled = false; $("entry").focus(); }
}
$("btnFind").addEventListener("click", find);
$("entry").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); find(); } });
$("btnMore").addEventListener("click", async () => {
  try { pickPage++; showPick(pickQuery, await search(pickQuery, pickPage), true); } catch (e) { status(e.message, true); }
});
$("btnPickClose").addEventListener("click", () => { $("pickwrap").style.display = "none"; });
$("btnClear").addEventListener("click", () => { if (!queue.length || confirm("Remove all labels from the list?")) { queue = []; render(); status(""); } });
$("btnPrint").addEventListener("click", () => {
  if (!localStorage.getItem("refreshLabels.howtoSeen")) { $("howto").open = true; localStorage.setItem("refreshLabels.howtoSeen", "1"); }
  window.print();
});

/* ======================= settings dialog ======================= */
function openSettings() {
  $("keyInput").value = getKey(); $("keyInput").type = "password"; $("btnShowKey").textContent = "Show";
  $("baseInput").value = getBase(); $("keyStatus").textContent = "";
  if (!$("dlgSettings").open) $("dlgSettings").showModal();
  $("keyInput").focus();
}
$("btnSettings").addEventListener("click", openSettings);
$("btnShowKey").addEventListener("click", () => { const k = $("keyInput"); const hide = k.type === "text"; k.type = hide ? "password" : "text"; $("btnShowKey").textContent = hide ? "Show" : "Hide"; });
$("btnKeyCancel").addEventListener("click", () => $("dlgSettings").close());
$("btnForget").addEventListener("click", () => { localStorage.removeItem(LS_KEY); $("keyInput").value = ""; $("keyStatus").textContent = "Key removed from this computer."; });
$("btnKeySave").addEventListener("click", async () => {
  const k = $("keyInput").value.trim(), b = $("baseInput").value.trim() || DEFAULT_BASE, st = $("keyStatus");
  if (!k) { st.textContent = "Paste the API key first."; return; }
  st.textContent = "Checking the key with RepairShopr…";
  try {
    const r = await fetch(b.replace(/\/+$/, "") + "/products/barcode?barcode=0", { headers: { Authorization: "Bearer " + k, Accept: "application/json" }, cache: "no-store" });
    if (r.status === 401 || r.status === 403) { st.textContent = "RepairShopr did not accept this key (HTTP " + r.status + ")."; return; }
    if (!r.ok && r.status !== 404) { st.textContent = "RepairShopr answered HTTP " + r.status + ". Check the key and address."; return; }
  } catch (e) { st.textContent = "Can't reach RepairShopr. Check the internet connection and the API address."; return; }
  localStorage.setItem(LS_KEY, k);
  if (b.replace(/\/+$/, "") === DEFAULT_BASE) localStorage.removeItem(LS_BASE); else localStorage.setItem(LS_BASE, b);
  $("dlgSettings").close(); status("API key saved on this computer. You're ready to print labels.");
  $("entry").focus();
});

/* ======================= Chrome check ======================= */
function isGoogleChrome() {
  const ua = navigator.userAgent;
  if (/Edg\/|EdgA\/|OPR\/|Brave|SamsungBrowser|Vivaldi|YaBrowser/.test(ua)) return false;
  const brands = (navigator.userAgentData && navigator.userAgentData.brands || []).map(b => b.brand);
  if (brands.length) return brands.some(b => b === "Google Chrome" || b === "HeadlessChrome");
  return /Chrome\/|CriOS\//.test(ua);
}
if (!isGoogleChrome()) $("notChrome").style.display = "";

/* ======================= version / where this copy came from ======================= */
(function showVersion() {
  const b = window.RL_BOOT || null;     // set by the labels.html launcher page; absent when this file is opened directly
  $("appVer").textContent = "v" + APP_VERSION;
  $("appVer").title = b ? ("App v" + APP_VERSION + " loaded from " + b.source + " · launcher v" + b.stub) : "App v" + APP_VERSION + " (source file)";
  if (b && b.notice) { $("bootNote").textContent = b.notice; $("bootNote").style.display = ""; }
  if (b && b.updatedFrom && b.updatedFrom !== APP_VERSION) status("Labels app updated to v" + APP_VERSION + ".");
})();

render();
if (!getKey()) openSettings(); else $("entry").focus();
})();
