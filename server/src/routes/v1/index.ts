import { Router } from 'express';
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";
import OfficeRouter from "./office.route";

const router = Router();

router.use("/", StatusRouter)
router.use("/auth", AuthRouter)
router.use("/office", OfficeRouter)

export default router;