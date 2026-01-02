#!/bin/bash
# npx json-server --watch server/db.json --port 5000

# 1. Khai báo các biến 
IP_AZURE="172.188.96.46"
USER_AZURE="azureuser"
KEY_PATH="./reactweb_key.pem"
REMOTE_DIR="/home/azureuser/react-app"

echo "--- Đang nén và gửi dữ liệu lên Azure ---"

# 2. Gửi file lên Azure (Loại bỏ node_modules để gửi cho nhanh)
scp -i $KEY_PATH -r ./docker-compose.yml ./Dockerfile ./package*.json server/db.json ./index.html ./vite.config.js ./src ./public $USER_AZURE@$IP_AZURE:$REMOTE_DIR

echo "--- Đã upload xong! Đang kết nối để chạy Docker ---"

# 3. SSH vào và thực hiện lệnh chạy Docker
ssh -i $KEY_PATH $USER_AZURE@$IP_AZURE << 'EOF'
    cd /home/azureuser/react-app
    sudo docker compose down
    sudo docker compose up --build -d
EOF