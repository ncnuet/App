import { model } from "mongoose";
import ParcelSchema, { IParcelSchema } from "@/models/schema/parcel.schema";
import { MongoosasticModel } from "mongoosastic";

export const ParcelBaseModel = model<IParcelSchema, MongoosasticModel<IParcelSchema>>("Parcel", ParcelSchema);