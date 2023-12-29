import { model } from "mongoose";
import FormSchema, {IFormDB} from "../schema/form.chema";


export const FormBaseModel = model<IFormDB>('form', FormSchema);