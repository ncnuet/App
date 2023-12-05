import { model } from "mongoose";
import { Itracking, trackingSchema } from "../schema/tracking.schema";

export const TrackingBaseModel = model<Itracking>("Tracking", trackingSchema)