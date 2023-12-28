import bcrypt from 'bcryptjs'

import { UserBaseModel } from "./base/user.base";
import { IResponseData, Request, Response } from "@/types/controller"
import AuthValidator from "@/validators/auth.validator";
import RoleValidator, { ICreateUser, IUpdateActive, IUpdateAvatar, IUpdateInfoUser, IUpdatePassword, IUpdateUser, IUpdateUserName } from '@/validators/user.validator';
import { OfficeBaseModel } from './base/office.base';
import { EUserRole } from '@/types/auth';
import cloudinary from '@/configs/cloudinary';

class UserModel {
    async getUsers(uid: string[]) {
        const user = await UserBaseModel.find(
            { _id: { $in: uid } },
            {
                role: 1, email: 1, username: 1,
                phone: 1, _id: 1, name: 1, office: 1,
                creator: 1
            })
            .exec()

        return user.map(user => {
            const { _id, email, username, phone, name, role, office, creator } = user;
            return { uid: _id.toString(), email, username, phone, name, role, office, creator };
        })
    }

    async create(creator: string, data: ICreateUser) {
        const response = await UserBaseModel.create({
            username: data.username,
            password: bcrypt.hashSync("123456789", 10),
            role: data.role,
            version: 0,
            email: data.email,
            phone: data.phone,
            name: data.name,
            office: data.office,
            creator: creator,
            active: true
        })

        return response._id
    }

    async update(id_user: string, data: IUpdateUser) {
        const updateData: any = {
            name: data.name,
            role: data.role,
            email: data.email,
            phone: data.phone,
            address: data.address,
        };

        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user, updateData, { new: true });
        return userAfterUpdate;
    }

    async updatePassword(id_user: string, data: IUpdatePassword) {
        var salt = bcrypt.genSaltSync(10);
        // console.log(data.password);

        var hashPass = bcrypt.hashSync(data.password, salt);
        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user,
        {
            password: hashPass,
            username: data.username,
        },
        { new: true });

        return userAfterUpdate;
    }

    async delete(id: string) {

        const deleteResult = await UserBaseModel.findByIdAndDelete(id);
        console.log(deleteResult);

        return deleteResult;
    }

    async updateInfo(id_user: string, data: IUpdateInfoUser) {
        const updateData: any = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            gender: data.gender,
        };
        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user, updateData, { new: true });
        return userAfterUpdate;
    }

    async updateUsername(id_user: string, data: IUpdateUserName) {
        const updateData: any = {
            username: data.username,
        }
        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user, updateData, { new: true });
        return userAfterUpdate;
    }

    async updateAvatar(id_user: string, data: IUpdateAvatar) {
        // let result = await cloudinary.uploader.upload(data.avatar, { folder: 'avatar' });
        const updateData: any = {
            avatar: data.avatar
        };

        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user, updateData, { new: true });
        return userAfterUpdate;
    }

    async updateActive(id_user: string, data: IUpdateActive) {
        const updateData: any = {
            active: data.active,
        }
        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user, updateData, { new: true });
        return userAfterUpdate;
    }

    async getCreatedPerson(creator: string) {
        const result = await UserBaseModel.find(
            { creator: creator },
        )

        return result;
    }

    async getUserInOffice(office: string) {
        const result = await UserBaseModel.find(
            { office: office }
        )

        return result;
    }
}
export default new UserModel();