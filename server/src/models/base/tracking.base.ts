import { model } from "mongoose";
import {ITrackingSchema, trackingSchema } from "../schema/tracking.schema";

export const TrackingBaseModel = model<ITrackingSchema>("Tracking", trackingSchema)