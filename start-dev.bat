@echo off
echo 📦 Installation des dépendances...
call pnpm install

echo 🔧 Génération du client Prisma et initialisation de la base de données SQLite...
cd packages\database
call pnpm db:generate
call pnpm db:push
cd ..\..

echo ⚡ Démarrage du projet en mode développement...
call pnpm dev
