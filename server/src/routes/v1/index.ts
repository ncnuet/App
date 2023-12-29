import { Router } from 'express';
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";
import OfficeRouter from "./office.route";
import ParcelRouter from "./parcel.route";
import FormRouter from "./form.route";
import StatisticRouter from "./statistic.route";

const router = Router();

router.use("/", StatusRouter)
router.use("/auth", AuthRouter)
router.use("/office", OfficeRouter)
router.use("/parcel", ParcelRouter)
router.use("/form", FormRouter)
router.use("/statistic", StatisticRouter)

export default router;