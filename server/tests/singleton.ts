import { jest, beforeEach } from "@jest/globals";
import { PrismaClient } from "../generated/prisma/client";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";

// 1️⃣ Create the DeepMock
const prismaMockInstance = mockDeep<PrismaClient>();

// 2️⃣ Mock the real prisma export
jest.mock("../lib/prisma", () => ({
  __esModule: true,
  prisma: prismaMockInstance,
  default: prismaMockInstance,
}));

// 3️⃣ Export mock for tests to use
export const prismaMock = prismaMockInstance as DeepMockProxy<PrismaClient>;

// 4️⃣ Reset mock between tests
beforeEach(() => {
  mockReset(prismaMock);
});
