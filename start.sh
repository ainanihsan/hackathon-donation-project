#!/usr/bin/env bash
set -euo pipefail

# Entrypoint: download faiss assets at container start to avoid build-time timeouts on platforms like Railway
echo "Starting asset downloader..."
python3 /app/download_assets.py || {
  echo "Asset download failed; continuing so container can still start for debugging" >&2
}

# If a command is provided, exec it (e.g., start the app). Otherwise sleep to keep container alive for debugging.
if [ "$#" -gt 0 ]; then
  exec "$@"
else
  echo "No command provided; sleeping to keep container running"
  tail -f /dev/null
fi
