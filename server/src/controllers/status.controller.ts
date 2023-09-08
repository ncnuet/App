import { Request, Response } from 'express'

class Status {
    getStatus(req: Request, res: Response) {
        // console.log(req);
        res.json({});
    }
}

export default new Status;