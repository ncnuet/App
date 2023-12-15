import { ILocalData, Request, Response } from "@/types/controller"
import { withAge } from '@/configs/cookie';
import { generateResetToken, generateToken } from '@/utils/generate';
import handleError from '@/utils/handle_error';
import AuthValidator, { ILoginByPassword, IRequestReset, IResetPassword } from "@/validators/auth.validator";
import authModel from '@/models/auth.model';
import tokenModel from "@/models/token.model";
import { sendForgetPasswordMail } from "@/utils/send_mail";
import env from "@/configs/env";
import { IUser } from "@/types/auth";
import RoleValidator, { ICreateUser, IUpdateUser } from "@/validators/user.validator";
import userModel from "@/models/user.model";

interface IUserWithEpx extends IUser {
    exp: number;
}

function setToken(res: Response, remember: boolean, accessToken: string, refreshToken?: string) {
    refreshToken && res.cookie("refresh_token", refreshToken, withAge(86400 * 1000))
    res
        .status(200)
        .cookie("token", accessToken, withAge(remember ? 3600 * 1000 : void 0))
        .json({ message: "success", data: { accessToken, refreshToken } })
        .send();
}

export default class AuthController {
    /**
     * Verify account, return access token and resfresh token if true.
     * @param req 
     * @param res 
     */
    static async login(req: Request, res: Response) {
        const data = <ILoginByPassword>req.body;
        console.log(data);

        await handleError(res, async () => {
            AuthValidator.validateLoginPassword(data);
            const user = await authModel.findUserByPassword(data.username, data.password);
            if (user) {
                const version = (await tokenModel.getVersion(user.uid)) || "0";
                const token = generateToken({ ...user, version, remember: data.remember }, true);
                await tokenModel.insertRefreshToken(token.refreshToken, user.uid, user.role)
                setToken(res, data.remember, token.accessToken, token.refreshToken);
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
    static async logout(req: Request, res: Response) {
        const user = res.locals.user;

        await handleError(res, async () => {
            tokenModel.deleteRefreshToken(user.uid);
            tokenModel.updateVersion(user.uid);
            res.cookie("token", null, withAge(0));
            res.cookie("refresh_token", null, withAge(0));
            res.sendStatus(200);
        });
    }

    /**
     * Request reset password
     * @param req 
     * @param res 
     */
    static async requestReset(req: Request, res: Response) {
        const data = <IRequestReset>req.body;
        console.log(data);

        await handleError(res, async () => {
            AuthValidator.validateRequestReset(data);
            const user = await authModel.findUserByInfo(data);
            if (user) {
                const { username, uid } = user;
                const token = generateResetToken({
                    username, uid,
                    name: "",
                    role: "admin",
                    version: "0",
                    remember: false,
                    office: ""
                });

                await sendForgetPasswordMail(user, token);

                res.status(200).json({ message: "Email đã được gửi thành công tới " + user.email });
            } else {
                res.status(400).json({
                    message: "Không tồn tại email",
                    name: "email"
                })
            }
        })
    }

    /**
     * Verify link and redirect to front-end 
     * @param req 
     * @param res 
     */
    static async verifyReset(req: Request, res: Response<any, ILocalData<IUserWithEpx>>) {
        const username = res.locals.user.username;
        const timeExp = res.locals.user.exp * 1000;
        const remaining = Math.floor((timeExp - new Date().getTime()) / 1000);

        res
            .cookie("token", req.query.token, withAge(180 * 1000))
            .redirect(env.FRONTEND + "/resetpassword?ttl=" + remaining + "&user=" + username)
    }

    static async resetPassword(req: Request, res: Response) {
        const data = <IResetPassword>req.body;

        await handleError(res, async () => {
            AuthValidator.validateReset(data);
            const user = <IUser>res.locals.user;

            await authModel.updatePassword(user.uid, data.password)
            res.json({ message: "Password changed successfully" });
        })
    }

    static async createUser(req: Request, res: Response) {
        const data = <ICreateUser>req.body;
        const user = res.locals.user;
        
        await handleError(res, async () => {
            RoleValidator.validateCreateUser(user.role, data);
            const user_id = await userModel.create(user.uid, data);

            res.status(200).json({
                message: "Created sucessfully",
                data: {
                    uid: user_id,
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    role: data.role
                }
            })

            // TODO: Gui mail ve chi nguoi dung
        })
    }

    static async updateUser(req: Request, res: Response) {
        const {id} = req.params;
        const data = <IUpdateUser>req.body;
        const editor = res.locals.user;

        await handleError(res, async () => {
            const users = await userModel.getUsers([id]);

            RoleValidator.validateUpdateUser(users[0].creator.toString(), editor, data);
            const updatedUser = await userModel.update(id, data);

            res.status(200).json({
                message: "update success",
                data: {
                    uid: id,
                    username: updatedUser.username,
                    password: updatedUser.password,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    active: updatedUser.active,
                    phone: updatedUser.phone,
                }
            })
        })
    }

    static async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        const editor = res.locals.user;
        await handleError(res, async() => {
            const users = await userModel.getUsers([id]);
            RoleValidator.validateDeleteUser(users[0].creator.toString(), editor);
            const deleteResult = await userModel.delete(id);
            res.status(200).json({
                message: "delete success",
                data: deleteResult,
            })
        })
    }

    static async updateSelf(req: Request, res: Response) {
        const data = <IUpdateUser>req.body;
        if(req.file) {
            data.avatar = req.file.path
        }
        
        const editor = res.locals.user;
        await handleError(res, async() => {
            const updatedUser = await userModel.update(editor.uid.toString(), data);

            res.status(200).json({
                message: "update success",
                data: {
                    uid:editor.uid,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    active: updatedUser.active,
                    phone: updatedUser.phone,
                }
            })
        })
    }
}