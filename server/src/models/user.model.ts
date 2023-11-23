import { FormBaseModel } from "./base/form.base";
import { UserBaseModel } from "./base/user.base";
import formModel from "./form.model";

class UserModel {
    async getUsers(_id: string[]) {
        const user = await UserBaseModel.find(
            { _id: { $in: _id } },
            { role: 1, uid: 1, version: 1, email: 1, username: 1, phone: 1, _id: 1, name: 1 })
            .exec()

        return user.map(user => {
            const { _id: _id, uid, role, version, email, username, phone, name } = user;
            return { _id, uid, role, version, email, username, phone, name };
        })
    }

    async getFormToCustomer(uid: string, role: string) {
        const formsToCustomer = await FormBaseModel.find({
            user: uid,
            type: "form to customer",
        })
        return formsToCustomer;
    }

    async getUserWithRole(role:string, _id: string[] = null) {
        if (_id != null) {
            const user = await UserBaseModel.find(
                {
                    _id: { $in: _id },
                    role: role
                },
                { role: 1, uid: 1, version: 1, email: 1, username: 1, phone: 1, _id: 1, name: 1 })
                .exec()

            return user.map(user => {
                const { _id: _id, uid, role, version, email, username, phone, name } = user;
                return { _id, uid, role, version, email, username, phone, name };
            })
        } else {
            const user = await UserBaseModel.find(
                {
                    role: role,
                },
                { role: 1, version: 1, email: 1, username: 1, phone: 1, _id: 1, name: 1 })
                .exec()

            return user.map(user => {
                const { _id: uid, role, version, email, username, phone, name } = user;
                return { uid: uid.toString(), role, version, email, username, phone, name };
            })
        }
    }
}
export default new UserModel();