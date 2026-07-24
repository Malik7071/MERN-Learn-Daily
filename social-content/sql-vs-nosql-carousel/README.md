# SQL vs NoSQL — LinkedIn Carousel

A short, 6-slide carousel comparing SQL and NoSQL databases, ready to post on LinkedIn.

## Files

- `slide-1.png` … `slide-6.png` — the individual carousel slides (1080×1350px, LinkedIn's ideal 4:5 portrait ratio).
- `SQL-vs-NoSQL-LinkedIn-Carousel.pdf` — all 6 slides combined into one PDF. Upload this as a **document post** on LinkedIn to get the native swipeable-carousel effect, or upload the 6 PNGs directly as a multi-image post.
- `build/` — the HTML/CSS source for each slide plus the Node script (`builder.js`) that generates them. Edit `builder.js` and re-run `node builder.js` to tweak copy or styling, then re-render with Chrome headless (see below).

## Slide-by-slide

1. **Cover** — bold "SQL vs NoSQL" hook with a swipe prompt.
2. **SQL Databases** — fixed schema, ACID transactions, joins, popular picks (MySQL, PostgreSQL, SQL Server, Oracle).
3. **NoSQL Databases** — dynamic schema, horizontal scaling, multiple data models, popular picks (MongoDB, Redis, Cassandra, DynamoDB).
4. **Head-to-Head** — a 5-row comparison table (schema, scaling, consistency, structure, best-for).
5. **Which One Should You Pick?** — quick decision guide + a "polyglot persistence" pro tip.
6. **Final Takeaway** — no universal winner; CTA to save / comment / follow.

## Suggested LinkedIn caption

> SQL vs NoSQL — which one should you actually use? 🤔
>
> Here's the difference in 60 seconds ⤵️
>
> 🔹 SQL → structured, ACID-compliant, perfect for complex relationships and transactions (MySQL, PostgreSQL).
> 🔹 NoSQL → flexible, horizontally scalable, perfect for big data and fast-changing apps (MongoDB, Redis, Cassandra).
>
> There's no universal winner — the right choice depends on your data, your scale, and your team. Most large-scale systems actually use both (polyglot persistence).
>
> 📌 Save this for your next system-design interview.
> 💬 Which one do you reach for first — SQL, NoSQL, or both? Let me know below.
>
> #SQL #NoSQL #Database #SystemDesign #BackendDevelopment #SoftwareEngineering #MongoDB #PostgreSQL #TechTips #WebDevelopment

## Regenerating slides

```bash
cd build
node builder.js   # regenerates slide-*.html from builder.js
for i in 1 2 3 4 5 6; do
  timeout 20 google-chrome --headless --no-sandbox --disable-gpu --disable-dev-shm-usage \
    --hide-scrollbars --window-size=1080,1350 \
    --screenshot="$(pwd)/../slide-$i.png" "$(pwd)/slide-$i.html"
done
```
