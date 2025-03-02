@echo off
echo 📦 Installation des dépendances...
call pnpm install

echo 🔧 Génération du client Prisma et initialisation de la base de données SQLite...
cd packages\database
call pnpm db:generate
call pnpm db:push
cd ..\..

echo ⚡ Démarrage de l'application frontend...
echo.
echo ⚡ IMPORTANT : Ouvrez une nouvelle fenêtre de terminal et exécutez 'start-api.bat' pour démarrer le backend.
echo.

cd apps\web
call pnpm dev
