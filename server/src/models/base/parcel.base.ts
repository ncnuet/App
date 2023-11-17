import { model } from "mongoose";
import { IParcel, parcelSchema } from "@/models/schema/parcel.schema";

export const ParcelBaseModel = model<IParcel>("Parcel", parcelSchema);