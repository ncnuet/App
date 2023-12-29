import postOfficeModel from "@/models/office.model";
import userModel from "@/models/user.model";
import { InputError, Request, Response } from "@/types/controller";
import { EOfficeType } from "@/models/schema/office.schema";
import { handleError } from "@/utils/controller";

import OfficeValidator, {
    IOfficeCreate, IOfficeUpdate
} from "@/validators/office.validator";
import officeModel from "@/models/office.model";

export default class OfficeController {
    private static async precheck(data: Omit<IOfficeUpdate, "id"> | IOfficeCreate) {
        if (data.manager) {
            const _users = await userModel.getUsers([data.manager]);
            if (_users.length === 0)
                throw new InputError("Manager id not found", "manager");
            if (_users[0].role !== "head")
                throw new InputError("User role must be head", "role");
        }

        if (data.gather_office) {
            const _offices = await postOfficeModel.getOffices([data.gather_office])
            if (_offices.length === 0)
                throw new InputError("Office id not found", "gather_office");
            if (_offices[0].office_type !== EOfficeType.Gathering)
                throw new InputError("Office type must be gathering", "gather_office_type");
        }
    }

    public static async create(req: Request, res: Response) {
        const data = <IOfficeCreate>req.body;
        handleError(res, async () => {
            OfficeValidator.validateCreate(data);
            await OfficeController.precheck(data)
            const id = await postOfficeModel.create(data);
            res.json({ message: "Created success", data: { id } });
        })
    }

    public static async delete(req: Request, res: Response) {
        const id = <string>req.params.id;

        handleError(res, async () => {
            OfficeValidator.validateDelete({ id });
            const ok = await postOfficeModel.delete(id);
            const ok2 = await userModel.updateNullOffice(id);
            res.json({ message: ok ? "Created success" : "Unable to delete", data: { id } });
        })
    }

    public static async update(req: Request, res: Response) {
        const id = <string>req.params.id;
        const data = <Omit<IOfficeUpdate, "id">>req.body;

        handleError(res, async () => {
            OfficeValidator.validateUpdate({ id, ...data });
            await OfficeController.precheck(data)
            const ok = await postOfficeModel.update(id, data);
            res.json({ message: ok ? "Updated success" : "Unable to update", data: { id } });
        })
    }

    public static getOfficeGather(req: Request, res: Response) {
        const name = req.query.name as string;

        handleError(res, async () => {
            console.log(req.query);
            
            const offices = await officeModel.getOfficeGather(name);
            res.json({ message: "success", data: { offices } });
        })
    }
}