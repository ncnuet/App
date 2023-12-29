import statisticModel, { IStatisticCreate } from "@/models/statistic.model";
import { InputError, Request, Response } from "@/types/controller";
import { handleError } from "@/utils/controller";

export default class StatisticController {
    public static create(req: Request, res: Response) {
        const data = <IStatisticCreate>req.body;


        handleError(res, async () => {
            const result = await statisticModel.create(data);
            res.json({
                message: "success",
                data: result
            })
        })

    }
}