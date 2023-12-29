import StatisticController from "@/controllers/statistic.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.post('/', StatisticController.create);

export default router;