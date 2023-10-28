import { Request, Response } from 'express'

class Status {
    getStatus(req: Request, res: Response) {
        res.json({message: "OK"});
    }
}

export default new Status;