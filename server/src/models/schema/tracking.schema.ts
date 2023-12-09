import { ObjectId, Schema } from "mongoose";
import { ParcelBaseModel } from "../base/parcel.base";
import { ITrackingEvent, trackingEventSchema } from "./event.schema";

export interface Itracking extends Document {
    parcel: ObjectId
    events: ITrackingEvent[]
}

export const trackingSchema = new Schema<Itracking>(
    {
        parcel: { type: Schema.Types.ObjectId, required: true, ref: ParcelBaseModel },
        events: { type: [trackingEventSchema] }
    },
    { timestamps: true }
)