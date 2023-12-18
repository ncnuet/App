import { ObjectId, Schema } from "mongoose";
import { ParcelBaseModel } from "../base/parcel.base";
import { UserBaseModel } from "../base/user.base";
import { ICustomer, customerSchema } from "./customer.schema";

export enum EFormType {
    SEND_TO_RECEIVER = 'send_to_receiver',
    SEND_TO_TRANS_STAF = 'send_to_trans_staf',
    SEND_TO_GATHE_STAF = 'send_to_gathe_staf',
}

export interface IContentForm {
    parcel: ObjectId; // chứa danh sách các parcel. người nhận thì sẽ chỉ có 1 parcel còn 
    comfirm: boolean; // receiver sẽ xác nhận.
}

export interface IFormDB {
    creator : ObjectId;// nguời tạo đơn này có thể là giao dịch viên, nhân viên tại tập kết
    receiver: string;// nguời nhận đơn này có thể là giao dịch viên, nhân viên tại tập kết, người nhận.
    type: string; //loại đơn. 3 loại: gửi đến người nhận, giao dịch viên, nhân viên tập kết.
    content: IContentForm[];
}

export const ContenFormSchema = new Schema<IContentForm> ({
    parcel: {type: Schema.Types.ObjectId, required: true, ref:ParcelBaseModel},
    comfirm: {type: Boolean, required: true}
})

const FormSchema = new Schema<IFormDB> ({
    creator: {type: Schema.Types.ObjectId, required: true, ref:UserBaseModel},
    receiver: {type: String, required: true },
    type: {type: String, required: true},
    content: {type: [ContenFormSchema], required: true},
}, {
    timestamps: true,
})

export default FormSchema;