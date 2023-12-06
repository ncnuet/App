import postOfficeModel from "@/models/postOffice.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import OfficeValidate, { IOfficeCreate } from "@/validators/office.validator";

export default class OfficeController {
    public static create(req: Request, res: Response) {
        const data = <IOfficeCreate>req.body;

        handleError(res, async () => {
            OfficeValidate.validateCreate(data);
            const id = await postOfficeModel.create(data);

            res.json({ message: "Created success", data: { id } });
        })
    }

    public static delete(req: Request, res: Response) {
        const id = <string>req.params.id;

        handleError(res, async () => {
            OfficeValidate.validateDelete({ id });
            const ok = await postOfficeModel.delete(id);

            res.json({ message: ok ? "Created success" : "Unable to delete", data: { id } });
        })
    }
}