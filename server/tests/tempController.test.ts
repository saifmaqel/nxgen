import express, { type Request, type Response } from "express";
import { prismaMock } from "./singleton.js";
import {
  addDeviceTemp,
  getDeviceTempInRange,
} from "../controllers/deviceTempControllers.js";
import { describe, beforeEach, jest, it, expect } from "@jest/globals";
import "./singleton.js";

describe("Temperature Controller (unit)", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("addDeviceTemp", () => {
    it("should return 400 if device id is invalid", async () => {
      req.params = { id: "abc" };

      await addDeviceTemp(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid device ID." });
    });

    it("should return 404 if device not found", async () => {
      req.params = { id: "1" };
      req.body = { timestamp: "2025-01-01", value: 20 };
      prismaMock.device.findUnique.mockResolvedValue(null);

      await addDeviceTemp(req as Request, res as Response);

      expect(prismaMock.device.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Device not found." });
    });

    it("should create a temperature record", async () => {
      req.params = { id: "2" };
      req.body = { timestamp: "2025-01-01", value: 22.2 };

      prismaMock.device.findUnique.mockResolvedValue({
        id: 2,
        name: "X",
        createdAt: new Date(),
      });

      const fakeTemp = {
        id: 10,
        deviceId: 2,
        timestamp: new Date("2025-01-01"),
        value: 22.2,
      };

      prismaMock.temperature.create.mockResolvedValue(fakeTemp);

      await addDeviceTemp(req as Request, res as Response);

      expect(prismaMock.temperature.create).toHaveBeenCalledWith({
        data: {
          deviceId: 2,
          timestamp: new Date("2025-01-01"),
          value: 22.2,
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ data: fakeTemp });
    });
  });

  describe("getDeviceTempInRange", () => {
    it("should return 400 if from or to is missing / invalid", async () => {
      req.params = { id: "1" };
      req.body = { from: "invalid-date", to: "2025-01-01" };

      await getDeviceTempInRange(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body parameter 'from' is required and must be a valid date.",
      });
    });

    it("should return 404 if device not found", async () => {
      req.params = { id: "5" };
      req.body = { from: "2025-01-01", to: "2025-01-01" };
      prismaMock.device.findUnique.mockResolvedValue(null);

      await getDeviceTempInRange(req as Request, res as Response);

      expect(prismaMock.device.findUnique).toHaveBeenCalledWith({
        where: { id: 5 },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Device not found." });
    });

    it("should return readings when valid", async () => {
      req.params = { id: "5" };
      req.body = { from: "2025-01-01", to: "2025-01-02" };
      prismaMock.device.findUnique.mockResolvedValue({
        id: 5,
        name: "D",
        createdAt: new Date(),
      });
      const fakeReadings = [
        {
          id: 1,
          deviceId: 5,
          timestamp: new Date("2025-01-01"),
          value: 21,
        },
        {
          id: 2,
          deviceId: 5,
          timestamp: new Date("2025-01-01"),
          value: 22,
        },
      ];
      prismaMock.temperature.findMany.mockResolvedValue(fakeReadings);

      await getDeviceTempInRange(req as Request, res as Response);

      expect(prismaMock.temperature.findMany).toHaveBeenCalledWith({
        where: {
          deviceId: 5,
          timestamp: {
            gte: new Date("2025-01-01"),
            lte: new Date("2025-01-02"),
          },
        },
        orderBy: {
          timestamp: "asc",
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: fakeReadings });
    });
  });
});
