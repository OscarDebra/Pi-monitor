# Pi Monitor – Technical Setup Guide

## Overview
Pi Monitor is a self-hosted system monitoring dashboard running on a Raspberry Pi. It consists of two Docker containers — a Python FastAPI backend and a React frontend served by Nginx — communicating over a Docker bridge network.

## Requirements
- Raspberry Pi 3B+ or newer
- Ubuntu Server 24.04 LTS (64-bit)
- Docker and Docker Compose V2
- Git

## Installation

### 1. Install Docker
```bash
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```
Log out and back in, then verify:
```bash
docker run hello-world
```

### 2. Clone the repository
```bash
git clone https://github.com/oscardebra/pi-monitor.git
cd pi-monitor
```

### 3. Generate SSL certificate
```bash
mkdir -p frontend/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout frontend/certs/key.pem \
  -out frontend/certs/cert.pem \
  -subj "/CN=pimonitor.local"
```

### 4. Create authentication credentials
```bash
sudo apt install apache2-utils -y
mkdir -p frontend/auth
htpasswd -c frontend/auth/.htpasswd yourusername
```

### 5. Start the containers
```bash
docker compose up -d
```

The dashboard is now available at `https://pimonitor.local`.

## Architecture
```
[ Browser ] → [ Nginx container :443 ] → [ FastAPI container :8000 ] → [ Pi OS /proc /sys ]
```

- **Frontend**: React app served by Nginx on port 443 (HTTPS)
- **Backend**: FastAPI reading system stats via psutil, exposed on port 8000
- **Network**: Docker bridge network — containers communicate by name

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/stats` | GET | Returns CPU, RAM, disk and network stats |

## Development Workflow
The React app is built on a development machine and committed to the repository. The Pi never runs `npm install` or `npm run build`.
```bash
# On your development machine
cd frontend
npm run build
cd ..
git add -f frontend/build
git commit -m "update build"
git push

# On the Pi
git pull
docker compose up --build -d
```

## Stopping and starting
```bash
# Stop
docker compose down

# Start
docker compose up -d

# Restart
docker compose restart
```
