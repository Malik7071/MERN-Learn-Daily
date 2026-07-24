const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const TOTAL = 8;

function shell(pageNo, bodyHtml, glow = 'both') {
  const glowHtml =
    glow === 'both' ? '<div class="glow glow-blue"></div><div class="glow glow-green"></div>' :
    glow === 'blue' ? '<div class="glow glow-blue"></div>' :
    glow === 'green' ? '<div class="glow glow-green"></div>' : '';
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${css}</style></head>
<body>
  <div class="slide">
    ${glowHtml}
    <div class="grid-pattern"></div>
    ${pageNo ? `<div class="pageno"><b>${String(pageNo).padStart(2,'0')}</b> / ${String(TOTAL).padStart(2,'0')}</div>` : ''}
    <div class="content">
      ${bodyHtml}
    </div>
  </div>
</body></html>`;
}

function dots(active) {
  let s = '<div class="dots">';
  for (let i = 1; i <= TOTAL; i++) s += `<span class="${i === active ? 'active' : ''}"></span>`;
  s += '</div>';
  return s;
}

function footer(active) {
  return `<div class="footer-row">
    <div class="brand"><span class="sq"></span> SQL vs NoSQL</div>
    ${dots(active)}
  </div>`;
}

function itemsBlock(items, green) {
  return `<div class="items">${items.map(it => `
    <div class="item ${green ? 'green' : ''}">
      <div class="icon">${it.icon}</div>
      <div class="txt"><h3>${it.h}</h3><p>${it.p}</p></div>
    </div>`).join('')}</div>`;
}

function columnsBlock(left, right) {
  return `<div class="columns">
    <div class="col blue">
      <span class="tag">${left.tag}</span>
      <ul>${left.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
    <div class="col green">
      <span class="tag">${right.tag}</span>
      <ul>${right.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  </div>`;
}

const slides = [];

// Slide 1 — Cover
slides.push(shell(null, `
  <div class="cover-wrap">
    <div class="cover-badge">🗄️ <span class="lb">DATABASE</span> SHOWDOWN <span class="lb g">2026</span></div>
    <div class="vs-title"><span class="sql">SQL</span> <span class="no">vs</span> <span class="nosql">NoSQL</span></div>
    <div class="cover-sub">Which database should actually power your next app? Here's the real answer, in 60 seconds. 👇</div>
    <div class="swipe">Swipe to find out <span class="arrow">→</span></div>
  </div>
`));

// Slide 2 — What is SQL
slides.push(shell(2, `
  <div class="eyebrow"><span class="dot"></span> THE BASICS · 01</div>
  <h1 class="title">What is <span class="accent">SQL?</span></h1>
  <div class="subtitle">The classic, battle-tested relational database.</div>
  ${itemsBlock([
    { icon:'🗂️', h:'Relational', p:'Data lives in structured tables made of rows and columns.' },
    { icon:'📐', h:'Fixed Schema', p:'You define the structure upfront — it stays consistent.' },
    { icon:'🔗', h:'Relationships', p:'Tables connect through foreign keys and JOINs.' },
    { icon:'🛠️', h:'Examples', p:'MySQL, PostgreSQL, SQL Server, SQLite.' },
  ], false)}
  ${footer(2)}
`, 'blue'));

// Slide 3 — What is NoSQL
slides.push(shell(3, `
  <div class="eyebrow green"><span class="dot"></span> THE BASICS · 02</div>
  <h1 class="title">What is <span class="accent green">NoSQL?</span></h1>
  <div class="subtitle">The flexible, built-for-scale alternative.</div>
  ${itemsBlock([
    { icon:'🍃', h:'Non-Relational', p:'Documents, key-value, graph or column-based storage.' },
    { icon:'🧩', h:'Flexible Schema', p:'Add or change fields anytime — no rigid structure.' },
    { icon:'📦', h:'Self-Contained', p:'Related data is nested together — fewer JOINs needed.' },
    { icon:'🛠️', h:'Examples', p:'MongoDB, Redis, Cassandra, DynamoDB.' },
  ], true)}
  ${footer(3)}
`, 'green'));

// Slide 4 — Structure
slides.push(shell(4, `
  <div class="eyebrow"><span class="dot"></span> ROUND 01</div>
  <h1 class="title">Structure</h1>
  <div class="subtitle">How each one actually stores your data.</div>
  ${columnsBlock(
    { tag:'SQL', items: ['Tables, rows & columns', 'Strict, predefined schema', 'Data normalized across tables'] },
    { tag:'NOSQL', items: ['Collections & documents', 'Dynamic, evolving schema', 'Data nested in one place'] }
  )}
  ${footer(4)}
`));

// Slide 5 — Scalability
slides.push(shell(5, `
  <div class="eyebrow"><span class="dot"></span> ROUND 02</div>
  <h1 class="title">Scalability</h1>
  <div class="subtitle">What happens when your app blows up 🚀</div>
  ${columnsBlock(
    { tag:'SQL', items: ['Scales UP (vertical)', 'Needs a bigger, stronger server', 'Excels at complex ACID transactions'] },
    { tag:'NOSQL', items: ['Scales OUT (horizontal)', 'Add more servers as you grow', 'Built for speed at massive scale'] }
  )}
  ${footer(5)}
`));

// Slide 6 — When to use each
slides.push(shell(6, `
  <div class="eyebrow"><span class="dot"></span> ROUND 03</div>
  <h1 class="title">When to use each?</h1>
  <div class="subtitle">Pick based on your project, not the hype.</div>
  ${columnsBlock(
    { tag:'USE SQL', items: ['Banking & fintech apps', 'Inventory & ERP systems', 'Data integrity is non-negotiable'] },
    { tag:'USE NOSQL', items: ['Real-time apps & chat', 'Content catalogs & CMS', 'Big data, IoT & rapid growth'] }
  )}
  ${footer(6)}
`));

// Slide 7 — Comparison table
slides.push(shell(7, `
  <div class="eyebrow"><span class="dot"></span> QUICK RECAP</div>
  <h1 class="title">SQL vs NoSQL <span class="accent">at a glance</span></h1>
  <table class="cmp">
    <tr><th></th><th>SQL</th><th>NoSQL</th></tr>
    <tr><td>Schema</td><td class="blue">Fixed</td><td class="green">Flexible</td></tr>
    <tr><td>Scaling</td><td class="blue">Vertical</td><td class="green">Horizontal</td></tr>
    <tr><td>Structure</td><td class="blue">Tables & rows</td><td class="green">Documents / KV</td></tr>
    <tr><td>Best for</td><td class="blue">Structured data</td><td class="green">Unstructured, fast growth</td></tr>
    <tr><td>Examples</td><td class="blue">MySQL, Postgres</td><td class="green">MongoDB, Redis</td></tr>
  </table>
  ${footer(7)}
`));

// Slide 8 — Outro / CTA
slides.push(shell(8, `
  <div class="eyebrow"><span class="dot"></span> THE VERDICT</div>
  <h1 class="title">SQL or NoSQL?</h1>
  <div class="subtitle">Honest answer: it depends on your use case. 👀 Both are here to stay — know when to reach for each.</div>
  <div class="outro-icons">
    <div class="row"><span class="em">💬</span> Comment which one YOU prefer</div>
    <div class="row"><span class="em">📌</span> Save this for your next project</div>
    <div class="row"><span class="em">🔁</span> Repost to help a fellow dev</div>
    <div class="row"><span class="em">➕</span> Follow for daily MERN stack tips</div>
  </div>
  ${footer(8)}
`));

const outDir = path.join(__dirname, 'out');
fs.mkdirSync(outDir, { recursive: true });
slides.forEach((html, i) => {
  fs.writeFileSync(path.join(outDir, `slide-${i + 1}.html`), html, 'utf8');
});
console.log('Wrote', slides.length, 'slide HTML files to', outDir);
