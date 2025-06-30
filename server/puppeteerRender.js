// puppeteer_render.js
import puppeteer from "puppeteer";
import fs from "fs";

const [_, __, htmlPath, pdfPath] = process.argv;

(async () => {
  try {
    const html = fs.readFileSync(htmlPath, "utf8");
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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

