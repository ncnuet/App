import { model } from "mongoose";
import { IPostOffice, postOfficeSchema } from "@/models/schema/post_office.schema";

export const PostOfficeBaseModel = model<IPostOffice>('post_office', postOfficeSchema);