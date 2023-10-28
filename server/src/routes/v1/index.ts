import { Router } from 'express';
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";

const router = Router();

router.use("/", StatusRouter)
router.use("/auth", AuthRouter)

export default router;