import { Request, Response } from 'express'
import database from "@/configs/database";

class Profile {
    async getProfile(req: Request, res: Response) {
        try {
            const query_pattern = "SELECT * FROM `account` WHERE id = 1";
            const [results, fields] = await database.execute(query_pattern);
            res.status(200).json(results);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new Profile