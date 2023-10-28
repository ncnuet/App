import database from "@/configs/database";
import { IUser, IUserWithoutVersion } from "@/types/auth";
import { RowDataPacket } from "mysql2";
import * as bcrypt from "bcryptjs";

class AuthModel {
    /**
     * Checks if the user is existed in the database. 
     * Search by the username/uid and verified by the password
     * @param info username or uid
     * @param password 
     * @returns IUser if the user exists or undefined otherwise
     */
    async findAccountByPassword(info: string, password: string): Promise<IUserWithoutVersion> {
        const query = `
            SELECT password, uid, username, role 
            FROM account 
            WHERE username=? OR uid=? 
            LIMIT 1`;

        const [results] = await database.execute<RowDataPacket[]>(query, [info, info]);

        if (!results.length) return undefined;
        const { hashPassword, ...userData } = results.map(row => ({
            hashPassword: row["password"],
            uid: row["uid"],
            username: row["username"],
            role: row["role"],
        }))[0];

        return hashPassword
            ? await bcrypt.compare(password, hashPassword) && userData
            : undefined
    }
}

export default new AuthModel()