// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "../lib/prisma";

async function main() {
  // Create a couple of devices
  const device1 = await prisma.device.create({
    data: {
      name: "Sensor A",
    },
  });

  const device2 = await prisma.device.create({
    data: {
      name: "Sensor B",
    },
  });

  // Create some temperature data for these devices
  await prisma.temperature.createMany({
    data: [
      {
        deviceId: device1.id,
        timestamp: new Date("2025-11-20T10:00:00Z"),
        value: 22.5,
      },
      {
        deviceId: device1.id,
        timestamp: new Date("2025-11-20T11:00:00Z"),
        value: 23.1,
      },
      {
        deviceId: device2.id,
        timestamp: new Date("2025-11-20T10:30:00Z"),
        value: 19.8,
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
