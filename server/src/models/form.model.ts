import { IFormAddItem, IFormCreate, IFormDelete, IFormDeleteItem, IFormUpdate, IFormUpdateItem } from "@/validators/form.validator";
import { FormBaseModel } from "./base/form.base";

class FormModel {
    async getForm(fid: string[]) {
        const form = await FormBaseModel.find(
            { _id: { $in: fid } },
        ).exec();

        return form
    }

    async createForm(data: IFormCreate, creator: string) {
        const response = await FormBaseModel.create({
            creator: creator,
            receiver: data.receiver,
            type: data.type,
            content: data.content,
        })

        return response._id;
    }

    async updateReciverOrTypeForm(data: IFormUpdate, editor: string, id_form: string) {
        const result = await FormBaseModel.findByIdAndUpdate(
            { _id: id_form },
            {
                receiver: data.receiver,
                type: data.type,
            },
            { new: true }
        )

        return result;
    }

    async deleteForm(data: IFormDelete) {
        const result = await FormBaseModel.findByIdAndDelete(data.id_form)
        return result;
    }

    async addItem(data: IFormAddItem, id_form: string) {
        const updatetedForm = await FormBaseModel.findByIdAndUpdate(
            { _id: id_form },
            { $addToSet: { content: data } },
            { new: true }
        )

        return updatetedForm;
    }

    async deleteItem(data: IFormDeleteItem, id_form: string) {
        const result = await FormBaseModel.updateOne(
            { _id: id_form },
            { $pull: { content: { parcel: data.parcel } } }
        )

        return result;
    }

    async updateConfirm(data: IFormUpdateItem, id_form: string) {
        const result = await FormBaseModel.updateOne(
            { _id: id_form, 'items.parcel': data.parcel },
            { $set: { 'items.$.confirm': data.comfirm } }
        );

        return result;
    }
}

export default new FormModel();