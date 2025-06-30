// puppeteerRender.js
import puppeteer from "puppeteer";
import fs from "fs";

const [_, __, htmlPath, pdfPath] = process.argv;

(async () => {
  try {
    console.log(`Generating PDF from ${htmlPath} to ${pdfPath}`);
    
    const html = fs.readFileSync(htmlPath, "utf8");
    
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
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
    console.log('PDF generated successfully');
    
  } catch (err) {
    console.error("Error generating PDF:", err);
    process.exit(1);
  }
})();