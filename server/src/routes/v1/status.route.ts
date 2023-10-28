import express, { Router } from 'express'
import Status from "@/controllers/status.controller"

const router: Router = express.Router();

router.get('/', Status.getStatus);

export default router;