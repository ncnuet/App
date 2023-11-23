import { model } from "mongoose";
import { IForm, formSchema } from "../schema/form.chema";

export const FormBaseModel = model<IForm>("form", formSchema);
