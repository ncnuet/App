import authModel from '@/models/auth.model';
import tokenModel from '@/models/token.model';
import { ILoginByPassword } from '@/validators/auth.validator';
import { Request, Response } from 'express'

class Status {
    getStatus(req: Request, res: Response) {
        res.json({ message: "OK" });
    }

    async getUser(req: Request, res: Response) {
        const data = <ILoginByPassword>req.body;
        console.log(data);

        const user = await authModel.findUserByPassword(data.username, data.password);
        console.log(user);

        if (user) {
            res.json({ message: "hello", data: user })
        } else {
            res.json({ message: "error", data: {} })
        }
    }

    async addToken(req: Request, res: Response) {
        await tokenModel.insertRefreshToken("sdcasdcasdcasdc", "21020365", "admin")
        res.json({ "message": "OK" })
    }
}

export default new Status;