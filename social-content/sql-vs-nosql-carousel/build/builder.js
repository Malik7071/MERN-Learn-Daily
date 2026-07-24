const fs = require("fs");
const path = require("path");

const OUT_DIR = __dirname;

/* ---------- Design tokens ---------- */
const NAVY = "#12294E";
const NAVY_DEEP = "#0B1B33";
const BLUE = "#2158D6";
const BLUE_TINT = "#EAF1FE";
const EMERALD = "#0E9F6E";
const EMERALD_DEEP = "#087A55";
const EMERALD_TINT = "#E7F8F1";
const INK = "#12203A";
const MUTED = "#5E6C86";
const PAPER = "#FCFDFF";
const LINE = "#E7ECF5";

/* ---------- Icon library (inline SVG, stroke based) ---------- */
const icon = (inner, extra = "") =>
  `<svg viewBox="0 0 24 24" fill="none" ${extra}>${inner}</svg>`;

const ICONS = {
  table: icon(
    `<rect x="3" y="4" width="18" height="16" rx="2.2" stroke="currentColor" stroke-width="1.7"/>
     <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.7"/>
     <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" stroke-width="1.7"/>
     <line x1="9.5" y1="4" x2="9.5" y2="20" stroke="currentColor" stroke-width="1.7"/>
     <line x1="15" y1="4" x2="15" y2="20" stroke="currentColor" stroke-width="1.7"/>`
  ),
  braces: icon(
    `<path d="M9 4.5c-2.1 0-2.6 1.1-2.6 3v2.4c0 1.4-.5 2.1-2.1 2.1 1.6 0 2.1.7 2.1 2.1V16.5c0 1.9.5 3 2.6 3"
       stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M15 4.5c2.1 0 2.6 1.1 2.6 3v2.4c0 1.4.5 2.1 2.1 2.1-1.6 0-2.1.7-2.1 2.1V16.5c0 1.9-.5 3-2.6 3"
       stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`
  ),
  check: icon(
    `<path d="M6 12.5l4 4 8-9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`
  ),
  scale: icon(
    `<line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
     <line x1="4.5" y1="6.5" x2="19.5" y2="6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
     <path d="M4.5 6.5l-3 6.2a3 3 0 006 0z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
     <path d="M19.5 6.5l-3 6.2a3 3 0 006 0z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
     <path d="M8.5 21h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`
  ),
  compass: icon(
    `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/>
     <circle cx="12" cy="12" r="3.4" stroke="currentColor" stroke-width="1.7"/>
     <circle cx="12" cy="12" r="0.9" fill="currentColor"/>`
  ),
  bookmark: icon(
    `<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8v-17z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>`
  ),
  message: icon(
    `<path d="M21 11.4a8.3 8.3 0 01-8.3 8.3H4.4l2.4-3.6A8.3 8.3 0 1121 11.4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>`
  ),
  userplus: icon(
    `<circle cx="9.3" cy="8.2" r="3.3" stroke="currentColor" stroke-width="1.7"/>
     <path d="M3.5 20c0-3.5 2.9-6.2 5.8-6.2s5.8 2.7 5.8 6.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
     <line x1="18.3" y1="6" x2="18.3" y2="12.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
     <line x1="15.1" y1="9.2" x2="21.5" y2="9.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`
  ),
  arrow: icon(
    `<line x1="4" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
     <path d="M13.5 6l5.5 6-5.5 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`
  ),
  db: icon(
    `<ellipse cx="12" cy="5.2" rx="8" ry="2.7" stroke="currentColor" stroke-width="1.7"/>
     <path d="M4 5.2v13.6c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7V5.2" stroke="currentColor" stroke-width="1.7"/>
     <path d="M4 12c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7" stroke="currentColor" stroke-width="1.7"/>`
  ),
  bulb: icon(
    `<path d="M9 18h6M10 21h4M8 14.5a5.5 5.5 0 118 0c-.8.9-1.3 1.6-1.3 2.5h-5.4c0-.9-.5-1.6-1.3-2.5z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`
  ),
  network: icon(
    `<circle cx="6" cy="6.5" r="2.4" stroke="currentColor" stroke-width="1.6"/>
     <circle cx="18" cy="6.5" r="2.4" stroke="currentColor" stroke-width="1.6"/>
     <circle cx="12" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6"/>
     <line x1="7.9" y1="7.9" x2="10.4" y2="16" stroke="currentColor" stroke-width="1.6"/>
     <line x1="16.1" y1="7.9" x2="13.6" y2="16" stroke="currentColor" stroke-width="1.6"/>
     <line x1="8.4" y1="6.5" x2="15.6" y2="6.5" stroke="currentColor" stroke-width="1.6"/>`
  ),
};

