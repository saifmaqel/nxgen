import express, { type Request, type Response } from "express";
import { prismaMock } from "./singleton.js";
import { addDevice, listDevices } from "../controllers/deviceControllers.js";
import { describe, beforeEach, jest, test, expect, it } from "@jest/globals";
import "./singleton.js";
describe("Device Controller (unit)", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
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
      name: "X",
      createdAt: new Date(),
    });

    await addDevice(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "A device already exists.",
    });
  });

  it("should list devices", async () => {
    const fakeDevices = [
      { id: 1, name: "Sensor A", createdAt: new Date() },
      { id: 2, name: "Sensor B", createdAt: new Date() },
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
