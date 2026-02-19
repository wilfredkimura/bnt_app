// DATABASE HELPER FILE
// PREVENTS ACCIDENTALLY OPENING HUNDREDS OF CONNECTIONS TO MY DB HENCE CRASHING IT

// It checks if a connection already exists before making a new one
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Simple initialization for Prisma v6
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
