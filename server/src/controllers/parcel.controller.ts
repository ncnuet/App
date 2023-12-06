import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import ParcelValidator, { IParcelCreate } from "@/validators/parcel.validator";

export default class ParcelController {
    public static create(req: Request, res: Response) {
        const data = <IParcelCreate>req.body;

        handleError(res, async () => {
            ParcelValidator.validateCreate(data);
        })
    }
}