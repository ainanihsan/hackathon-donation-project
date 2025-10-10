FROM node:18-slim

WORKDIR /app

# Install minimal packages: python3 and pip so the downloader can run
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy downloader and entrypoint
COPY download_assets.py /app/download_assets.py
COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

# Install python runtime deps for downloader
RUN pip3 install --no-cache-dir requests

# Keep the node environment available for any npm/yarn commands
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

ENTRYPOINT ["/app/start.sh"]

# Default: keep container alive. Override CMD with your app start command when deploying.
CMD []
