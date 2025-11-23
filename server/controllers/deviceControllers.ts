import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";

/**
 * POST /devices
 * Body: { name: string }
 */
export const addDevice = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        message: "Device name is required.",
      });
    }

    const existing = await prisma.device.findFirst({
      where: { name },
    });

    if (existing) {
      return res.status(409).json({
        message: "A device already exists.",
      });
    }

    const device = await prisma.device.create({
      data: { name: name.trim() },
    });

    return res.status(201).json({
      data: device,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET /devices
 */
export const listDevices = async (_req: Request, res: Response) => {
  try {
    const devices = await prisma.device.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: devices,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
