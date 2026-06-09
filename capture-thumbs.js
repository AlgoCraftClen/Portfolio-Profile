const { chromium } = require('playwright');
const path = require('path');

const projects = [
  {
    url: 'https://github.com/AlgoCraftClen/PayrollSync',
    filename: 'proj-payrollsync.png',
  },
  {
    url: 'https://github.com/AlgoCraftClen/Slide-Show',
    filename: 'proj-slideshow.png',
  },
  {
    url: 'https://github.com/AlgoCraftClen/wdd130',
    filename: 'proj-wdd130.png',
  },
  {
    url: 'https://github.com/AlgoCraftClen/Portfolio-Profile',
    filename: 'proj-portfolio.png',
  },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  for (const proj of projects) {
    console.log(`Capturing ${proj.url}...`);
    await page.goto(proj.url, { waitUntil: 'networkidle', timeout: 30000 });
    const outPath = path.join(__dirname, 'images', proj.filename);
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1280, height: 640 } });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
  console.log('Done.');
})();
