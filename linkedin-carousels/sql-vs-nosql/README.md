# SQL vs NoSQL — LinkedIn Carousel

A short, 7-slide, scroll-stopping carousel comparing SQL and NoSQL databases, ready to post on LinkedIn.

## What's inside

- `carousel.html` — the editable source (single HTML/CSS file, no build step, no external assets besides a Google Font).
- `render.js` / `package.json` — a small Puppeteer script that renders `carousel.html` into ready-to-post files.
- `output/` — the generated assets:
  - `sql-vs-nosql-carousel.pdf` — **upload this directly** as a LinkedIn "document" post for the native swipeable carousel experience.
  - `slide-01.png` … `slide-07.png` — individual 1080×1350 (4:5) slide images, in case you'd rather post an image carousel or edit slides in Canva/Figma.

## The 7 slides

1. **Title** — "SQL vs NoSQL — Which database should YOU pick?"
2. **What is SQL** — tables, fixed schema, ACID, examples (MySQL, PostgreSQL, SQLite, SQL Server)
3. **What is NoSQL** — flexible models, dynamic schema, horizontal scale, examples (MongoDB, Redis, Cassandra, DynamoDB)
4. **Key differences** — quick comparison table (schema, structure, scaling, consistency, best-for)
5. **When to use SQL** — banking, complex relationships, reporting, strong consistency
6. **When to use NoSQL** — rapid iteration, massive scale, content/feeds, unstructured data
7. **Takeaway + CTA** — "no better, only better fit" + a question to drive comments

## Regenerating the images/PDF

If you tweak the copy or colors in `carousel.html`, re-render with:

```bash
cd linkedin-carousels/sql-vs-nosql
npm install
npm run render
```

This uses your local Chrome/Chromium install (via `puppeteer-core`, so no extra ~200MB Chromium download). If Chrome isn't at one of the default paths, point to it explicitly:

```bash
CHROME_PATH=/path/to/chrome npm run render
```

## Suggested LinkedIn caption

```
SQL vs NoSQL — which one do you reach for first? 🤔

Swipe through a 60-second breakdown 👇

🗄️ SQL = structured, relational, rock-solid consistency
🍃 NoSQL = flexible, fast, built to scale

There's no universal winner — only the right fit for your data and your scale.

💬 Drop your go-to in the comments, and follow for more daily dev bites 🚀

#SQL #NoSQL #Database #WebDevelopment #MongoDB #PostgreSQL #BackendDevelopment #100DaysOfCode
```

## Posting tips

- LinkedIn document posts (PDF) render as a native swipeable carousel and typically get strong reach — use `sql-vs-nosql-carousel.pdf`.
- Keep the first slide's hook visible without cropping (LinkedIn shows a preview thumbnail before the swipe).
- Post natively (not a link) for best distribution, and reply to early comments to boost engagement.
