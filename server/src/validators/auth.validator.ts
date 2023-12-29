import { IQueryableUser } from "@/types/auth";
import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";

export interface ILoginByPassword {
    username: string,
    password: string
    remember?: boolean
}

export interface IRequestReset extends IQueryableUser { }

export interface IResetPassword {
    password: string,
    re_password: string
}

export default class AuthValidator extends BaseValidator {
    private static checkUsername(username: string) {
        this.checkUnd(username, false, "username", () => {
            if (username.length < 3 || username.length > 50)
                throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
        })
    }

    private static checkPassword(password: string) {
        this.checkUnd(password, false, "password", () => {
            if (!password || password.length < 8 || password.length > 50)
                throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
        })
    }

    private static checkRePassword(password: string, re_password: string) {
        if (re_password != password) {
            throw new InputError("Mật khẩu nhập lại cần giống mật khẩu", "re_password");
        }
    }

    static validateLoginPassword(data: ILoginByPassword) {
        this.checkUsername(data.username)
        this.checkPassword(data.password)
    }

    static validateRequestReset(data: IRequestReset) {
        data.username
            ? this.checkUsername(data.username)
            : this.checkEmail(data.email)
    }

    static validateReset(data: IResetPassword) {
        this.checkPassword(data.password)
        this.checkRePassword(data.password, data.re_password);
    }
}