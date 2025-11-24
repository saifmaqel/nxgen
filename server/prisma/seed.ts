// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "../lib/prisma";

async function main() {
  const device1 = await prisma.device.create({
    data: { name: "Living Room Sensor" },
  });

  const device2 = await prisma.device.create({
    data: { name: "Bedroom Sensor" },
  });

  const device3 = await prisma.device.create({
    data: { name: "Kitchen Sensor" },
  });

  const device4 = await prisma.device.create({
    data: { name: "Garage Sensor" },
  });

  const device5 = await prisma.device.create({
    data: { name: "Outdoor Sensor" },
  });

  const temperatureData = [];
  const now = new Date();

  const generateTemp = (baseTemp: number, variance: number) => {
    return baseTemp + (Math.random() * variance * 2 - variance);
  };

  for (let day = 0; day < 30; day++) {
    for (let hour = 0; hour < 24; hour += 2) {
      const timestamp = new Date(now);
      timestamp.setDate(timestamp.getDate() - day);
      timestamp.setHours(hour, 0, 0, 0);

      temperatureData.push({
        deviceId: device1.id,
        timestamp: new Date(timestamp),
        value: parseFloat(generateTemp(22, 2).toFixed(1)),
      });

      temperatureData.push({
        deviceId: device2.id,
        timestamp: new Date(timestamp),
        value: parseFloat(generateTemp(20, 1.5).toFixed(1)),
      });

      temperatureData.push({
        deviceId: device3.id,
        timestamp: new Date(timestamp),
        value: parseFloat(generateTemp(24, 3).toFixed(1)),
      });

      temperatureData.push({
        deviceId: device4.id,
        timestamp: new Date(timestamp),
        value: parseFloat(generateTemp(18, 4).toFixed(1)),
      });

      temperatureData.push({
        deviceId: device5.id,
        timestamp: new Date(timestamp),
        value: parseFloat(generateTemp(15, 6).toFixed(1)),
      });
    }
  }

  await prisma.temperature.createMany({
    data: temperatureData,
  });

  console.log(`Seeding finished.`);
  console.log(`Created ${5} devices`);
  console.log(`Created ${temperatureData.length} temperature readings`);
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
