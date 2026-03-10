const { execSync } = require('child_process');

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());
  const toolName = toolArgs.tool_name || '';
  
  // Solo ejecutar después de editar archivos
  if (!['Write', 'Edit', 'MultiEdit'].includes(toolName)) {
    process.exit(0);
  }

  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    process.exit(0);
  } catch (error) {
    console.error('TypeScript errors found:');
    console.error(error.stdout?.toString() || error.message);
    process.exit(2);
  }
}

main().catch(console.error);
