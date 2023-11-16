import { model } from "mongoose";
import { IParcel, ParcelSchema } from "@/models/schema/parcel.schema";

export const ParcelBaseModel = model<IParcel>("Parcel", ParcelSchema);