import os
import sys
import time
import shutil
from pathlib import Path
import requests

DEFAULT_TIMEOUT = 10
RETRIES = 5
CHUNK_SIZE = 1024 * 1024


def download_file(url: str, dest: Path, timeout: int = DEFAULT_TIMEOUT):
    dest.parent.mkdir(parents=True, exist_ok=True)
    attempt = 0
    while attempt < RETRIES:
        try:
            with requests.get(url, stream=True, timeout=timeout) as r:
                r.raise_for_status()
                tmp = dest.with_suffix('.tmp')
                with open(tmp, 'wb') as f:
                    for chunk in r.iter_content(chunk_size=CHUNK_SIZE):
                        if chunk:
                            f.write(chunk)
                # move into place atomically
                shutil.move(str(tmp), str(dest))
            print(f"Downloaded {url} -> {dest}")
            return True
        except Exception as e:
            attempt += 1
            wait = 2 ** attempt
            print(f"Attempt {attempt}/{RETRIES} failed for {url}: {e}. Retrying in {wait}s...", file=sys.stderr)
            time.sleep(wait)
    print(f"Failed to download {url} after {RETRIES} attempts", file=sys.stderr)
    return False


def main():
    index_url = os.environ.get('FAISS_INDEX_URL')
    json_url = os.environ.get('FAISS_JSON_URL')
    out_index = Path(os.environ.get('FAISS_INDEX_DEST', 'charity_faiss.index'))
    out_json = Path(os.environ.get('FAISS_JSON_DEST', 'charity_faiss_mapping.json'))

    if not index_url and not json_url:
        print('Set FAISS_INDEX_URL and/or FAISS_JSON_URL environment variables', file=sys.stderr)
        sys.exit(2)

    ok = True
    if index_url:
        ok = download_file(index_url, out_index) and ok
    if json_url:
        ok = download_file(json_url, out_json) and ok

    if not ok:
        print('One or more downloads failed', file=sys.stderr)
        sys.exit(1)

    print('All downloads completed')


if __name__ == '__main__':
    main()
