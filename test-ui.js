const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    console.log('🔗 Conectando a Next.js en 127.0.0.1:3000...');
    
    // Usamos la IP directa para evitar líos de DNS en WSL
    await page.goto('http://127.0.0.1:3000', { 
      waitUntil: 'networkidle', 
      timeout: 20000 
    });

    // Esperamos 2 segundos extra por si acaso el JS de Next.js es lento
    await page.waitForTimeout(2000);

    // Buscamos cualquier botón en la página
    const button = page.getByRole('button');
    const count = await button.count();
    
    if (count > 0) {
      console.log('✅ TEST PASADO: ¡Se detectaron ' + count + ' botón(es) en la interfaz!');
      process.exit(0);
    } else {
      console.log('❌ TEST FALLIDO: El servidor respondió pero no hay botones en el DOM.');
      // Guardamos una foto para ver qué hay realmente
      await page.screenshot({ path: 'test-fail.png' });
      process.exit(1);
    }
  } catch (e) {
    console.log('❌ ERROR TÉCNICO:', e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
