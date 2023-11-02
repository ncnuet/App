import { Request, Response } from "@/types/controller"
import { setAge } from '@/configs/cookie';
import { generate_token } from '@/utils/generate';
import handleError from '@/utils/handle_error';
import authValidator, { ILoginByPassword, IRequestReset } from "@/validators/auth.validator";
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
                const version = (await tokenModel.getVersion(user.uid)) || "0";
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

    /**
     * Logout
     * @param req 
     * @param res 
     */
    async logout(req: Request, res: Response) {
        const user = res.locals.user;

        await handleError(res, async () => {
            tokenModel.deleteRefreshToken(user.uid);
            tokenModel.updateVersion(user.uid);
            res.cookie("token", null, setAge(0));
            res.cookie("refresh_token", null, setAge(0));
            res.sendStatus(200);
        });
    }

    /**
     * Request reset password
     * @param req 
     * @param res 
     */
    async requestReset(req: Request, res: Response) {
        // const data = <IRequestReset>req.body;
        // console.log(data);

        // await handleError(res, async () => {
        //     authValidator.validateRequestReset(data);

        //     const user = await authModel.findEmailByInfo(data.username);

        //     if (user) {
        //         const token = await generate_reset_token(user);

        //         // Send mail
        //         await mailer.sendMail({
        //             from: `"${config.APP_NAME}" <${config.MAIL_USER}>`,
        //             to: user.email,
        //             subject: `[Reset Password] on ${config.APP_NAME}}`,
        //             html: renderTemplate(
        //                 "/src/templates/forgot-password-email.html",
        //                 {
        //                     url: `${config.BACKEND}/auth/resetPassword?token=${token}`,
        //                     name: user.username
        //                 })
        //         });

        //         res.status(200).json({ message: "Email đã được gửi thành công" });
        //     } else {
        //         res.status(400).json({
        //             message: "Không tồn tại email",
        //             name: "email"
        //         })
        //     }
        // })
    }
}

export default new AuthController()