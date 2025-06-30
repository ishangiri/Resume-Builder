// puppeteer_render.js
import puppeteer from "puppeteer";
import fs from "fs";

const [_, __, htmlPath, pdfPath] = process.argv;

(async () => {
  try {
    const html = fs.readFileSync(htmlPath, "utf8");
    const browser = await puppeteer.launch({  headless: 'new',
  executablePath: '/opt/render/.cache/puppeteer/chrome/linux-138.0.7204.49/chrome-linux64/chrome',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor'
  ],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();
  } catch (err) {
    console.error("Error generating PDF:", err);
    process.exit(1);
  }
})();

