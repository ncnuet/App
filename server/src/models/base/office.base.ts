import { model } from "mongoose";
import { IOfficeSchema, officeSchema } from "@/models/schema/office.schema";

export const OfficeBaseModel = model<IOfficeSchema>('Office', officeSchema);