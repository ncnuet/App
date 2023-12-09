import { ObjectId, Schema } from "mongoose";
import { ParcelBaseModel } from "@/models/base/parcel.base";
import { ITrackingEvent, trackingEventSchema } from "./event.schema";

export interface ITracking extends Document {
    parcel: string
    events: ITrackingEvent[]
}

export interface ITrackingSchema extends Omit<ITracking, "parcel">, Document {
    parcel: ObjectId
}

export const trackingSchema = new Schema<ITrackingSchema>(
    {
        parcel: { type: Schema.Types.ObjectId, required: true, ref: ParcelBaseModel },
        events: { type: [trackingEventSchema] }
    },
    { timestamps: true }
)