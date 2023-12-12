import bcrypt from 'bcryptjs'

import { UserBaseModel } from "./base/user.base";
import { IResponseData, Request, Response } from "@/types/controller"
import AuthValidator from "@/validators/auth.validator";
import RoleValidator, { ICreateUser, IUpdateUser } from '@/validators/user.validator';
import { OfficeBaseModel } from './base/office.base';
import { EUserRole } from '@/types/auth';

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
        var salt = bcrypt.genSaltSync(10);
        // console.log(data.password);

        var hashPass = bcrypt.hashSync(data.password, salt);

        const response = await UserBaseModel.create({
            username: data.username,
            password: hashPass,
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

        var salt = bcrypt.genSaltSync(10);
        const userAfterUpdate = await UserBaseModel.findByIdAndUpdate(id_user, {
            name: data.name,
            password: data.password ? bcrypt.hashSync(data.password, salt) : data.password,
            role: data.role,
            email: data.email,
            phone: data.phone,
            active: data.active,
            username: data.username,
        }, { new: true })
        return userAfterUpdate;
    }

    async delete(id : string) {
      
        const deleteResult = await UserBaseModel.findByIdAndDelete(id);
        console.log(deleteResult);
        
        return deleteResult;
    }
}
export default new UserModel();