// @ts-ignore - Le client sera généré après l'installation
import { PrismaClient } from '@prisma/client';

// @ts-ignore - Le client sera généré après l'installation
export * from '@prisma/client';

// Variable globale pour le client Prisma
let prisma: PrismaClient;

// Initialisation du client Prisma
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['error'],
    });
  }
  return prisma;
}

// Exporter une instance du client
export const db = getPrismaClient();
