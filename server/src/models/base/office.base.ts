import { model } from "mongoose";
import { IPostOffice, officeSchema } from "@/models/schema/office.schema";

export const OfficeBaseModel = model<IPostOffice>('Office', officeSchema);