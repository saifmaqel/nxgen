import { Router } from "express";
import {
  addDeviceTemp,
  getDeviceTempInRange,
} from "../controllers/deviceTempControllers.ts";

const router = Router();

router.post("/:id/data", addDeviceTemp);

router.get("/:id/data", getDeviceTempInRange);

export default router;
