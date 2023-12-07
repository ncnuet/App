import officeModel from "@/models/office.model";
import parcelModel from "@/models/parcel.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import ParcelValidator, { IParcelCreate, IParcelUpdate } from "@/validators/parcel.validator";

export default class ParcelController {
    private static async precheck(data: IParcelCreate | Omit<IParcelUpdate, "id">) {
        if (data.receiving_office) {
            const offices = await officeModel.getOffices([data.receiving_office])
            if (offices.length === 0) throw new InputError("Invalid office id", "receiving_office");
        }

        if (data.sending_office) {
            const offices = await officeModel.getOffices([data.sending_office])
            if (offices.length === 0) throw new InputError("Invalid office id", "sending_office");
        }
    }

    public static async create(req: Request, res: Response) {
        const data = <IParcelCreate>req.body;

        handleError(res, async () => {
            ParcelValidator.validateCreate(data);
            await ParcelController.precheck(data);

            const id = await parcelModel.create(data);
            res.status(200).json({ message: "Created successfully", data: { id } })
        })
    }

    public static async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            ParcelValidator.validateDelete({ id });

            const ok = await parcelModel.delete(id);
            res.json({ message: ok ? "Deleted success" : "Unable to delete", data: { id } });
        })
    }

    public static async update(req: Request, res: Response) {
        const id = req.params.id;
        const data = <Omit<IParcelUpdate, "id">>req.body;

        handleError(res, async () => {
            ParcelValidator.validateUpdate({ id, ...data });
            await ParcelController.precheck(data);

            const ok = await parcelModel.update(id, data);
            res.json({ message: ok ? "Deleted success" : "Unable to delete", data: { id } });
        })
    }
}