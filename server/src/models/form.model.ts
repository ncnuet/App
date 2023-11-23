import { FormBaseModel } from "./base/form.base";
import {ILocalData, Request, Response } from "@/types/controller"

class FormModel {
    async getForm(fid: string[]) {
        const result = await FormBaseModel.find({
            _id: { $in : fid}
        }).exec();

        return result.map(form => {
            const {_id, type, parcel, user} = form;
            return {
                fid: _id.toString(),
                type, parcel, user
            }
        })
    }

    async createNewForm(req: Request, res: Response) {
        const {fid, type, parcel, user} = req.body;
        const newForm = new FormBaseModel({
            fid: fid,
            type: type,
            parcel: parcel,
            user: user,
        });
        await newForm.save();
        res.status(200).json({
            message: "200 ok",
        })
    }
    
}

export default new FormModel();