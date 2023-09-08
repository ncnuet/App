import database from "@/configs/connect_db";
import { SocialProvider } from "@/types/auth";
import { generate_uid } from "@/utils/generate";
import * as bcrypt from "bcryptjs";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface IFindByEmailResult {
    email: string,
    UID: string,
    username: string
}

export interface IUserInfo {
    provider: SocialProvider,
    username: string,
    password: string,
    puid: string,
    img?: string,
    email?: string,
    phone?: string,
}
class AuthModel {

    // Review: PASSED
    /**
     * Checks if the user is existed in the database. Search by the username/uid and verify by the password
     * @param usernameOrUID 
     * @param password 
     * @returns UID if the user exists or undefined otherwise
     */
    async findAccountByPassword(usernameOrUID: string, password: string): Promise<string> {
        const query_pattern = "SELECT password, uid FROM account WHERE provider=? AND username=? OR uid=? limit 1";

        // username is unique
        const [results] = await database.execute<RowDataPacket[]>(
            query_pattern,
            ["local", usernameOrUID, usernameOrUID]);

        if (!results) return undefined;
        const [hashPassword, UID] = results.map(row => [row["password"], row["uid"]])[0];

        return hashPassword
            ? await bcrypt.compare(password, hashPassword) && UID
            : undefined
    }

    /**
     * check if the user using provider is existed in the database. 
     * @param provider 
     * @param puid 
     * @returns UID if the user exists or undefined otherwise
     */
    async findAccountByProvider(provider: SocialProvider, puid: string): Promise<string> {
        const query_pattern = "SELECT uid FROM account WHERE provider=? AND puid=? limit 1";

        const [results] = await database.execute<RowDataPacket[]>(query_pattern, [provider, puid]);

        if (!results) return undefined;
        return results.map(row => row["uid"])[0];
    }

    /**
     * Checks if the user is existed in the database.
     * @param usernameOrUID 
     * @param password 
     * @returns UID if the user exists or undefined otherwise
     */
    async findAccountByUsernameOrUID(usernameOrUID: string): Promise<string> {
        const query_pattern = "SELECT uid FROM account WHERE provider=? AND username=? OR uid=? limit 1";

        const [results] = await database.execute<RowDataPacket[]>(
            query_pattern,
            ["local", usernameOrUID, usernameOrUID]);

        if (!results) return undefined;
        return results.map(row => row["uid"])[0];
    }

    // Review: PASSED
    /**
     * check if the user linking with email is existed in the database.
     * @param email 
     * @returns UID if the user exists or undefined otherwise
     */
    async findAccountByEmail(email: string): Promise<IFindByEmailResult> {
        const query_pattern = "SELECT email, username, uid FROM account_detail WHERE email=? limit 1";

        const [results] = await database.execute<RowDataPacket[]>(query_pattern, [email]);

        if (!results) return undefined;
        return <IFindByEmailResult>results.map(row => ({
            email: <string>row["email"],
            UID: <string>row["uid"],
            username: <string>row["username"]
        }))[0];
    }

    /**
     * Create account
     * @param userData user data
     * @returns UID if inserted successful or undefined otherwise
     */
    async createAccount(userData: IUserInfo): Promise<string> {
        const query_pattern_1 = "INSERT INTO account(username, password, uid, provider, puid) values (?,?,?,?,?)";
        const query_pattern_2 = "INSERT INTO account_detail(username, email, phone, uid, img) values (?,?,?,?,?)";
        const { provider, username, password, puid, email, img, phone } = userData;
        const UID = generate_uid();

        const [result_1] = await database.execute<ResultSetHeader>(
            query_pattern_1, [username, await bcrypt.hash(password, 10), UID, provider, puid]);
        const [result_2] = await database.execute<ResultSetHeader>(
            query_pattern_2, [username, email ? email : null, phone ? phone : null, UID, img ? img : null]);

        return result_1.affectedRows > 0 && result_2.affectedRows > 0 ? UID : undefined;
    }

    // Review: PASSED
    /**
     * Update password.
     * @param username 
     * @param password 
     * @returns true if password was updated successfully
     */
    async updatePassword(uid: string, password: string): Promise<boolean> {
        const query_pattern = "UPDATE account SET password=? WHERE uid=?";
        const newHashPassword = await bcrypt.hash(password, 10);

        // username is unique
        const [result] = await database.execute<ResultSetHeader>(query_pattern, [newHashPassword, uid]);

        return result.affectedRows > 0;
    }

    // Review: PASSED
    /**
     * Insert refresh token into the database.
     * @param refreshToken 
     * @returns true if inserted successfully.
     */
    async insertRefreshToken(refreshToken: string, UID: string): Promise<boolean> {
        const query_pattern = "INSERT INTO refresh_token(token, uid) values (?, ?)";

        const [result] = await database.execute<ResultSetHeader>(query_pattern, [refreshToken, UID]);

        return result.affectedRows > 0;
    }

    // Review: PASSED
    /**
     * Checks if the refresh token is stored in the database.
     * @param refreshToken 
     * @returns 
     */
    async checkRefreshToken(refreshToken: string): Promise<boolean> {
        const query_pattern = "SELECT token FROM refresh_token WHERE token=? limit 1";

        const [results] = await database.execute<RowDataPacket[]>(query_pattern, [refreshToken]);

        if (!results) return undefined;
        return results.length > 0;
    }
}

export default new AuthModel();