FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

# Copy required files to install dependencies
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY packages/config/package.json ./packages/config/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder phase
FROM base AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

# Copy from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules
COPY --from=deps /app/apps/*/node_modules ./apps/*/node_modules

# Copy all other files
COPY . .

# Generate Prisma client
RUN pnpm --filter @cryptopredict/database db:generate

# Build all packages and apps
RUN pnpm build

# Production stage for frontend (Next.js)
FROM base AS frontend
WORKDIR /app

# Environment setup
ENV NODE_ENV production

# Copy necessary files for Next.js
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/web/server.js"]

# Production stage for backend (NestJS)
FROM base AS backend
WORKDIR /app

# Environment setup
ENV NODE_ENV production

# Copy necessary files for NestJS
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 3001
ENV PORT 3001

CMD ["node", "apps/api/dist/main.js"]
