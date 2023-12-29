import { ILocalData, Request, Response } from "@/types/controller";
import { IUser } from "@/types/auth";
import { TTL, withAge } from "@/configs/cookie";
import config from "@/configs/env";

import { generateResetToken, generateToken } from "@/utils/generate";
import {
  sendForgetPasswordMail,
  sendResetPasswordMail,
} from "@/utils/send_mail";
import { handleError } from "@/utils/controller";

import authModel from "@/models/auth.model";
import TokenModel from "@/models/token.model";
import userModel from "@/models/user.model";
import cloudinary from "@/configs/cloudinary";

import RoleValidator, {
  ICreateUser,
  IUpdateActive,
  IUpdateAvatar,
  IUpdateInfoUser,
  IUpdatePassword,
  IUpdateUser,
  IUpdateUserName,
} from "@/validators/user.validator";

import AuthValidator, {
  ILoginByPassword,
  IRequestReset,
  IResetPassword,
} from "@/validators/auth.validator";

interface IUserWithEpx extends IUser {
  exp: number;
}

function setToken(
  res: Response,
  remember: boolean,
  accessToken: string,
  refreshToken?: string
) {
  refreshToken &&
    res.cookie("refresh_token", refreshToken, withAge(TTL.ONE_DAY));
  res
    .status(200)
    .cookie("token", accessToken, withAge(remember ? TTL.ONE_HOUR : void 0))
    .json({ message: "success", data: { accessToken, refreshToken } })
    .send();
}

export default class AuthController {
  static async login(req: Request, res: Response) {
    const data = <ILoginByPassword>req.body;
    console.log(data);

    handleError(res, async () => {
      AuthValidator.validateLoginPassword(data);
      const user = await authModel.findUserByPassword(
        data.username,
        data.password
      );
      if (user) {
        if (user.active) {
          const version = (await TokenModel.getVersion(user.uid)) || "0";
          const token = generateToken(
            { ...user, version, remember: data.remember },
            true
          );
          await TokenModel.insertRefreshToken(
            token.refreshToken,
            user.uid,
            user.role
          );
          setToken(res, data.remember, token.accessToken, token.refreshToken);
        } else {
          res.status(401).json({
            message: "Tài khoản đã bị khóa",
            name: "username",
          });
        }
      } else {
        res.status(401).json({
          message: "Tài khoản hoặc mật khẩu không chính xác",
          name: "password",
        });
      }
    });
  }

  static async logout(req: Request, res: Response) {
    const user = res.locals.user;

    handleError(res, async () => {
      TokenModel.deleteRefreshToken(user.uid);
      TokenModel.updateVersion(user.uid);
      res.cookie("token", null, withAge(TTL.ZERO));
      res.cookie("refresh_token", null, withAge(TTL.ZERO));
      res.sendStatus(200);
    });
  }

  static async requestReset(req: Request, res: Response) {
    const data = <IRequestReset>req.body;
    console.log(data);

    handleError(res, async () => {
      AuthValidator.validateRequestReset(data);
      const user = await authModel.findUserByInfo(data);
      if (user) {
        const { username, uid } = user;
        const token = generateResetToken({
          username,
          uid,
          name: "",
          role: "admin",
          version: "0",
          remember: false,
          office: "",
          avatar: "",
          active: false
        });

        sendForgetPasswordMail(user, token);

        res
          .status(200)
          .json({ message: "Email đã được gửi thành công tới " + user.email });
      } else {
        res.status(400).json({ message: "Không tồn tại tài khoản" });
      }
    });
  }

  static async verifyReset(
    req: Request,
    res: Response<any, ILocalData<IUserWithEpx>>
  ) {
    const username = res.locals.user.username;
    const timeExp = res.locals.user.exp * 1000;
    const remaining = Math.floor((timeExp - new Date().getTime()) / 1000);

    res
      .cookie("token", req.query.token, withAge(180 * 1000))
      .redirect(
        config.FRONTEND +
        "/resetpassword?ttl=" +
        remaining +
        "&user=" +
        username
      );
  }

