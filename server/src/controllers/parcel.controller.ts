import parcelModel from "@/models/parcel.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import ParcelValidator, { IParcelCreate } from "@/validators/parcel.validator";

export default class ParcelController {
    public static create(req: Request, res: Response) {
        const data = <IParcelCreate>req.body;

        handleError(res, async () => {
            ParcelValidator.validateCreate(data);
            const id = await parcelModel.create(data);

            res.status(200).json({ message: "Created successfully", data: { id } })
        })
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            ParcelValidator.validateDelete({ id });
            const ok = await parcelModel.delete(id);

            res.json({ message: ok ? "Deleted success" : "Unable to delete", data: { id } });
        })
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body;

        handleError(res, async () => {
            ParcelValidator.validateUpdate({ id, ...data });
            const ok = await parcelModel.update(id, data);
            res.json({ message: ok ? "Deleted success" : "Unable to delete", data: { id } });
        })
    }
}