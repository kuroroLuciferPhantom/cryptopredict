@echo off
echo 🚀 Démarrage des services Docker...
docker-compose up -d

echo 📦 Installation des dépendances...
call pnpm install

echo 🔧 Génération du client Prisma...
cd packages\database
call pnpm db:generate

echo 🛠️ Initialisation de la base de données...
call pnpm db:push
cd ..\..

echo ⚡ Démarrage du projet en mode développement...
call pnpm dev
