import { InputError } from "@/types/controller";

export interface ILoginByPassword {
    username: string,
    password: string
}

export interface IRequestReset {
    username: string
}

class AuthValidator {
    private validateUsername(username: string) {
        if (!username || username.length < 3 || username.length > 50)
            throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
    }

    private validatePassword(password: string) {
        if (!password || password.length < 8 || password.length > 50)
            throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
    }

    validateLoginPassword(data: ILoginByPassword) {
        this.validateUsername(data.username)
        this.validatePassword(data.password)
    }

    validateRequestReset(data: IRequestReset) {
        this.validateUsername(data.username)
    }
}

export default new AuthValidator();