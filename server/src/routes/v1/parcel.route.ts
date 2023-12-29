import ParcelController from "@/controllers/parcel.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import express, { Router } from "express";

const router: Router = express.Router();

router.post(
  "/",
  [checkJWT, checkRole.bind({ role: ["gathe_staf", "admin", "trans_staf"] })],
  ParcelController.create
);

router.delete(
  "/:id",
  [checkJWT, checkRole.bind({ role: ["gathe_staf", "admin"] })],
  ParcelController.delete
);

router.put(
  "/:id",
  [checkJWT, checkRole.bind({ role: ["gathe_staf", "admin"] })],
  ParcelController.update
);

router.post(
  "/:id",
  [checkJWT, checkRole.bind({ role: ["trans_staf", "admin"] })],
  ParcelController.updateStatus
);

router.get(
  "/",
  [checkJWT, checkRole.bind({ role: ["gathe_staf", "admin", "trans_staf"] })],
  ParcelController.getAllParcelFormOffice
);

export default router;
