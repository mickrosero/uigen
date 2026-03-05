const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const label = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      
      if (!label && !ariaLabel) {
        console.log('❌ ERROR DE ACCESIBILIDAD: Se encontró un botón sin texto ni aria-label.');
        process.exit(1);
      }
    }
    
    console.log('✅ TEST PASADO: Todos los botones son accesibles.');
    process.exit(0);
  } catch (e) {
    console.log('❌ ERROR:', e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
