import { UserBaseModel } from "./base/user.base";

class UserModel {
    async getUsers(uid: string[]) {
        const user = await UserBaseModel.find(
            { _id: { $in: uid } },
            {
                role: 1, email: 1, username: 1,
                phone: 1, _id: 1, name: 1, office: 1
            })
            .exec()

        return user.map(user => {
            const { _id, email, username, phone, name, role, office } = user;
            return { uid: _id.toString(), email, username, phone, name, role, office };
        })
    }
}
export default new UserModel();