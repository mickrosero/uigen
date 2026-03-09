#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('tool_input', {}).get('file_path', ''))" 2>/dev/null)
if [[ "$FILE_PATH" == *".env"* ]]; then
  echo "Access to .env files is blocked for security reasons" >&2
  exit 2
fi
exit 0
