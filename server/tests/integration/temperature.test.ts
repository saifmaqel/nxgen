// import request from "supertest";
// import { describe, beforeEach, afterAll, test, expect } from "@jest/globals";
// import { app } from "../../server.ts";
// import {
//   cleanupTestData,
//   createTestDevice,
//   createTestTemperature,
// } from "../setup.ts";

// describe("Temperature API Integration Tests", () => {
//   let testDevice: any;

//   beforeEach(async () => {
//     await cleanupTestData();
//     testDevice = await createTestDevice("Temperature Test Sensor");
//   });

//   afterAll(async () => {
//     await cleanupTestData();
//   });

//   describe("POST /devices/:id/data", () => {
//     test("should add temperature reading for valid device", async () => {
//       const response = await request(app)
//         .post(`/devices/${testDevice.id}/data`)
//         .send({
//           timestamp: "2025-01-15T10:00:00Z",
//           value: 22.5,
//         })
//         .expect(201);

//       expect(response.body.data).toHaveProperty("id");
//       expect(response.body.data.deviceId).toBe(testDevice.id);
//       expect(response.body.data.value).toBe(22.5);
//     });

//     test("should return 400 for invalid device ID", async () => {
//       const response = await request(app)
//         .post("/devices/invalid/data")
//         .send({
//           timestamp: "2025-01-15T10:00:00Z",
//           value: 22.5,
//         })
//         .expect(400);

//       expect(response.body.message).toBe("Invalid device ID.");
//     });

//     test("should return 404 for non-existent device", async () => {
//       const response = await request(app)
//         .post("/devices/99999/data")
//         .send({
//           timestamp: "2025-01-15T10:00:00Z",
//           value: 22.5,
//         })
//         .expect(404);

//       expect(response.body.message).toBe("Device not found.");
//     });

//     test("should return 400 for invalid timestamp", async () => {
//       const response = await request(app)
//         .post(`/devices/${testDevice.id}/data`)
//         .send({
//           timestamp: "invalid-date",
//           value: 22.5,
//         })
//         .expect(400);

//       expect(response.body.message).toBe("Valid timestamp is required.");
//     });

//     test("should return 400 for invalid temperature value", async () => {
//       const response = await request(app)
//         .post(`/devices/${testDevice.id}/data`)
//         .send({
//           timestamp: "2025-01-15T10:00:00Z",
//           value: "not-a-number",
//         })
//         .expect(400);

//       expect(response.body.message).toBe("Temperature must be a valid number.");
//     });
//   });

//   describe("GET /devices/:id/data", () => {
//     beforeEach(async () => {
//       // Create test temperature readings
//       await createTestTemperature(
//         testDevice.id,
//         new Date("2025-01-10T10:00:00Z"),
//         20.0
//       );
//       await createTestTemperature(
//         testDevice.id,
//         new Date("2025-01-15T10:00:00Z"),
//         22.5
//       );
//       await createTestTemperature(
//         testDevice.id,
//         new Date("2025-01-20T10:00:00Z"),
//         25.0
//       );
//     });

//     test("should return temperature readings in date range", async () => {
//       const response = await request(app)
//         .get(`/devices/${testDevice.id}/data`)
//         .query({
//           from: "2025-01-12T00:00:00Z",
//           to: "2025-01-18T00:00:00Z",
//         })
//         .expect(200);

//       expect(response.body.data).toHaveLength(1);
//       expect(response.body.data[0].value).toBe(22.5);
//     });

//     test("should return all readings when range includes all", async () => {
//       const response = await request(app)
//         .get(`/devices/${testDevice.id}/data`)
//         .query({
//           from: "2025-01-01T00:00:00Z",
//           to: "2025-01-31T00:00:00Z",
//         })
//         .expect(200);

//       expect(response.body.data).toHaveLength(3);
//       expect(response.body.data[0].value).toBe(20.0); // Ordered by timestamp asc
//       expect(response.body.data[2].value).toBe(25.0);
//     });

//     test("should return empty array when no readings in range", async () => {
//       const response = await request(app)
//         .get(`/devices/${testDevice.id}/data`)
//         .query({
//           from: "2025-02-01T00:00:00Z",
//           to: "2025-02-28T00:00:00Z",
//         })
//         .expect(200);

//       expect(response.body.data).toHaveLength(0);
//     });

//     test("should return 400 for invalid from date", async () => {
//       const response = await request(app)
//         .get(`/devices/${testDevice.id}/data`)
//         .query({
//           from: "invalid-date",
//           to: "2025-01-31T00:00:00Z",
//         })
//         .expect(400);

//       expect(response.body.message).toContain("'from'");
//     });

//     test("should return 400 for invalid to date", async () => {
//       const response = await request(app)
//         .get(`/devices/${testDevice.id}/data`)
//         .query({
//           from: "2025-01-01T00:00:00Z",
//           to: "invalid-date",
//         })
//         .expect(400);

//       expect(response.body.message).toContain("'to'");
//     });

//     test("should return 404 for non-existent device", async () => {
//       const response = await request(app)
//         .get("/devices/99999/data")
//         .query({
//           from: "2025-01-01T00:00:00Z",
//           to: "2025-01-31T00:00:00Z",
//         })
//         .expect(404);

//       expect(response.body.message).toBe("Device not found.");
//     });
//   });
// });
