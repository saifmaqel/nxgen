import { prisma } from "../lib/prisma.ts";

export async function cleanupTestData() {
  await prisma.$executeRaw`TRUNCATE TABLE temperature CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE devices CASCADE`;
}

export async function createTestDevice(name: string) {
  return await prisma.device.create({
    data: { name },
  });
}

export async function createTestTemperature(
  deviceId: number,
  timestamp: Date,
  value: number
) {
  return await prisma.temperature.create({
    data: {
      deviceId,
      timestamp,
      value,
    },
  });
}
