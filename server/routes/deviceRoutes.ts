import { Router } from "express";
import { addDevice, listDevices } from "../controllers/deviceControllers.ts";

const router = Router();

// POST /devices
router.post("/", addDevice);

// GET /devices
router.get("/", listDevices);

export default router;
