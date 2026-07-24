/**
 * Renders carousel.html into:
 *  - output/sql-vs-nosql-carousel.pdf   (upload this directly to LinkedIn as a document post)
 *  - output/slide-01.png ... slide-07.png (individual images, in case you prefer an image carousel)
 *
 * Usage:
 *   npm install
 *   npm run render
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/local/bin/google-chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    "Could not find a Chrome/Chromium executable. Set CHROME_PATH env var."
  );
}

const SLIDE_WIDTH_PX = 1080;
const SLIDE_HEIGHT_PX = 1350;
const PX_TO_IN = 1 / 96;

async function main() {
  const outDir = path.join(__dirname, "output");
  fs.mkdirSync(outDir, { recursive: true });

  const executablePath = findChrome();
  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-color-profile=srgb"],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: SLIDE_WIDTH_PX,
    height: SLIDE_HEIGHT_PX,
    deviceScaleFactor: 2,
  });

  const htmlPath = path.join(__dirname, "carousel.html");
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");

  // Individual PNG slides (crisp, cropped exactly to each .slide element)
  const slideHandles = await page.$$(".slide");
  console.log(`Found ${slideHandles.length} slides.`);
  for (let i = 0; i < slideHandles.length; i++) {
    const fileName = `slide-${String(i + 1).padStart(2, "0")}.png`;
    await slideHandles[i].screenshot({ path: path.join(outDir, fileName) });
    console.log(`  -> ${fileName}`);
  }

  // Multi-page PDF (one slide per page) for LinkedIn "document" carousel upload
  await page.pdf({
    path: path.join(outDir, "sql-vs-nosql-carousel.pdf"),
    width: `${SLIDE_WIDTH_PX * PX_TO_IN}in`,
    height: `${SLIDE_HEIGHT_PX * PX_TO_IN}in`,
    printBackground: true,
    pageRanges: "",
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  console.log("  -> sql-vs-nosql-carousel.pdf");

  await browser.close();
  console.log("\nDone. Files written to:", outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
