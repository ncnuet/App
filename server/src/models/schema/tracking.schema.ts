import { ObjectId, Schema } from "mongoose";
import { ParcelBaseModel } from "../base/parcel.base";
import { PostOfficeBaseModel } from "../base/post_office.base";
import { UserBaseModel } from "../base/user.base";

export interface ITrackingEvent {
    name: string;
    responsor: ObjectId
}

export interface Itracking extends Document {
    post_office: ObjectId
    parcel: ObjectId
    events: ITrackingEvent[]
}

export const trackingEventSchema = new Schema<ITrackingEvent>({
    name: { type: String, required: true },
    responsor: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel }
})

export const trackingSchema = new Schema<Itracking>(
    {
        post_office: { type: Schema.Types.ObjectId, required: true, ref: PostOfficeBaseModel },
        parcel: { type: Schema.Types.ObjectId, required: true, ref: ParcelBaseModel },
        events: { type: [trackingEventSchema] }
    },
    { timestamps: true }
)