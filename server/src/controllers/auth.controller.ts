import { Request, Response } from "@/types/controller"
import { setAge } from '@/configs/cookie';
import { generate_token } from '@/utils/generate';
import handleError from '@/utils/handle_error';
import authValidator, { ILoginByPassword } from "@/validators/auth.validator";
import authModel from '@/models/auth.model';
import tokenModel from "@/models/token.model";

function setToken(res: Response, accessToken: string, refreshToken?: string) {
    refreshToken && res.cookie("refresh_token", refreshToken, setAge(86400 * 1000))
    res
        .status(200)
        .cookie("token", accessToken, setAge(3600 * 1000))
        .json({ message: "success", data: { accessToken, refreshToken } })
        .send();
}

class AuthController {
    /**
     * Verify account, return access token and resfresh token if true.
     * @param req 
     * @param res 
     */
    async loginByPassword(req: Request, res: Response) {
        const data = <ILoginByPassword>req.body;
        console.log(data);

        await handleError(res, async () => {
            authValidator.validateLoginPassword(data);
            const user = await authModel.findAccountByPassword(data.username, data.password);
            if (user) {
                const version = await tokenModel.getVersion(user.uid);
                const token = generate_token({ ...user, version }, true);
                await tokenModel.insertRefreshToken(token.refreshToken, user.uid, user.role)
                setToken(res, token.accessToken, token.refreshToken);
            } else {
                res.status(401).json({
                    message: "Tài khoản hoặc mật khẩu không chính xác",
                    name: "password"
                });
            }
        })
    }
}

export default new AuthController()