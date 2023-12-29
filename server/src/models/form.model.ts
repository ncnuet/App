import { IFormAddItem, IFormUserCreate, IFormDelete, IFormDeleteItem, IFormUserUpdate, IFormUpdateItem, IFormCustomerCreate, IFormCustomerUpdate, IFormDeleteItems, IFormUpdateItems, IFormUpdateStatus } from "@/validators/form.validator";
import { FormBaseModel } from "./base/form.base";
import { EFormStatus, EFormType } from "./schema/form.chema";
const { ObjectId } = require('mongodb');

class FormModel {
    async getForm(fid: string[]) {
        const form = await FormBaseModel.find(
            { _id: { $in: fid } },
        ).exec();

        return form
    }

    async createUserForm(data: IFormUserCreate, creator: string) {
        const response = await FormBaseModel.create({
            creator: creator,
            receiver: data.receiver,
            type: data.type,
            status: EFormStatus.SENT,
            content: data.content
        })

        return response;
    }

    async createCustomerForm(data: IFormCustomerCreate, creator: string, receiver: string) {
        const response = await FormBaseModel.create({
            creator: creator,
            receiver: receiver,
            type: EFormType.SEND,
            content: data.content,
        })

        return response._id;
    }

    async updateReciverOrTypeForm(data: IFormUserUpdate, editor: string, id_form: string) {
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

    // async updateTypeForm(data: IFormCustomerUpdate, id_form: string) {
    //     const result = await FormBaseModel.findByIdAndUpdate(
    //         { _id: id_form },
    //         {
    //             type: data.type,
    //         },
    //         { new: true }
    //     )

    //     return result;
    // }

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
            { $pull: { content: { parcel: new ObjectId(data.parcel) } } }
        )

        return result;
    }

    async deleteItems(data: IFormDeleteItems, id_form: string) {
        const result = await FormBaseModel.updateOne(
            { _id: id_form },
            { $pull: { content: { parcel: { $in: data.parcels.map(parcel => new ObjectId(parcel)) } } } }
        );

        return result;
    }



    async updateConfirm(data: IFormUpdateItem, id_form: string) {
        const result = await FormBaseModel.updateOne(
            { _id: id_form, 'content.parcel': new ObjectId(data.parcel) },
            { $set: { 'content.$.confirm': data.confirm } },
        );

        return result;
    };

    // async updateManyConfirm(data: IFormUpdateItems, id_form: string) {
    //     const updateOperations = data.contentsForm.map(content => ({
    //         updateMany: {
    //           filter: { _id: id_form, 'content.parcel': new ObjectId(content.parcel) },
    //           update: { $set: { 'content.$.confirm': content.confirm } },
    //         }
    //       }));
        
    //       const result = await FormBaseModel.bulkWrite(updateOperations);
    //       return result;
    //   }

    async findParcel(id_parcel: string) {
        const existingForm = await FormBaseModel.findOne({ 'content.parcel': id_parcel });
        return existingForm
    }

    async getAllOwnForm(creator: string,  limit: number | null = null, skip: number | null = null) {
        const result = await FormBaseModel.find({ creator })
            .limit(limit)  
            .skip(skip);  
    
        return result;
    }

    async getAllReciveForm(receiver: string, limit: number | null = null, skip: number | null = null) {
        let query = FormBaseModel.find({ receiver });
    
        if (limit !== null) {
            query = query.limit(limit);
        }
    
        if (skip !== null) {
            query = query.skip(skip);
        }
    
        const result = await query.exec();
        return result;
    }
    

    async updateStatus(form_id : string, data: IFormUpdateStatus) {
        const result = await FormBaseModel.findByIdAndUpdate(
            {_id : form_id},
            {status: data.status},
            { new: true }
        )

        return result
    }
}

export default new FormModel();