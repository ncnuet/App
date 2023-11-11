import { Router } from 'express';
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";
import { graphqlHTTP } from "express-graphql"
import schema from "@/schema"

const router = Router();

router.use("/", StatusRouter)
router.use("/auth", AuthRouter)

export default router;