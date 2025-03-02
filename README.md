# CryptoPredict

CryptoPredict est un jeu de cartes stratégique basé sur la prédiction des prix de cryptomonnaies. Les joueurs collectionnent des cartes représentant différentes cryptomonnaies, font des prédictions sur l'évolution de leurs prix, et sont récompensés en fonction de la précision de leurs prédictions.

## Vision du Projet

Le projet est développé en deux phases principales :

### Phase 1 - Jeu Traditionnel
- Système de cartes avec différentes raretés et puissances
- Multiples modes de jeu (Classique, Stabilité, Meme Coins)
- Système de ligues et classements
- Marketplace interne avec monnaie virtuelle

### Phase 2 - Intégration Web3
- Cartes converties en NFTs sur la blockchain Base
- Marketplace blockchain
- Intégration wallet (connexion Web3)
- Cartes NFT spéciales avec bonus

## Architecture Technique

Le projet utilise une architecture moderne et scalable :

- **Structure** : Monorepo avec Turborepo
- **Frontend** : Next.js 14+ avec TypeScript et Shadcn/ui
- **Backend** : NestJS avec architecture microservices
- **Base de données** : PostgreSQL (données relationnelles) et MongoDB (données non structurées)
- **Caching** : Redis
- **Infrastructure** : Docker, CI/CD avec GitHub Actions

## Structure du Projet

Le projet est organisé en modules :
- **apps/web** : Application frontend Next.js
- **apps/api** : API backend NestJS
- **packages/ui** : Composants UI partagés
- **packages/database** : Configuration et schémas de base de données
- **packages/config** : Configurations partagées (ESLint, TypeScript, etc.)

## Prérequis

Pour exécuter ce projet, vous devez avoir installé :

- **Node.js** (version 20+)
- **pnpm** (version 8.9.0 ou plus récente)
- **Docker** et **Docker Compose**

## Installation et démarrage

### Méthode simple (recommandée)

**Pour Linux/Mac :**
```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Rendre le script exécutable
chmod +x start-dev.sh

# Lancer le script de démarrage
./start-dev.sh
```

**Pour Windows :**
```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Lancer le script de démarrage
start-dev.bat
```

### Méthode manuelle

```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Créer un fichier .env basé sur l'exemple
cp .env.example .env

# Lancer les services Docker
docker-compose up -d

# Installer les dépendances
pnpm install

# Générer le client Prisma
cd packages/database
pnpm db:generate
pnpm db:push
cd ../..

# Lancer le développement
pnpm dev
```

## Accès aux applications

Une fois le projet démarré, vous pouvez y accéder via :

- **Frontend** : http://localhost:3000
- **API** : http://localhost:3001
- **API Documentation** : http://localhost:3001/api/docs

## Pages principales

- **Accueil** : http://localhost:3000
- **Jeu** : http://localhost:3000/game
- **Marketplace** : http://localhost:3000/marketplace
- **Profil** : http://localhost:3000/profile
- **Classement** : http://localhost:3000/leaderboard

## Dépannage

Si vous rencontrez des problèmes lors du démarrage :

1. Vérifiez que Docker est en cours d'exécution
2. Assurez-vous que les ports 3000, 3001, 5432, 27017 et 6379 sont disponibles
3. Vérifiez les logs Docker : `docker-compose logs`
4. Réinitialisez l'environnement : `pnpm clean && docker-compose down -v` puis redémarrez

## License

MIT
