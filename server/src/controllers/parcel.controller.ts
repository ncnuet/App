import officeModel from "@/models/office.model";
import parcelModel from "@/models/parcel.model";
import trackingModel from "@/models/tracking.model";

import { InputError, Request, Response } from "@/types/controller";
import { handleError } from "@/utils/controller";
import ParcelValidator, {
    IParcelCreate, IParcelUpdate, IParcelUpdateStatus
} from "@/validators/parcel.validator";

export default class ParcelController {
    private static async precheck(data: IParcelCreate | Omit<IParcelUpdate, "id">) {
        if (data.receiving_office) {
            const offices = await officeModel.getOffices([data.receiving_office])
            if (offices.length === 0) throw new InputError("Invalid office id", "receiving_office");
        }
    }

    public static async create(req: Request, res: Response) {
        const _data = req.body;
        const user = res.locals.user;
        const data = <IParcelCreate>{
            ..._data,
            creator: user.uid,
            sending_office: user.office
        }

        handleError(res, async () => {
            ParcelValidator.validateCreate(data);
            await ParcelController.precheck(data);

            const parcel_id = await parcelModel.create(data);
            const tracking_id = await trackingModel.create({
                parcel: parcel_id,
                office: user.office,
                uid: user.uid
            });

            res.status(200).json({ message: "Created successfully", data: { parcel_id, tracking_id } })
        })
    }

    public static async delete(req: Request, res: Response) {
        const id = req.params.id;
        const user = res.locals.user;

        handleError(res, async () => {
            ParcelValidator.validateDelete({ id });

            const ok = await parcelModel.delete(id, user.office);
            res.json({ message: ok ? "Deleted successfully" : "Unable to delete", data: { id } });
        })
    }

    public static async update(req: Request, res: Response) {
        const id = req.params.id;
        const data = <Omit<IParcelUpdate, "id">>req.body;
        const user = res.locals.user;

        handleError(res, async () => {
            ParcelValidator.validateUpdate({ id, ...data });
            await ParcelController.precheck(data);

            const ok = await parcelModel.update(id, user.office, data);
            res.json({ message: ok ? "Updated successfully" : "Unable to update", data: { id } });
        })
    }

    public static async updateStatus(req: Request, res: Response) {
        const id = req.params.id;
        const data = <Omit<IParcelUpdateStatus, "id">>req.body;
        const user = res.locals.user;

        handleError(res, async () => {
            ParcelValidator.validateUpdateStatus({ id, ...data });

            const ok_tracking = await trackingModel.push(id, { ...data, uid: user.uid, office: user.office })
            const ok_parcel = await parcelModel.updateStatus(id, data)
            res.json({
                message: ok_parcel && ok_tracking ? "Updated status successfully" : "Unable to update status",
                data: { id }
            })
        })
    }
}