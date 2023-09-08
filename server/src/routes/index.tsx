import { Express } from 'express';
import ProfileRouter from "./profile.route";
import StatusRouter from "./status.route";
import AuthRouter from "./auth.route";

export default function route(app: Express) {
    app.use("/", StatusRouter)
    app.use("/auth", AuthRouter)
    app.use("/profile", ProfileRouter)
}