Minimal instructions for downloading FAISS assets at container start (avoids Railway build-time timeout)

1) Set environment variables:

- FAISS_INDEX_URL: URL to download `charity_faiss.index`
- FAISS_JSON_URL: URL to download `charity_faiss_mapping.json`

2) Build the Docker image locally:

```pwsh
docker build -t donation-downloader:local .
```

3) Run container (downloads at start):

```pwsh
docker run --rm -e FAISS_INDEX_URL="https://example.com/charity_faiss.index" \
  -e FAISS_JSON_URL="https://example.com/charity_faiss_mapping.json" \
  donation-downloader:local
```

4) To run your app after downloads, provide the command as arguments to the container. Example (replace with your start command):

```pwsh
docker run --rm -e FAISS_INDEX_URL=... -e FAISS_JSON_URL=... donation-downloader:local yarn start
```

Notes:
- The downloader retries and streams the download to avoid large memory use.
- We intentionally download at container start (not during build) so Railway's build-time network timeout won't affect fetching large files.
