import { NextFunction, Request, Response } from 'express'
import * as jwt from "jsonwebtoken";
import config from '@/configs/config_env';
import mailer from '@/configs/connect_mailer';

import AuthModel, { IUserInfo } from '@/models/auth.model';
import { JWTPayload } from '@/types/auth';
import { renderTemplate } from '@/utils/html_template';
import { generate_token, generate_uid } from '@/utils/generate';
import authModel from '@/models/auth.model';

interface ILoginByPassword {
    username: string,
    password: string
}

interface IChangePassword {
    old_password: string,
    new_password: string
}

interface IRefreshToken {
    token: string
}

interface IRequestReset {
    email: string
}

interface IResetPassword {
    password: string
}

interface ICreateAccount {
    username: string,
    password: string,
    phone: string
}

function setResToken(res: Response, accessToken: string, refreshToken ?: string) {
    res
        .cookie("token", accessToken, {
            maxAge: 3600 * 100, // 3600s
            httpOnly: true, // Not allowed reading from JS
            secure: true // Not allowed reading from http
        })
        .status(200)
    if (refreshToken) {
        res
            .cookie("refresh_token", refreshToken, {
                maxAge: 86400 * 100, // 24h
                httpOnly: true,
                secure: true
            })
            .json({ accessToken, refreshToken });
    }
    else {
        res.json({ accessToken });
    }
}

class Auth {

    // Review: PASSED
    /**
     * Verify account, return access token and resfresh token if true.
     * @param req 
     * @param res 
     */
    async loginByPassword(req: Request, res: Response) {
        const data = <ILoginByPassword>req.body;
        console.log(data);

        try {
            const UID = await AuthModel.findAccountByPassword(data.username, data.password);
            if (UID) {
                const unencryptedData: JWTPayload = { username: data.username, UID };
                const token = generate_token(unencryptedData, true)

                // Write refresh token to the database.
                if (!await AuthModel.insertRefreshToken(token.refreshToken, UID)) {
                    throw new Error("Can't add resfresh token");
                }

                setResToken(res, token.accessToken, token.refreshToken);
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    }

    async loginByProvider(req: Request, res: Response) {
        const data = <JWTPayload>req.user;
        console.log(data);

        try {
            const { username, UID } = data;
            if (UID) {
                const unencryptedData: JWTPayload = { username, UID };
                const token = generate_token(unencryptedData, true)

                // TODO: remove UID in database and add exprire_at col
                // Write refresh token to the database.
                if (!await AuthModel.insertRefreshToken(token.refreshToken, UID)) {
                    throw new Error("Can't add resfresh token");
                }

                setResToken(res, token.accessToken, token.refreshToken);
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    }

    // Review: PASSED
    /**
     * Regenerate token from refresh token.
     * @param req 
     * @param res 
     */
    async resfreshToken(req: Request, res: Response) {
        const refreshToken = (<IRefreshToken>req.body).token;
        console.log(refreshToken);

        try {
            // if the refresh token is not in database...
            if (!refreshToken || !(await AuthModel.checkRefreshToken(refreshToken))) {
                return res.sendStatus(401);
            }

            try {
                // Check valid token 
                const data = <JWTPayload>jwt.verify(refreshToken, config.JWT_REFRESH_KEY);

                // Create a new token 
                const unencryptedData: JWTPayload = { username: data.username, UID: data.UID };
                const token = generate_token(unencryptedData)

                setResToken(res, token.accessToken);
            } catch (error) {
                console.log(error);
                res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    // Review: PASSED
    /**
     * Change password with verifying old password
     * @param req 
     * @param res 
     */
    async changePassword(req: Request, res: Response) {
        const data = <IChangePassword>req.body;
        console.log(data);

        try {
            const JWTPayload: JWTPayload = <JWTPayload>res.locals.JWTPayload
            if (await AuthModel.findAccountByPassword(JWTPayload.UID, data.old_password)) {
                if (await AuthModel.updatePassword(JWTPayload.UID, data.new_password)) {
                    res.status(200).json({ message: "Password changed successfully" });
                } else {
                    throw new Error("Can't change password");
                }
            } else {
                res.status(400).json({ message: "Old password is not correct" });
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    // Review: PASSED
    /**
     * Request server send an email containing a token link in order to reset password.
     * @param req 
     * @param res 
     */

    async requestReset(req: Request, res: Response) {
        const data = <IRequestReset>req.body;
        console.log(data);

        try {
            // Find email in database.
            const account = await AuthModel.findAccountByEmail(data.email);
            console.log(account);

            if (account) {
                // Create token to reset password
                const { email, username, UID } = account;
                const unencryptedData: JWTPayload = { username: username, UID }
                const token = generate_token(unencryptedData);

                // Send mail with defined transport object
                const info = await mailer.sendMail({
                    from: `"${config.APP_NAME}" <${config.MAIL_USER}>`,
                    to: email,
                    subject: `[Reset Password] on ${config.APP_NAME}}`,
                    html: renderTemplate(
                        "/src/templates/forgot-password-email.html",
                        { url: `${config.HOSTNAME}/auth/resetPassword?token=${token.accessToken}`, name: username })
                });

                res.status(200).json({ message: "Sent token link to " + email });
            } else {
                res.status(400).json({ message: "Invalid email address: " + data.email })
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    // Review: PASSED
    /**
     * Reset password without verifying old password
     * @param req 
     * @param res 
     */
    async resetPassword(req: Request, res: Response) {
        const data = <IResetPassword>req.body;
        console.log(data);

        try {
            const JWTPayload = <JWTPayload>res.locals.JWTPayload;
            if (await AuthModel.updatePassword(JWTPayload.UID, data.password)) {
                res.json({ message: "Password changed successfully" });
            } else {
                throw new Error("Can't reset password");
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    // Review: PASSED
    async createAccount(req: Request, res: Response) {
        const data = <ICreateAccount>req.body;
        console.log(data);

        try {
            let UID = authModel.findAccountByUsernameOrUID(data.username);
            if (!UID) {
                const userinfor: IUserInfo = {
                    username: data.username,
                    password: data.password,
                    provider: "local",
                    puid: generate_uid(10),
                    phone: data.phone // validate phone number
                }
                UID = authModel.createAccount(userinfor);
                res.status(200).json({ message: "Created account successfully" });
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}

export default new Auth()