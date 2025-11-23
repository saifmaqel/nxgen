import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";

/**
 * POST /devices/:id/data
 * Body: { timestamp: string | Date, value: number }
 */
export const addDeviceTemp = async (req: Request, res: Response) => {
  try {
    const deviceId = Number(req.params.id);
    const { timestamp, value } = req.body;

    if (isNaN(deviceId) || deviceId <= 0) {
      return res.status(400).json({
        message: "Invalid device ID.",
      });
    }

    if (!timestamp || isNaN(Date.parse(timestamp))) {
      return res.status(400).json({
        message: "Valid timestamp is required.",
      });
    }

    if (typeof value !== "number" || isNaN(value)) {
      return res.status(400).json({
        message: "Temperature must be a valid number.",
      });
    }

    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }

    const record = await prisma.temperature.create({
      data: {
        deviceId,
        timestamp: new Date(timestamp),
        value,
      },
    });

    return res.status(201).json({
      data: record,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET /devices/:id/data?from=...&to=...
 * Query: { "from": string, "to": string }
 */
export const getDeviceTempInRange = async (req: Request, res: Response) => {
  try {
    const deviceId = Number(req.params.id);
    const { from, to } = req.query;

    if (isNaN(deviceId) || deviceId <= 0) {
      return res.status(400).json({
        message: "Invalid device ID.",
      });
    }

    if (!from || isNaN(Date.parse(String(from)))) {
      return res.status(400).json({
        message: "Query parameter 'from' is required and must be a valid date.",
      });
    }

    if (!to || isNaN(Date.parse(String(to)))) {
      return res.status(400).json({
        message: "Query parameter 'to' is required and must be a valid date.",
      });
    }

    const fromDate = new Date(String(from));
    const toDate = new Date(String(to));

    if (fromDate > toDate) {
      return res.status(400).json({
        message: "'from' date must be earlier than 'to' date.",
      });
    }

    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }

    const readings = await prisma.temperature.findMany({
      where: {
        deviceId,
        timestamp: {
          gte: fromDate,
          lte: toDate,
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return res.status(200).json({
      data: readings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
