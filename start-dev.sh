#!/bin/bash

echo "📦 Installation des dépendances..."
pnpm install

echo "🔧 Génération du client Prisma et initialisation de la base de données SQLite..."
cd packages/database
pnpm db:generate
pnpm db:push
cd ../..

echo "⚡ Démarrage du projet en mode développement..."
pnpm dev
