import * as bcrypt from "bcryptjs";
import { UserBaseModel } from "./base/user.base";
import { IQueryableUser, IUserWithoutVersion } from "@/types/auth";

class AuthModel {
    async findUserByPassword(_username: string, _password: string): Promise<IUserWithoutVersion> {
        const user = await UserBaseModel.findOne(
            { username: _username },
            { _id: 1, role: 1, username: 1, password: 1, office: 1, name: 1, avatar: 1, active: 1 })
            .exec();

        if (!user) return undefined;

        const { _id, username, password, role, office, name, avatar, active } = user;
        return _password
            ? await bcrypt.compare(_password, password) && {
                uid: _id.toString(),
                office: office.toString(),
                username, role, name, avatar, active
            }
            : undefined
    }

    async findUserByInfo(info: IQueryableUser): Promise<IQueryableUser> {
        const user = await UserBaseModel.findOne(
            {
                $or: [
                    { username: info.username },
                    { email: info.email },
                    { phone: info.phone },
                    { uid: info.uid }
                ]
            },
            { email: true, username: true, phone: true, _id: true })
            .exec()

        if (!user) return undefined;
        const { username, phone, _id: uid, email } = user;

        return { username, phone, uid, email };
    }

    async updatePassword(uid: string, password: string): Promise<IQueryableUser> {
        const user = await UserBaseModel.findOneAndUpdate(
            { _id: uid },
            { password: await bcrypt.hash(password, 10) },
            { new: true })
            .exec();

        if (!user) return undefined;
        else return {
            email: user.email
        }
    }
}

export default new AuthModel()