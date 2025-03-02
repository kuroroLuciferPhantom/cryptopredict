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

## Installation et démarrage

```bash
# Cloner le repository
git clone https://github.com/kuroroLuciferPhantom/cryptopredict.git
cd cryptopredict

# Installer les dépendances
pnpm install

# Lancer le développement
pnpm dev
```

## Documentation

Documentation détaillée disponible dans le dossier `docs/`.

## License

MIT
