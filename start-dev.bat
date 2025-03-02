@echo off
echo 📦 Installation des dépendances...
call pnpm install

echo 🔧 Génération du client Prisma et initialisation de la base de données SQLite...
cd packages\database
call pnpm db:generate
call pnpm db:push
cd ..\..

echo ⚡ Démarrage de l'application frontend...
echo ⚡ Ouvrez une nouvelle fenêtre de terminal et exécutez `pnpm dev:api` pour démarrer le backend...

call pnpm dev:web
