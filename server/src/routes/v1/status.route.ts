import express, { Router } from 'express'
import Status from "@/controllers/status.controller"

const router: Router = express.Router();

router.get('/', Status.getStatus);
router.post('/user', Status.getUser);
router.post('/token', Status.addToken);

export default router;