  static async resetPassword(req: Request, res: Response) {
    const data = <IResetPassword>req.body;

    handleError(res, async () => {
      AuthValidator.validateReset(data);
      const user = <IUser>res.locals.user;

      const new_profile = await authModel.updatePassword(
        user.uid,
        data.password
      );
      if (new_profile) sendResetPasswordMail(new_profile);

      res.json({ message: "Password đã thay đổi thành công" });
    });
  }

  static async getMe(req: Request, res: Response) {
    const user = res.locals.user;

    handleError(res, async () => {
      res.json({
        message: "success",
        data: {
          name: user.name,
          username: user.username,
          office: user.office,
          role: user.role,
          uid: user.uid
        },
      });
    });
  }

  static async createUser(req: Request, res: Response) {
    const user = res.locals.user;
    const data: ICreateUser = {
      ...<ICreateUser>req.body,
      role: user.role === "bod" || user.role === "admin" ? "head" : "trans_staf",
      office: user.role === "bod" || user.role === "admin" ? req.body.office : user.office
    }

    handleError(res, async () => {
      RoleValidator.validateCreateUser(data);
      const otherUsers = await userModel.getUserInOffice(data.office);
      RoleValidator.validateOnlyManagerInOffice(otherUsers, data.office, data.role);

      const user_id = await userModel.create(user.uid, data);

      res.status(200).json({
        message: "Tạo tài khoản thành công",
        data: { uid: user_id }
      });
    });
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = <IUpdateUser>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      await userModel.updateDetail(id, editor.uid, data);

      res.status(200).json({
        message: "update success"
      });
    });
  }

  static async updateAccount(req: Request, res: Response) {
    const { id } = req.params;
    const data = <IUpdatePassword>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      await userModel.updatePassword(id, editor.uid, data);

      res.status(200).json({
        message: "update success",
      });
    });
  }

  static async updateAvatar(req: Request, res: Response) {
    const { id } = req.params;
    const data = <IUpdateAvatar>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      let result = await cloudinary.uploader.upload(data.avatar, { folder: "avatar" });

      data.avatar = result.secure_url;
      const updatedUser = await userModel.updateAvatar(id, editor.uid, data);
      res.status(200).json({
        message: "success",
        data: updatedUser,
      });
    });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const editor = res.locals.user;

    handleError(res, async () => {
      await userModel.delete(id, editor.uid);
      res.status(200).json({
        message: "delete success"
      });
    });
  }

  static async updateActive(req: Request, res: Response) {
    const { id } = req.params;
    const data = <IUpdateActive>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      await userModel.updateActive(id, editor.uid, data);
      res.status(200).json({
        message: "success"
      });
    });
  }

  // TODO: Uncheck
  static async updateSelfInfo(req: Request, res: Response) {
    const data = <IUpdateInfoUser>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      const updatedUser = await userModel.updateInfo(
        editor.uid.toString(),
        data
      );
      res.status(200).json({
        message: "success",
        data: updatedUser,
      });
    });
  }

  static async updateSelfUserName(req: Request, res: Response) {
    const data = <IUpdateUserName>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      const updatedUser = await userModel.updateUsername(
        editor.uid.toString(),
        data
      );
      res.status(200).json({
        message: "success",
        data: updatedUser,
      });
    });
  }

  static async updateSelfAvatar(req: Request, res: Response) {
    const data = <IUpdateAvatar>req.body;
    const editor = res.locals.user;

    handleError(res, async () => {
      let result = await cloudinary.uploader.upload(data.avatar, {
        folder: "avatar",
      });
      data.avatar = result.secure_url;
      const updatedUser = await userModel.updateAvatar(
        editor.uid.toString(),
        editor.uid.toString(),
        data
      );
      res.status(200).json({
        message: "success",
        data: updatedUser,
      });
    });
  }

  static async getCreatedPerson(req: Request, res: Response) {
    const user = res.locals.user;

    handleError(res, async () => {
      const createdPersons = await userModel.getCreatedPerson(user.uid);
      const result = createdPersons.map((user) => {
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        };
      });
      res.status(200).json({
        message: "success",
        data: result,
      });
    });
  }
}
