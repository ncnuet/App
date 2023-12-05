import { ObjectId, Schema } from "mongoose";
import { ParcelBaseModel } from "../base/parcel.base";
import { PostOfficeBaseModel } from "../base/post_office.base";
import { ITrackingEvent, trackingEventSchema } from "./event.schema";

export interface Itracking extends Document {
    post_office: ObjectId
    parcel: ObjectId
    events: ITrackingEvent[]
}

export const trackingSchema = new Schema<Itracking>(
    {
        post_office: { type: Schema.Types.ObjectId, required: true, ref: PostOfficeBaseModel },
        parcel: { type: Schema.Types.ObjectId, required: true, ref: ParcelBaseModel },
        events: { type: [trackingEventSchema] }
    },
    { timestamps: true }
)