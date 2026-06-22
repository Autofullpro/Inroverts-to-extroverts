#!/bin/bash
set -e
echo "backend/.env faylini yaratish uchun ma'lumotlarni kiriting."
read -p "GEMINI API URL (masalan https://... ) : " GEMINI_API_URL
read -s -p "GEMINI API KEY: " GEMINI_API_KEY
echo
read -p "DEEPSEEK API URL (yoki bo'sh): " DEEPSEEK_API_URL
read -s -p "DEEPSEEK API KEY (yoki bo'sh): " DEEPSEEK_API_KEY
echo
read -s -p "HUGGINGFACE API KEY (yoki bo'sh): " HF_API_KEY
echo
read -p "HUGGINGFACE MODEL (default gpt2): " HF_TEXT_MODEL
HF_TEXT_MODEL=${HF_TEXT_MODEL:-gpt2}
read -p "PORT (default 4000): " PORT
PORT=${PORT:-4000}

cat > .env <<EOL
GEMINI_API_URL=${GEMINI_API_URL}
GEMINI_API_KEY=${GEMINI_API_KEY}
DEEPSEEK_API_URL=${DEEPSEEK_API_URL}
DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
HF_API_KEY=${HF_API_KEY}
HF_TEXT_MODEL=${HF_TEXT_MODEL}
PORT=${PORT}
EOL

echo "backend/.env yaratildi. Iltimos .gitignore ga qo'shganingizga ishonch hosil qiling."
