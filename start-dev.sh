#!/bin/bash

# Vérifier si docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si docker-compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si pnpm est installé
if ! command -v pnpm &> /dev/null; then
    echo "pnpm n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

echo "🚀 Démarrage des services Docker..."
docker-compose up -d

echo "📦 Installation des dépendances..."
pnpm install

echo "🔧 Génération du client Prisma..."
cd packages/database
pnpm db:generate

echo "🛠️ Initialisation de la base de données..."
pnpm db:push
cd ../..

echo "⚡ Démarrage du projet en mode développement..."
pnpm dev
