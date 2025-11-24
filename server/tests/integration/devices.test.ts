import request from "supertest";
import { describe, beforeEach, afterAll, test, expect } from "@jest/globals";
import { app } from "../../server.ts";
import { cleanupTestData, createTestDevice } from "../setup.ts";

describe("Device API Integration Tests", () => {
  // Clean up before each test
  beforeEach(async () => {
    await cleanupTestData();
  });

  // Clean up after all tests
  afterAll(async () => {
    await cleanupTestData();
  });

  describe("POST /devices", () => {
    test("should create a new device", async () => {
      const response = await request(app)
        .post("/devices")
        .send({ name: "Test Sensor A" })
        .expect(201);

      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe("Test Sensor A");
      expect(response.body.data).toHaveProperty("createdAt");
    });

    test("should return 400 if device name is missing", async () => {
      const response = await request(app)
        .post("/devices")
        .send({ name: "" })
        .expect(400);

      expect(response.body.message).toBe("Device name is required.");
    });

    test("should return 409 if device already exists", async () => {
      // Create first device
      await request(app).post("/devices").send({ name: "Duplicate Sensor" });

      // Try to create duplicate
      const response = await request(app)
        .post("/devices")
        .send({ name: "Duplicate Sensor" })
        .expect(409);

      expect(response.body.message).toBe("A device already exists.");
    });
  });

  describe("GET /devices", () => {
    test("should return empty array when no devices exist", async () => {
      const response = await request(app).get("/devices").expect(200);

      expect(response.body.data).toEqual([]);
    });

    test("should return all devices", async () => {
      // Create test devices
      await createTestDevice("Sensor A");
      await createTestDevice("Sensor B");

      const response = await request(app).get("/devices").expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].name).toBe("Sensor B"); // Most recent first
      expect(response.body.data[1].name).toBe("Sensor A");
    });

    test("should return devices ordered by creation date (desc)", async () => {
      // Create devices in order
      const device1 = await createTestDevice("First Device");
      const device2 = await createTestDevice("Second Device");

      const response = await request(app).get("/devices").expect(200);

      expect(response.body.data[0].id).toBe(device2.id);
      expect(response.body.data[1].id).toBe(device1.id);
    });
  });
});
