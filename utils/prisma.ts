import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function run(query: (client: PrismaClient) => Promise<any>): Promise<any> {
  let data: any;
  try {
    data = await query(prisma);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  return data;
}

function generateRandomHash(bytes: number = 4): string {
  return crypto.randomBytes(bytes).toString('hex');
}

export async function createURLBinding(url: string): Promise<string> {
  const newBinding = await run(async (prisma: PrismaClient) => {
    return prisma.binding.create({
      data: {
        hash: generateRandomHash(),
        longURL: url,
      },
    });
  });
  return newBinding.hash;
}

export async function fetchLongURL(hash: string): Promise<string> {
  const binding = await run(async (prisma: PrismaClient) => {
    return prisma.binding.findUnique({
      where: {
        hash,
      },
    });
  });
  return binding.longURL;
}
