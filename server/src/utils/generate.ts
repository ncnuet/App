import * as jwt from "jsonwebtoken";
import config from "@/configs/config_env";
import { JWTOpt, JWTRefreshOpt } from "@/configs/jwt";

function generateMinMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generate_uid(length: number = 6): string {
    length = (length > 0) ? length : 6;

    return [...new Array(length)].map(() => generateMinMax(0, 9).toString()).join("");
}

export function generate_token(unencryptedData: any, gen_RT?: boolean) {
    const accessToken = jwt.sign(unencryptedData, config.JWT_KEY, JWTOpt);
    const refreshToken = (gen_RT) ? jwt.sign(unencryptedData, config.JWT_REFRESH_KEY, JWTRefreshOpt) : undefined;

    return { accessToken, refreshToken }
}

export function generate_password(length: number = 8): string {
    length = (length > 0) ? length : 8;

    const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const password: string[] = [];

    return [...new Array(length)].map(() => base[generateMinMax(0, base.length - 1)]).join("");
}