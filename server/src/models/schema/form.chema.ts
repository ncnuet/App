import { Schema } from "mongoose";

export interface IForm extends Document {
    fid: string;
    type: string; // gửi đơn gửi lên điểm tập kết - tạo đơn gửi lên điểm giao dịch đích - tạo đơn đến điểm tập kết đích.
    parcel: string[]; // mã bưu kiện
    user: string;
};

export const formSchema = new Schema<IForm>({
    fid: {type: String, required: true, unique: true, index: true},
    type: {type: String, required: true},
    parcel: {type: [String], required: true},
    user: {type: String, required: true},
}, {
    timestamps: true
})