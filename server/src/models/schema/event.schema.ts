import { ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "../base/user.base";

export interface ITrackingEvent {
    name: string;
    responsor: ObjectId
}

export const trackingEventSchema = new Schema<ITrackingEvent>({
    name: { type: String, required: true },
    responsor: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel }
})