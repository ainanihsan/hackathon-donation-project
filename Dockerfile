FROM python:3.11-slim

WORKDIR /app

# Install minimal packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy only what's needed
COPY download_assets.py /app/download_assets.py
COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

# Install runtime deps
RUN pip install --no-cache-dir requests

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

ENTRYPOINT ["/app/start.sh"]

# Default: keep container alive. Override CMD with your app start command when deploying.
CMD []
