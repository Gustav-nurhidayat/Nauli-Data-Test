#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LAB_USER="analyst"
LAB_PASSWORD="blue_team_rocks"
SSH_PORT="2275"

echo "[+] Provisioning SCENARIO75 Cyber Range Lab..."

if ! id "$LAB_USER" >/dev/null 2>&1; then
    sudo useradd -m -s /bin/bash "$LAB_USER"
fi

echo "$LAB_USER:$LAB_PASSWORD" | sudo chpasswd
sudo usermod -aG sudo "$LAB_USER"

if ! sudo grep -qE '^[[:space:]]*Port[[:space:]]+2275$' /etc/ssh/sshd_config; then
    echo "Port $SSH_PORT" | sudo tee -a /etc/ssh/sshd_config >/dev/null
fi

sudo sshd -t
sudo systemctl enable ssh
sudo systemctl restart ssh

sudo mkdir -p /opt/admin/logs

sudo install -m 0644 \
    "$PROJECT_DIR/backend-centa/lab/logs/access.log" \
    /opt/admin/logs/access.log

sudo install -m 0644 \
    "$PROJECT_DIR/backend-centa/lab/logs/error.log" \
    /opt/admin/logs/error.log

if ! command -v docker >/dev/null 2>&1; then
    echo "[!] Docker is not installed."
    exit 1
fi

cd "$PROJECT_DIR"

docker compose up -d --build

echo
echo "[+] Lab provisioning complete."
echo
echo "    Web/API : http://<VM-IP>:3075"
echo "    SSH     : ssh -p 2275 analyst@<VM-IP>"
echo "    User    : analyst"
echo "    Password: blue_team_rocks"
echo
echo "    Logs:"
echo "      /opt/admin/logs/access.log"
echo "      /opt/admin/logs/error.log"
echo
echo "[+] Container status:"
docker compose ps