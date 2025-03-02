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
- **Base de données** : SQLite (en développement), PostgreSQL (en production)
- **Infrastructure** : Docker, CI/CD avec GitHub Actions
- **Web3** : Wagmi, Viem, ConnectKit pour l'intégration des wallets

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

## Installation et démarrage

### Pour Windows

#### Étape 1 : Installation et configuration initiale

```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Lancer le script de démarrage principal (installe les dépendances et démarre le frontend)
start-dev.bat
```

#### Étape 2 : Démarrer l'API backend (dans une nouvelle fenêtre de terminal)

```bash
# Dans un nouveau terminal, à la racine du projet
start-api.bat
```

### Pour Linux/Mac

```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Rendre les scripts exécutables
chmod +x start-dev.sh

# Lancer le script de démarrage
./start-dev.sh

# Dans un autre terminal
pnpm dev:api
```

### Méthode manuelle

```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Installer les dépendances
pnpm install

# Générer le client Prisma et initialiser la base de données
cd packages/database
pnpm db:generate
pnpm db:push
cd ../..

# Lancer le frontend (dans un terminal)
pnpm dev:web

# Lancer le backend (dans un autre terminal)
pnpm dev:api
```

## Configuration Web3 (Phase 2)

Pour utiliser les fonctionnalités Web3 (connexion wallet) :

1. Copiez le fichier `.env.example` en `.env.local` à la racine du projet
2. Obtenez un ID de projet WalletConnect sur [WalletConnect Cloud](https://cloud.walletconnect.com/)
3. Ajoutez votre ID dans le fichier `.env.local` :
   ```
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=votre_id_de_projet
   ```
4. Redémarrez l'application

## Base de données

Le projet utilise SQLite en développement pour faciliter la prise en main sans nécessiter l'installation de services externes. La base de données est automatiquement créée lors de l'exécution de `pnpm db:push` et est stockée dans le fichier `packages/database/prisma/dev.db`.

## Accès aux applications

Une fois le projet démarré, vous pouvez y accéder via :

- **Frontend** : http://localhost:3000
- **API** : http://localhost:3001

## Pages principales

- **Accueil** : http://localhost:3000
- **Jeu** : http://localhost:3000/game
- **Marketplace** : http://localhost:3000/marketplace
- **Profil** : http://localhost:3000/profile
- **Classement** : http://localhost:3000/leaderboard
- **Exemple Wallet** : http://localhost:3000/wallet-example

## Dépannage

Si vous rencontrez des problèmes :

1. Vérifiez que Node.js est bien installé et à jour (v20+)
2. Vérifiez que pnpm est installé : `npm install -g pnpm`
3. Assurez-vous que les ports 3000 et 3001 sont disponibles
4. Si la base de données pose problème, vous pouvez la réinitialiser en supprimant le fichier `packages/database/prisma/dev.db` et en exécutant à nouveau `pnpm db:push`
5. Assurez-vous de bien lancer le frontend et le backend dans des terminaux séparés

## License

MIT