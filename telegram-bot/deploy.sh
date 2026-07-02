#!/bin/bash
# Скрипт установки бота на Ubuntu/Debian сервере

echo "=== Установка зависимостей ==="
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv fonts-dejavu

echo "=== Создание виртуального окружения ==="
python3 -m venv venv
source venv/bin/activate

echo "=== Установка Python пакетов ==="
pip install -r requirements.txt

echo "=== Готово! Запустите бота командой: ==="
echo "source venv/bin/activate && python bot.py"
