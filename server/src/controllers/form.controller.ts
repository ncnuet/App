import { UserBaseModel } from "@/models/base/user.base";
import FormModel from "@/models/form.model";
import parcelModel from "@/models/parcel.model";
import { EFormType } from "@/models/schema/form.chema";
import userModel from "@/models/user.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import FormValidator, { IFormAddItem, IFormCreate, IFormDelete, IFormDeleteItem, IFormUpdate, IFormUpdateItem } from "@/validators/form.validator";

export default class FormController {
    public static async create(req: Request, res: Response) {
        const data = <IFormCreate>req.body;
        const user = res.locals.user;
        console.log(user);
        

        handleError(res, async () => {
            if(data.type !== EFormType.SEND_TO_RECEIVER) {
                const receivers = await userModel.getUsers([data.receiver]);
                FormValidator.validateReceiverAndTypeForm(receivers[0].role, data.type)
                FormValidator.validateReceiver(receivers[0]);
            }
            // const receivers = await userModel.getUsers([data.receiver]);
            FormValidator.validateType(data.type);
            const form_id = await FormModel.createForm(data, user.uid);
            res.status(200).json({
                message: "thành công tạo đơn ",
                data: {
                    form_id : form_id
                }
            })
        })
    }

    public static async updateReciverOrType (req: Request, res: Response) {
        const data = <IFormUpdate>req.body;
        const {id} = req.params
        const user = res.locals.user;
        
        handleError(res, async () => {
            FormValidator.validateType(data.type, true);
            const form = await FormModel.getForm([id])
            FormValidator.validatePermission(form[0].creator.toString(), user.uid)
            const result = await FormModel.updateReciverOrTypeForm(data, user.uid, id);
            res.status(200).json({
                message: "update thành công",
                data : result,
            })
        })
    }

    public static async deleteForm (req: Request, res: Response) {
        const {id} = req.params;
        const data = <IFormDelete> {
            id_form: id,
        }

        const user = res.locals.user;

        handleError(res, async() => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.deleteForm(data);
            res.status(200).json({
                message: "xóa thành công",
                data : result,
            })
        })
    }

    public static async addItemForm (req: Request, res: Response) {
        const data = <IFormAddItem>req.body;
        const {id} = req.params;
        const user = res.locals.user;
        handleError(res, async() => {
            // const parcels = parcelModel.getParcels([data.parcel.toString()])
            // FormValidator.validateParcelOfForm(parcels);
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.addItem(data, id);
            res.status(200).json({
                message: "thêm item thành công",
                data : result,
            })
        })
    }

    public static async deleteItemForm(req: Request, res : Response) {
        const {id} = req.params;
        const data = <IFormDeleteItem>req.body;
        const user = res.locals.user;
        handleError(res, async() => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.deleteItem(data, id);
            res.status(200).json({
                message: "thêm item thành công",
                data : result,
            })
        })
    }

    public static async updateItemForm (req: Request, res : Response) { 
        const {id} = req.params;
        const data = <IFormUpdateItem>req.body;
        const user = res.locals.user;
        handleError(res, async() => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.updateConfirm(data, id);
            res.status(200).json({
                message: "thêm item thành công",
                data : result,
            })
        })
    }
}