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
                creator: 1, address: 1, avatar: 1, active: 1
            })
            .exec()

        return user.map(user => {
            const { _id, email, username, phone, name, role, office, creator, address, avatar, active } = user;
            return { uid: _id.toString(), email, username, phone, name, role, office, creator, address, avatar, active };
        })
    }

    async getManagers() {
        const users = await UserBaseModel.find(
            { role: EUserRole.HEAD },
            {
                role: 1, email: 1, username: 1,
                phone: 1, _id: 1, name: 1, office: 1,
                creator: 1, address: 1, avatar: 1, active: 1
            })
            .exec()

        return users.map(user => {
            const { _id, email, username, phone, name, role, office, creator, address, avatar, active } = user;
            return { uid: _id.toString(), email, username, phone, name, role, office, creator, address, avatar, active };
        })
    }

    async getStaff(offices: string[]) {
        const users = await UserBaseModel.find(
            {
                role: { $in: [EUserRole.GATHE_STAF, EUserRole.TRANS_STAF] },
                office: { $in: offices }
            },
            {
                role: 1, email: 1, username: 1,
                phone: 1, _id: 1, name: 1, office: 1,
                creator: 1, address: 1, avatar: 1, active: 1
            })
            .exec()

        return users.map(user => {
            const { _id, email, username, phone, name, role, office, creator, address, avatar, active } = user;
            return { uid: _id.toString(), email, username, phone, name, role, office, creator, address, avatar, active };
        })
    }

    async getUserByName(name: string) {
        const users = await UserBaseModel.find(
            {
                office: null,
                role: EUserRole.HEAD,
                $text: {
                    $search: name || ""
                }
            },
            { score: { $meta: 'textScore' } }
        ).exec();

        console.log(users, name);
        

        return users.map(offices => {
            const { _id, name } = offices
            return {
                name,
                uid: _id.toString()
            }
        });
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

    async updateDetail(id_user: string, creator: string, data: IUpdateUser): Promise<boolean> {
        const userAfterUpdate = await UserBaseModel.updateOne(
            { _id: id_user, creator },
            {
                name: data.name,
                role: data.role,
                email: data.email,
                phone: data.phone,
                // address: data.address,
            });
        return userAfterUpdate.modifiedCount > 0;
    }

    async updatePassword(id_user: string, creator: string, data: IUpdatePassword) {
        var hashPassword = data.password && bcrypt.hashSync(data.password, 10) || void 0;
        console.log(data);

        const userAfterUpdate = await UserBaseModel.updateOne(
            { _id: id_user, creator },
            {
                password: hashPassword,
                username: data.username,
            });

        return userAfterUpdate;
    }

    async updateAvatar(id_user: string, creator: string, data: IUpdateAvatar): Promise<boolean> {
        const userAfterUpdate = await UserBaseModel.updateOne(
            { _id: id_user, creator },
            { avatar: data.avatar });
        return userAfterUpdate.modifiedCount > 0;
    }

    async delete(id: string, creator: string): Promise<boolean> {
        const deleteResult = await UserBaseModel.deleteOne(
            { _id: id, creator: creator });

        return deleteResult.deletedCount > 0;
    }

    async updateActive(id_user: string, creator: string, data: IUpdateActive): Promise<boolean> {
        const userAfterUpdate = await UserBaseModel.updateOne(
            { _id: id_user, creator: creator },
            { active: data.active });
        return userAfterUpdate.modifiedCount > 0;
    }

    async updateNullOffice(office: string) {
        const userAfterUpdate = await UserBaseModel.updateOne(
            { office },
            { office: null });
        return userAfterUpdate.modifiedCount > 0;
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