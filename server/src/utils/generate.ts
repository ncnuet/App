import { sign } from "jsonwebtoken";
import config from "@/configs/env";
import { JWTTokenOpt, JWTRefreshOpt, JWTResetOpt } from "@/configs/jwt";
import { IUser } from "@/types/auth";

interface IUserPayload extends IUser {
    iat?: number
    exp?: number
}

function generateMinMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generate_uid(length: number = 8): string {
    length = (length > 0) ? length : 8;

    return [...new Array(length)].map(() => generateMinMax(0, 9).toString()).join("");
}

export function generateToken(user: IUserPayload, gen_RT?: boolean) {
    const { iat, exp, ...data } = user as IUserPayload;

    const accessToken = sign(data, config.JWT_KEY, JWTTokenOpt);
    const refreshToken = gen_RT && sign(data, config.JWT_REFRESH_KEY, JWTRefreshOpt)

    return { accessToken, refreshToken }
}

export function generateResetToken(user: IUserPayload) {
    const { iat, exp, ...data } = user as IUserPayload;
    return sign(data, config.JWT_RESET_KEY, JWTResetOpt);
}