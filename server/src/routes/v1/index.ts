import { Router } from 'express';
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";
import schema from "@/schema"
import FormRouter from "./form.route";

const router = Router();

router.use("/", StatusRouter)
router.use("/auth", AuthRouter)
router.use("/form", FormRouter)

export default router;