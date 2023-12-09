import { ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "@/models/base/user.base";
import { OfficeBaseModel } from "@/models/base/office.base";

export interface ITrackingEvent {
    name: string;
    responsor: string,
    office: string
}

export interface ITrackingEventSchema
    extends Omit<ITrackingEvent, "responsor" | "office">, Document {
    responsor: ObjectId,
    office: ObjectId
}

export const trackingEventSchema = new Schema<ITrackingEventSchema>({
    name: { type: String, required: true },
    responsor: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel },
    office: { type: Schema.Types.ObjectId, required: true, ref: OfficeBaseModel }
}, {
    timestamps: true
})