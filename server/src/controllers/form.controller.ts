import FormModel from "@/models/form.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import FormValidator, { IFormCreate, IFormUpdate } from "@/validators/form.validator";

export default class FormController {
    public static async create(req: Request, res: Response) {
        const data = <IFormCreate>req.body;
        const user = res.locals.user;
        console.log(user);
        

        handleError(res, async () => {
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
        const user = res.locals.user;
        
        handleError(res, async () => {
            FormValidator.validateType(data.type);
            const form = await FormModel.getForm([data.id_form])
            FormValidator.validatePermission(form[0]._id.toString(), user.uid)
            const result = await FormModel.updateReciverOrTypeForm(data, user.uid);
            res.status(200).json({
                message: "update thành công",
                data : result,
            })
        })
    }
}