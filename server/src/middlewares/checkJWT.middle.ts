import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env";
import { JWTPayload } from "@/types/auth";

export function checkJWT(req: Request, res: Response, next: NextFunction) {
    const authClient = req.headers['authorization'];
    const token1 = authClient && authClient.split(' ')[1]

    //TODO: save in cookie
    // const token = req.cookies.access_token;

    const token = token1;
    if (!token) return res.sendStatus(401);

    //Try to validate the token and get data
    let JWTPayload;
    try {
        console.log(this);

        JWTPayload = <JWTPayload>jwt.verify(
            token,
            this && this.type === "reset"
                ? config.JWT_RESET_KEY
                : config.JWT_KEY);

        console.log(JWTPayload);

        // if valid, pass resolve data to local response and continue processing.
        res.locals.JWTPayload = JWTPayload;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
}