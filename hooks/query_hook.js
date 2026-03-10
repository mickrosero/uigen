async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());
  const filePath = toolArgs.tool_input?.file_path || '';
  
  // Solo monitorear directorio queries
  if (!filePath.includes('/queries/')) {
    process.exit(0);
  }

  console.error(`⚠️ Query file modified: ${filePath}`);
  console.error('Please check for duplicate queries before proceeding.');
  console.error('Review existing queries in the ./queries directory.');
  process.exit(0);
}

main().catch(console.error);
