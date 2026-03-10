const fs = require('fs');

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  const data = JSON.parse(Buffer.concat(chunks).toString());
  
  const log = {
    timestamp: new Date().toISOString(),
    event: data.hook_event_name,
    tool: data.tool_name || 'N/A',
    file: data.tool_input?.file_path || data.tool_input?.path || 'N/A'
  };
  
  fs.appendFileSync('activity.log', JSON.stringify(log) + '\n');
  process.exit(0);
}

main().catch(console.error);
