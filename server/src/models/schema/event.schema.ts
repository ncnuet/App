import { ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "../base/user.base";
import { OfficeBaseModel } from "../base/office.base";

export interface ITrackingEvent {
    name: string;
    responsor: ObjectId,
    office: ObjectId
}

export const trackingEventSchema = new Schema<ITrackingEvent>({
    name: { type: String, required: true },
    responsor: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel },
    office: { type: Schema.Types.ObjectId, required: true, ref: OfficeBaseModel }
})