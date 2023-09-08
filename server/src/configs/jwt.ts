import * as jwt from "jsonwebtoken";

export const JWTOpt: jwt.SignOptions = {
    expiresIn: "1800s"
}
export const JWTRefreshOpt: jwt.SignOptions = {
    expiresIn: "86400s"
}
export const JWTResetOpt: jwt.SignOptions = {
    expiresIn: "180s"
}