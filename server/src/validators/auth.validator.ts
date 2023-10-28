import { InputError } from "@/types/controller";

export interface ILoginByPassword {
    username: string,
    password: string
}

class AuthValidator {
    validateLoginPassword(data: ILoginByPassword) {
        if (!data.username || data.username.length < 3 || data.username.length > 50)
            throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
        if (!data.password || data.password.length < 8 || data.password.length > 50)
            throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
    }
}

export default new AuthValidator();