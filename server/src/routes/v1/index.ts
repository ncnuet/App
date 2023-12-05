import { Router } from 'express';
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";
import schema from "@/schema"

const router = Router();

router.use("/", StatusRouter)
router.use("/auth", AuthRouter)

export default router;