/* ---------- Shared CSS ---------- */
const BASE_CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1080px; height:1350px; }
  body { font-family:'Liberation Sans','Helvetica Neue',Arial,sans-serif; background:${PAPER}; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden; display:flex; flex-direction:column;
           padding:64px 72px 56px; color:${INK}; background:${PAPER}; }
  .icon { width:1em; height:1em; display:inline-block; vertical-align:middle; }
  .topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
  .brand { font-size:20px; font-weight:800; letter-spacing:3px; color:${MUTED}; text-transform:uppercase; }
  .pagepill { font-size:19px; font-weight:800; padding:8px 22px; border-radius:999px; color:#fff; }
  .footer { margin-top:auto; padding-top:28px; border-top:2px solid ${LINE}; display:flex; align-items:center; justify-content:space-between; }
  .footer .next { font-size:22px; font-weight:800; color:${MUTED}; display:flex; align-items:center; gap:10px; }
  .footer .next .icon { width:26px; height:26px; }
  .dots { display:flex; gap:10px; }
  .dot { width:11px; height:11px; border-radius:50%; background:${LINE}; }
  .dot.active { background:${NAVY}; width:30px; border-radius:6px; }
  .section-title { display:flex; align-items:center; gap:20px; margin-bottom:6px; }
  .section-title .iconwrap { width:64px; height:64px; border-radius:20px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .section-title .iconwrap .icon { width:34px; height:34px; }
  .section-title h1 { font-size:56px; font-weight:800; letter-spacing:-1px; }
  .eyebrow { font-size:22px; font-weight:800; letter-spacing:2px; text-transform:uppercase; margin-bottom:14px; }
  .lede { font-size:26px; color:${MUTED}; font-weight:500; line-height:1.5; margin-bottom:36px; }
  .rows { display:flex; flex-direction:column; gap:26px; flex:1; }
  .row-card { display:flex; gap:24px; align-items:center; background:${PAPER}; border:2px solid ${LINE}; border-radius:22px; padding:26px 32px; flex:1; }
  .row-card .bullet { width:52px; height:52px; border-radius:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#fff; }
  .row-card .bullet .icon { width:26px; height:26px; }
  .row-card h3 { font-size:32px; font-weight:800; margin-bottom:8px; }
  .row-card p { font-size:24px; color:${MUTED}; line-height:1.5; font-weight:500; }
`;

const shell = (bodyInner, extraCss = "") => `<!DOCTYPE html>
<html><head><meta charset="utf-8" />
<style>${BASE_CSS}${extraCss}</style>
</head><body>${bodyInner}</body></html>`;

const pagepill = (n, bg) => `<div class="pagepill" style="background:${bg}">${n} / 6</div>`;
const dots = (active) =>
  `<div class="dots">${Array.from({ length: 6 }, (_, i) => `<div class="dot${i === active ? " active" : ""}"></div>`).join("")}</div>`;
const nextFooter = (label, active) => `
  <div class="footer">
    ${dots(active)}
    <div class="next">${label} ${ICONS.arrow.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" class="icon"')}</div>
  </div>`;

/* =========================================================
   SLIDE 1 — COVER
   ========================================================= */
const slide1 = shell(
  `<div class="slide" style="padding:0;">
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;">
      <div style="flex:0 0 54%;background:linear-gradient(150deg, ${NAVY_DEEP} 0%, ${NAVY} 55%, ${BLUE} 130%);
                  clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);
                  display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:150px;position:relative;">
        <div style="position:absolute;top:56px;left:0;right:0;display:flex;justify-content:center;">
          <div style="font-size:22px;font-weight:800;letter-spacing:5px;color:rgba(255,255,255,0.75);text-transform:uppercase;
                      border:2px solid rgba(255,255,255,0.35);padding:10px 28px;border-radius:999px;">Database Showdown</div>
        </div>
        <div style="font-size:172px;font-weight:800;color:#ffffff;letter-spacing:-4px;line-height:1;">SQL</div>
        <div style="font-size:24px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,0.8);margin-top:14px;">STRUCTURED &nbsp;·&nbsp; RELIABLE &nbsp;·&nbsp; RELATIONAL</div>
      </div>
      <div style="flex:1;background:linear-gradient(150deg, ${EMERALD} 0%, ${EMERALD_DEEP} 70%, #064E3B 130%);
                  display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:165px;position:relative;">
        <div style="font-size:172px;font-weight:800;color:#ffffff;letter-spacing:-4px;line-height:1;">NoSQL</div>
        <div style="font-size:24px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,0.85);margin-top:14px;">FLEXIBLE &nbsp;·&nbsp; SCALABLE &nbsp;·&nbsp; MODERN</div>
        <div style="position:absolute;bottom:70px;left:0;right:0;display:flex;justify-content:center;">
          <div style="display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.14);border:2px solid rgba(255,255,255,0.4);
                      padding:16px 34px;border-radius:999px;color:#fff;font-size:24px;font-weight:800;letter-spacing:1px;">
            SWIPE TO SEE THE FULL BREAKDOWN
            ${ICONS.arrow.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" class="icon" style="width:28px;height:28px"')}
          </div>
        </div>
      </div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;border-radius:50%;
                  background:#ffffff;box-shadow:0 20px 50px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;
                  border:6px solid ${PAPER};z-index:5;">
        <div style="font-size:46px;font-weight:800;color:${INK};letter-spacing:-1px;">VS</div>
      </div>
    </div>
  </div>`
);

/* =========================================================
   SLIDE 2 — SQL DEEP DIVE
   ========================================================= */
const rowCard = (title, desc, accent, tint) => `
  <div class="row-card">
    <div class="bullet" style="background:${accent}">${ICONS.check.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" class="icon"')}</div>
    <div><h3>${title}</h3><p>${desc}</p></div>
  </div>`;

const slide2 = shell(`
  <div class="slide">
    <div class="topbar">
      <div class="brand">SQL vs NoSQL</div>
      ${pagepill("2", BLUE)}
    </div>
    <div style="margin-top:36px;" class="section-title">
      <div class="iconwrap" style="background:${BLUE_TINT};color:${BLUE};">${ICONS.table}</div>
      <h1 style="color:${NAVY};">SQL Databases</h1>
    </div>
    <div class="lede">Structured, reliable, and battle-tested for decades.</div>
    <div class="rows">
      ${rowCard("Fixed Schema", "Data lives in strict tables with clearly defined columns and types.", BLUE, BLUE_TINT)}
      ${rowCard("ACID Transactions", "Rock-solid consistency &mdash; critical for money, orders and inventory.", BLUE, BLUE_TINT)}
      ${rowCard("Powerful Joins", "Combine data across many tables in a single, precise query.", BLUE, BLUE_TINT)}
      ${rowCard("Popular Picks", "MySQL &nbsp;·&nbsp; PostgreSQL &nbsp;·&nbsp; SQL Server &nbsp;·&nbsp; Oracle", BLUE, BLUE_TINT)}
    </div>
    ${nextFooter("What about NoSQL?", 1)}
  </div>
`);

/* =========================================================
   SLIDE 3 — NOSQL DEEP DIVE
   ========================================================= */
const slide3 = shell(`
  <div class="slide">
    <div class="topbar">
      <div class="brand">SQL vs NoSQL</div>
      ${pagepill("3", EMERALD)}
    </div>
    <div style="margin-top:36px;" class="section-title">
      <div class="iconwrap" style="background:${EMERALD_TINT};color:${EMERALD_DEEP};">${ICONS.braces}</div>
      <h1 style="color:${EMERALD_DEEP};">NoSQL Databases</h1>
    </div>
    <div class="lede">Flexible and built to scale for modern, fast-moving apps.</div>
    <div class="rows">
      ${rowCard("Dynamic Schema", "Add or change fields on the fly &mdash; no rigid migrations required.", EMERALD, EMERALD_TINT)}
      ${rowCard("Horizontal Scaling", "Spread data across many servers to handle massive traffic.", EMERALD, EMERALD_TINT)}
      ${rowCard("Multiple Models", "Document, key-value, graph and wide-column stores in one family.", EMERALD, EMERALD_TINT)}
      ${rowCard("Popular Picks", "MongoDB &nbsp;·&nbsp; Redis &nbsp;·&nbsp; Cassandra &nbsp;·&nbsp; DynamoDB", EMERALD, EMERALD_TINT)}
    </div>
    ${nextFooter("How do they compare?", 2)}
  </div>
`);

/* =========================================================
   SLIDE 4 — HEAD TO HEAD TABLE
   ========================================================= */
const compareRow = (label, sql, nosql, alt) => `
  <div style="display:grid;grid-template-columns:1.05fr 1fr 1fr;background:${alt ? "#F7F9FC" : "transparent"};border-radius:16px;">
    <div style="padding:30px 18px;font-size:23px;font-weight:800;color:${MUTED};display:flex;align-items:center;">${label}</div>
    <div style="padding:30px 18px;font-size:25px;font-weight:700;color:${NAVY};display:flex;align-items:center;border-left:2px solid ${LINE};">${sql}</div>
    <div style="padding:30px 18px;font-size:25px;font-weight:700;color:${EMERALD_DEEP};display:flex;align-items:center;border-left:2px solid ${LINE};">${nosql}</div>
  </div>`;

const slide4 = shell(`
  <div class="slide">
    <div class="topbar">
      <div class="brand">SQL vs NoSQL</div>
      ${pagepill("4", NAVY)}
    </div>
    <div style="margin-top:36px;" class="section-title">
      <div class="iconwrap" style="background:#F0F1F6;color:${NAVY};">${ICONS.scale}</div>
      <h1>Head-to-Head</h1>
    </div>
    <div class="lede">The five things that actually matter when you pick.</div>

    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <div style="border:2px solid ${LINE};border-radius:24px;overflow:hidden;">
        <div style="display:grid;grid-template-columns:1.05fr 1fr 1fr;background:${INK};">
          <div style="padding:30px 18px;"></div>
          <div style="padding:30px 18px;font-size:28px;font-weight:800;color:#fff;border-left:2px solid rgba(255,255,255,0.15);">SQL</div>
          <div style="padding:30px 18px;font-size:28px;font-weight:800;color:#fff;border-left:2px solid rgba(255,255,255,0.15);">NoSQL</div>
        </div>
        ${compareRow("Schema", "Fixed", "Dynamic", false)}
        ${compareRow("Scaling", "Vertical (scale-up)", "Horizontal (scale-out)", true)}
        ${compareRow("Consistency", "Strong (ACID)", "Eventual, tunable", false)}
        ${compareRow("Structure", "Tables &amp; rows", "Documents / KV / graph", true)}
        ${compareRow("Best for", "Complex queries, transactions", "Big data, rapid iteration", false)}
      </div>
    </div>

    ${nextFooter("Which should you pick?", 3)}
  </div>
`);

/* =========================================================
   SLIDE 5 — DECISION GUIDE
   ========================================================= */
const decisionCard = (title, items, accent, tint, textColor) => `
  <div style="background:${tint};border-left:8px solid ${accent};border-radius:20px;padding:36px 34px;">
    <div style="font-size:30px;font-weight:800;color:${textColor};margin-bottom:22px;">${title}</div>
    <div style="display:flex;flex-direction:column;gap:18px;">
      ${items
        .map(
          (it) => `<div style="display:flex;gap:16px;align-items:flex-start;">
            <div style="width:32px;height:32px;border-radius:50%;background:${accent};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:3px;">
              ${ICONS.check.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" class="icon" style="width:17px;height:17px;color:#fff"')}
            </div>
            <div style="font-size:25px;font-weight:600;color:${INK};line-height:1.5;">${it}</div>
          </div>`
        )
        .join("")}
    </div>
  </div>`;

const slide5 = shell(`
  <div class="slide">
    <div class="topbar">
      <div class="brand">SQL vs NoSQL</div>
      ${pagepill("5", "#7C3AED")}
    </div>
    <div style="margin-top:36px;" class="section-title">
      <div class="iconwrap" style="background:#F1EBFB;color:#7C3AED;">${ICONS.compass}</div>
      <h1>Which One Should You Pick?</h1>
    </div>
    <div class="lede">A 10-second gut check before you commit.</div>

    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px;">
      <div style="display:flex;flex-direction:column;gap:28px;">
        ${decisionCard(
          "Choose SQL if you need\u2026",
          [
            "Strict data integrity &amp; safe transactions",
            "Complex relationships &amp; reporting",
            "A mature, well-documented ecosystem",
          ],
          BLUE,
          BLUE_TINT,
          NAVY
        )}
        ${decisionCard(
          "Choose NoSQL if you need\u2026",
          [
            "Massive scale &amp; flexible, evolving data",
            "Rapid iteration on your data model",
            "High-speed reads &amp; writes at scale",
          ],
          EMERALD,
          EMERALD_TINT,
          EMERALD_DEEP
        )}
      </div>

      <div style="display:flex;gap:16px;align-items:flex-start;background:#FFF7E6;border-radius:18px;padding:26px 28px;">
        <div style="width:44px;height:44px;border-radius:13px;background:#F59E0B;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;">
          ${ICONS.bulb.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" class="icon" style="width:24px;height:24px"')}
        </div>
        <div style="font-size:24px;font-weight:600;color:${INK};line-height:1.5;">
          <b>Pro tip:</b> many production systems use both &mdash; a pattern called <b>polyglot persistence</b>.
        </div>
      </div>
    </div>

    ${nextFooter("Final takeaway", 4)}
  </div>
`);

/* =========================================================
   SLIDE 6 — CTA
   ========================================================= */
const ctaPill = (title, icon, bg) => `
  <div style="flex:1;background:${bg};border-radius:20px;padding:26px 18px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;">
    <div style="width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;color:#fff;">
      ${icon.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" class="icon" style="width:28px;height:28px"')}
    </div>
    <div style="font-size:21px;font-weight:800;color:#fff;line-height:1.3;">${title}</div>
  </div>`;

const slide6 = shell(`
  <div class="slide" style="background:linear-gradient(160deg, ${NAVY_DEEP} 0%, ${NAVY} 60%, #0E3B2E 130%); color:#fff;">
    <div class="topbar">
      <div class="brand" style="color:rgba(255,255,255,0.6);">SQL vs NoSQL</div>
      ${pagepill("6", "rgba(255,255,255,0.18)")}
    </div>

    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:34px;">
      <div style="font-size:23px;font-weight:800;letter-spacing:3px;color:#8FB4FF;text-transform:uppercase;">Final Takeaway</div>
      <div style="font-size:58px;font-weight:800;line-height:1.18;letter-spacing:-1px;">
        There's no universal winner.
      </div>
      <div style="font-size:29px;font-weight:500;line-height:1.55;color:rgba(255,255,255,0.85);max-width:880px;">
        <b style="color:#7EC8FF;">SQL</b> gives you structure and certainty.
        <b style="color:#5EEAB0;">NoSQL</b> gives you flexibility and scale.
        The right pick depends on your data, your growth, and your team &mdash; not on the hype.
      </div>

      <div style="display:flex;gap:20px;margin-top:12px;">
        ${ctaPill("Save this post", ICONS.bookmark, "rgba(255,255,255,0.08)")}
        ${ctaPill("Comment your pick", ICONS.message, "rgba(255,255,255,0.08)")}
        ${ctaPill("Follow for more", ICONS.userplus, "rgba(255,255,255,0.08)")}
      </div>
    </div>

    <div class="footer" style="border-top:2px solid rgba(255,255,255,0.15);">
      ${dots(5).replace(/background:${LINE}/g, "")}
      <div style="font-size:24px;font-weight:700;color:rgba(255,255,255,0.7);">SQL, NoSQL, or both? Tell us below.</div>
    </div>
  </div>
`, `.dot{background:rgba(255,255,255,0.25) !important;} .dot.active{background:#fff !important;}`);

/* ---------- write files ---------- */
const slides = { 1: slide1, 2: slide2, 3: slide3, 4: slide4, 5: slide5, 6: slide6 };
for (const [n, html] of Object.entries(slides)) {
  fs.writeFileSync(path.join(OUT_DIR, `slide-${n}.html`), html);
}
console.log("Wrote", Object.keys(slides).length, "slide html files to", OUT_DIR);
