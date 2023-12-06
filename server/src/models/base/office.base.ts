import { model } from "mongoose";
import { IPostOffice, postOfficeSchema } from "@/models/schema/office.schema";

export const PostOfficeBaseModel = model<IPostOffice>('Post_Office', postOfficeSchema);