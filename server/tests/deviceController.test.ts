import type { Request, Response } from "express";
import { describe, beforeEach, jest, test, expect, it } from "@jest/globals";
import { mockDeep, mockReset } from "jest-mock-extended";
import { PrismaClient } from "../generated/prisma/client.ts";

const prismaMock = mockDeep<PrismaClient>();

jest.mock("../lib/prisma.ts", () => ({
  prisma: prismaMock,
}));

import { addDevice, listDevices } from "../controllers/deviceControllers.ts";

describe("Device Controller (unit)", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn().mockReturnThis() as any,
    };
    mockReset(prismaMock);
  });

  test("should list devices", async () => {
    const fakeDevices = [
      { id: 1, name: "Sensor A", createdAt: new Date("2025-01-01") },
    ];
    prismaMock.device.findMany.mockResolvedValue(fakeDevices);

    await listDevices(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: fakeDevices });
  });

  it("should create a new device", async () => {
    req.body = { name: "Sensor A" };
    const fakeDevice = { id: 1, name: "Sensor A", createdAt: new Date() };
    prismaMock.device.create.mockResolvedValue(fakeDevice);
    prismaMock.device.findFirst.mockResolvedValue(null);

    await addDevice(req as Request, res as Response);

    expect(prismaMock.device.create).toHaveBeenCalledWith({
      data: { name: "Sensor A" },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: fakeDevice });
  });

  test("should return 400 if device name missing", async () => {
    req.body = { name: "" };

    await addDevice(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Device name is required.",
    });
  });

  test("should return 409 if device already exists", async () => {
    req.body = { name: "Sensor A" };
    prismaMock.device.findFirst.mockResolvedValue({
      id: 1,
      name: "Sensor A",
      createdAt: new Date(),
    });

    await addDevice(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "A device already exists.",
    });
  });

  it("should list multiple devices in descending order", async () => {
    const fakeDevices = [
      { id: 2, name: "Sensor B", createdAt: new Date("2025-01-02") },
      { id: 1, name: "Sensor A", createdAt: new Date("2025-01-01") },
    ];
    prismaMock.device.findMany.mockResolvedValue(fakeDevices);

    await listDevices({} as Request, res as Response);

    expect(prismaMock.device.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: fakeDevices });
  });
});
