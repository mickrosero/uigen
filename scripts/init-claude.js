const fs = require('fs');
const path = require('path');

const examplePath = path.join(__dirname, '../.claude/settings.example.json');
const outputPath = path.join(__dirname, '../.claude/settings.local.json');

const content = fs.readFileSync(examplePath, 'utf8');
const resolved = content.replace(/\$PWD/g, process.cwd());

fs.writeFileSync(outputPath, resolved);
console.log('✅ settings.local.json created with absolute paths');
console.log('📁 Project path:', process.cwd());
