# LinkedIn Carousel — SQL vs NoSQL 🗄️

A short, 8-slide LinkedIn carousel comparing SQL and NoSQL databases. Designed to be quick to swipe through (under a minute) while still landing the key differences developers actually need to know.

## Slides

| # | File | Content |
|---|------|---------|
| 1 | `slides/slide-1.png` | Cover — "SQL vs NoSQL" hook |
| 2 | `slides/slide-2.png` | What is SQL? |
| 3 | `slides/slide-3.png` | What is NoSQL? |
| 4 | `slides/slide-4.png` | Structure: tables vs documents |
| 5 | `slides/slide-5.png` | Scalability: vertical vs horizontal |
| 6 | `slides/slide-6.png` | When to use each |
| 7 | `slides/slide-7.png` | Quick recap comparison table |
| 8 | `slides/slide-8.png` | Verdict + call to action |

Slides are 1080×1350px (LinkedIn's recommended 4:5 document/carousel size), ready to upload directly as a PDF/document post.

## How to post

1. On LinkedIn, click **Start a post → Add a document**.
2. Combine the 8 PNGs into a single PDF (in order) — e.g. locally:

   ```bash
   # macOS
   sips -s format pdf slides/slide-*.png --out sql-vs-nosql.pdf
   # or, with ImageMagick on any OS
   convert slides/slide-1.png slides/slide-2.png slides/slide-3.png slides/slide-4.png \
           slides/slide-5.png slides/slide-6.png slides/slide-7.png slides/slide-8.png \
           sql-vs-nosql.pdf
   ```

3. Upload the PDF as the document attachment and use the caption below.

## Suggested caption

```
SQL vs NoSQL — which one should YOU be using? 🗄️

Everyone has an opinion. Here's the honest, no-hype breakdown in 8 slides 👉

Truth is, it's not "better vs worse" — it's "right tool for the job."

💬 Drop your pick in the comments: SQL or NoSQL?
📌 Save this for your next project
🔁 Repost to help a fellow dev
➕ Follow for daily MERN stack tips

#SQL #NoSQL #MongoDB #WebDevelopment #MERNstack #100DaysOfCode #Database #BackendDevelopment #SoftwareEngineering
```

## Source (editing / regenerating slides)

The slides are generated from HTML/CSS (`source/style.css` + `source/build.js`) and rendered to PNG with headless Chrome, so text stays crisp and everything is easy to re-theme.

To tweak copy, colors, or add slides:

1. Edit the slide data (or `style.css`) in `source/build.js`.
2. Install a lightweight renderer and generate the HTML + screenshots:

   ```bash
   cd source
   npm init -y && npm install puppeteer-core --no-save
   node build.js        # writes out/slide-*.html
   node - <<'NODE'
   const puppeteer = require('puppeteer-core');
   const fs = require('fs'), path = require('path');
   (async () => {
     const browser = await puppeteer.launch({
       executablePath: '/usr/bin/google-chrome', // or your Chrome path
       headless: 'new',
       args: ['--no-sandbox', '--disable-dev-shm-usage'],
     });
     const page = await browser.newPage();
     await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
     const dir = path.join(__dirname, 'out');
     for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
       await page.goto('file://' + path.join(dir, f), { waitUntil: 'networkidle0' });
       await page.screenshot({ path: path.join(dir, f.replace('.html', '.png')) });
     }
     await browser.close();
   })();
   NODE
   ```

3. Copy the resulting `out/slide-*.png` files into `../slides/`.
