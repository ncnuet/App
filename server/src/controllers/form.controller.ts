import { UserBaseModel } from "@/models/base/user.base";
import FormModel from "@/models/form.model";
import parcelModel from "@/models/parcel.model";
import { EFormType } from "@/models/schema/form.chema";
import userModel from "@/models/user.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import FormValidator, { IFormAddItem, IFormAddItems, IFormUserCreate, IFormDelete, IFormDeleteItem, IFormUserUpdate, IFormUpdateItem, IFormCustomerCreate, IFormCustomerUpdate, IFormDeleteItems, IFormUpdateItems } from "@/validators/form.validator";

export default class FormController {
    public static async createFormToUser(req: Request, res: Response) {
        const data = <IFormUserCreate>req.body;
        const user = res.locals.user;


        handleError(res, async () => {
            const roleCreator = user.role;
            const receiver = await userModel.getUsers([data.receiver]);
            FormValidator.validateCreatorAndReceiver(receiver[0].role, roleCreator);
            const form = await FormModel.createUserForm(data, user.uid);
            res.status(200).json({
                message: "thành công tạo đơn ",
                data: form
            })
        })
    }

    // public static async createFormToCustomer(req: Request, res: Response) {
    //     const data = <IFormCustomerCreate>req.body;
    //     const user = res.locals.user;

    //     handleError(res, async () => {
    //         const parcels = await parcelModel.getParcels([data.content[0].parcel.toString()])
    //         const form_id = await FormModel.createCustomerForm(data, user.uid, parcels[0].receiver.phone );
    //         res.status(200).json({
    //             message: "thành công tạo đơn ",
    //             data: {
    //                 form_id : form_id
    //             }
    //         })
    //     })
    // }

    public static async updateReciverOrType(req: Request, res: Response) {
        const data = <IFormUserUpdate>req.body;
        const { id } = req.params
        const user = res.locals.user;

        handleError(res, async () => {
            FormValidator.validateStatus(data.type, true);

            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);

            const receiver = await userModel.getUsers([data.receiver]);
            FormValidator.validateCreatorAndReceiver(receiver[0].role, user.role, true);

            const result = await FormModel.updateReciverOrTypeForm(data, user.uid, id);
            res.status(200).json({
                message: "update thành công",
                data: result,
            })
        })
    }

    public static async updateType(req: Request, res: Response) {
        const data = <IFormCustomerUpdate>req.body;
        const { id } = req.params
        const user = res.locals.user;


        handleError(res, async () => {
            FormValidator.validateStatus(data.type, true);
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.updateTypeForm(data, id);
            res.status(200).json({
                message: "update thành công",
                data: result
            })
        })
    }

    public static async deleteForm(req: Request, res: Response) {
        const { id } = req.params;
        const data = <IFormDelete>{
            id_form: id,
        }

        const user = res.locals.user;

        handleError(res, async () => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.deleteForm(data);
            res.status(200).json({
                message: "xóa thành công",
                data: result,
            })
        })
    }

    public static async addItemForm(req: Request, res: Response) {
        const data = <IFormAddItem>req.body;
        const { id } = req.params;
        const user = res.locals.user;
        handleError(res, async () => {
            // const parcels = parcelModel.getParcels([data.parcel.toString()])
            // FormValidator.validateParcelOfForm(parcels);
            const existingForm = await FormModel.findParcel(data.parcel.toString());
            FormValidator.validateExistForm(existingForm);
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.addItem(data, id);
            res.status(200).json({
                message: "thêm item thành công",
                data: result,
            })
        })
    }

    public static async addItemsForm(req: Request, res: Response) {
        const data = <IFormAddItems>req.body;
        console.log(data);
        
        const { id } = req.params;
        const user = res.locals.user;
        handleError(res, async () => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await Promise.all(data.contentsForm.map(async (item) => {
                const existingForm = await FormModel.findParcel(item.parcel.toString());
                FormValidator.validateExistForm(existingForm);
                const result = await FormModel.addItem(item, id);
                return result
            }))

            res.status(200).json({
                message: "thêm items thành công",
                data: result,
            })
        })

    }

    public static async deleteItemForm(req: Request, res: Response) {
        const { id } = req.params;
        const data = <IFormDeleteItem>req.body;
        const user = res.locals.user;
        handleError(res, async () => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);
            const result = await FormModel.deleteItem(data, id);
            res.status(200).json({
                message: "xóa item thành công",
                data: result,
            })
        })
    }

    public static async deleteItemForms(req: Request, res: Response) {
        const { id } = req.params;
        const data = <IFormDeleteItems>req.body;
        const user = res.locals.user;
        handleError(res, async () => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermission(form[0].creator.toString(), user.uid);

            // const result = await Promise.all(data.parcels.map(async (parcel) => {
            //     const dataDelete:IFormDeleteItem = {
            //         parcel: parcel
            //     }
            //     const result = await FormModel.deleteItem(dataDelete, id);
            //     return result
            // }))
            const result = await FormModel.deleteItems(data, id);
            res.status(200).json({
                message: "xóa items thành công",
                data: result,
            })
        })
    }

    public static async confirmItemForm(req: Request, res: Response) {
        const { id } = req.params;
        const data = <IFormUpdateItem>req.body;
        const user = res.locals.user;
        handleError(res, async () => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermissionComfirm(form[0].receiver, user.uid);
            const result = await FormModel.updateConfirm(data, id);
            res.status(200).json({
                message: "xác nhận thành công",
                data: result,
            })
        })
    }

    
    public static async confirmItemForms(req: Request, res: Response) {
        const { id } = req.params;
        const data = <IFormUpdateItems>req.body;
        // console.log(data);
        
        const user = res.locals.user;
        handleError(res, async () => {
            const form = await FormModel.getForm([id]);
            FormValidator.validatePermissionComfirm(form[0].receiver, user.uid);
            const result = await Promise.all(data.contentsForm.map(async (content) => {
                const result = await FormModel.updateConfirm(content, id);
                return result
            }) )

            res.status(200).json({
                message: "xác nhận thành công",
                data: result,
            })
        })
    }

}