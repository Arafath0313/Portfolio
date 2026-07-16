import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_BASE_DIR = 'C:\\Users\\arafa\\.gemini\\antigravity-ide\\brain\\cc27a76d-2abb-47db-bc23-0c7deaf34963\\scratch\\qa-results';
const BASE_URL = 'http://localhost:5173';

const BREAKPOINTS = [
  { width: 320, height: 600 },
  { width: 375, height: 667 },
  { width: 390, height: 844 },
  { width: 414, height: 896 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
];

const PUBLIC_ROUTES = [
  '/', '/about', '/skills', '/experience', '/education', '/projects', 
  '/certifications', '/resume', '/gallery', '/youtube', '/passions', '/contact'
];

const ADMIN_ROUTES = [
  '/admin', '/admin/about', '/admin/skills', '/admin/skills/create', '/admin/education', '/admin/education/create',
  '/admin/projects', '/admin/projects/create', '/admin/certifications', '/admin/certifications/create', '/admin/resume', 
  '/admin/passions', '/admin/passions/create', '/admin/messages', '/admin/settings'
];

async function runAudit() {
  if (!fs.existsSync(SCREENSHOT_BASE_DIR)) {
    fs.mkdirSync(SCREENSHOT_BASE_DIR, { recursive: true });
  }

  // Create breakpoint directories
  for (const bp of BREAKPOINTS) {
    const dir = path.join(SCREENSHOT_BASE_DIR, bp.width.toString());
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
  const failuresDir = path.join(SCREENSHOT_BASE_DIR, 'failures');
  if (!fs.existsSync(failuresDir)) fs.mkdirSync(failuresDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const report = {
    totalTestedPages: 0,
    totalBreakpointsTested: 0,
    totalScreenshotsCaptured: 0,
    totalRuntimeChecksExecuted: 0,
    totalConsoleErrors: 0,
    totalNetworkFailures: 0,
    testedPages: [],
    issues: [],
    consoleErrors: [],
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
        report.consoleErrors.push(`[Console Error] ${msg.text()}`);
        report.totalConsoleErrors++;
    }
  });
  page.on('pageerror', err => {
      report.consoleErrors.push(`[Page Error] ${err.message}`);
      report.totalConsoleErrors++;
  });
  page.on('requestfailed', request => {
      report.totalNetworkFailures++;
  });

  console.log("Logging into admin...");
  await page.goto(`${BASE_URL}/login`);
  await page.type('input[name="username"]', 'admin');
  await page.type('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});

  const allRoutes = [...PUBLIC_ROUTES, ...ADMIN_ROUTES];

  for (const route of allRoutes) {
    console.log(`Testing route: ${route}`);
    report.testedPages.push(route);
    report.totalTestedPages++;
    
    for (const bp of BREAKPOINTS) {
      report.totalBreakpointsTested++;
      const currentDir = path.join(SCREENSHOT_BASE_DIR, bp.width.toString());
      
      await page.setViewport({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' }).catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 500));

      const baseName = `${route.replace(/\//g, '_') || 'home'}`;
      
      // Capture Full Page
      const fullPath = path.join(currentDir, `${baseName}-full.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      report.totalScreenshotsCaptured++;

      // Try to open a modal if on an admin list page
      try {
         const btnClicked = await page.evaluate(() => {
             const btns = Array.from(document.querySelectorAll('button'));
             const delBtn = btns.find(b => b.textContent.trim() === 'Delete' || b.getAttribute('aria-label') === 'Delete');
             if(delBtn) { delBtn.click(); return true; }
             return false;
         });
         if (btnClicked) {
             await new Promise(resolve => setTimeout(resolve, 300));
             await page.screenshot({ path: path.join(currentDir, `${baseName}-modal.png`), fullPage: false });
             report.totalScreenshotsCaptured++;
             
             await page.evaluate(() => {
                 const btns = Array.from(document.querySelectorAll('button'));
                 const cancelBtn = btns.find(b => b.textContent.trim() === 'Cancel');
                 if(cancelBtn) cancelBtn.click();
             });
         }
      } catch(e) {}

      // Run evaluations
      report.totalRuntimeChecksExecuted++;
      const evaluation = await page.evaluate(() => {
        const issues = [];
        if (document.documentElement.scrollWidth > window.innerWidth) {
            issues.push(`Horizontal overflow detected. scrollWidth: ${document.documentElement.scrollWidth}, innerWidth: ${window.innerWidth}`);
        }
        const elements = document.querySelectorAll('*');
        for(let el of elements) {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            if(style.display !== 'none' && style.opacity !== '0' && style.visibility !== 'hidden' && style.position !== 'fixed') {
                if (rect.right > window.innerWidth) {
                   issues.push(`Clipped element (right): <${el.tagName.toLowerCase()} class="${el.className}">`);
                }
                if (rect.left < 0) {
                   issues.push(`Clipped element (left): <${el.tagName.toLowerCase()} class="${el.className}">`);
                }
            }
        }
        return issues;
      });

      if (evaluation.length > 0) {
        const failPath = path.join(failuresDir, `${baseName}-${bp.width}-failure.png`);
        await page.screenshot({ path: failPath, fullPage: true });
        report.totalScreenshotsCaptured++;
        
        report.issues.push({
          page: route,
          breakpoint: bp.width,
          rootCause: evaluation.join(" | "),
          screenshot: failPath,
          fixApplied: "Pending"
        });
      }
    }
  }

  fs.writeFileSync('qa-report.json', JSON.stringify(report, null, 2));
  console.log("Audit complete. Report saved to qa-report.json");
  await browser.close();
}

runAudit().catch(console.error);
