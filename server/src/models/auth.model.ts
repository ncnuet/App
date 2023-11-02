import { RowDataPacket } from "mysql2";
import * as bcrypt from "bcryptjs";
import { UserModel } from "./schema/user.schema";
import { Email, IUserDetail, IUserWithoutVersion, Phone, UID, Username } from "@/types/auth";

type QueryInfo = Phone | Email | UID | Username | IUserDetail
interface IAccountReponseData extends IUserWithoutVersion {
    hashPassword: string
}
class AuthModel {
    /**
     * Checks if the user is existed in the database. 
     * Search by the username/uid and verified by the password
     * @param _username username
     * @param _password 
     * @returns IUser if the user exists or undefined otherwise
     */
    async findAccountByPassword(_username: string, _password: string): Promise<IUserWithoutVersion> {
        const user = await UserModel.findOne(
            { username: _username },
            { uid: 1, role: 1, username: 1, password: 1 })
            .exec();

        if (!user) return undefined;

        const { uid, username, password, role } = user;
        return _password
            ? await bcrypt.compare(_password, password) && { uid, username, role }
            : undefined
    }

    /**
     * Check if the user linking with given email is existed in the database.
     * @param email 
     * @returns UID if the user exists or undefined otherwise
     */
    // async findEmailByInfo(info: QueryInfo): Promise<IUserDetail> {
    //     const query = `
    //         SELECT email, username, uid, phone
    //         FROM account_details 
    //         WHERE username=? OR uid=? OR phone=? OR email=?
    //         LIMIT 1`;

    //     const [results] = await database.execute<RowDataPacket[]>(
    //         query,
    //         [info, info, info, info]);

    //     if (!results.length) return undefined;
    //     return results.map(row => row["uid"])[0];
    // }
}

export default new AuthModel()