import { model } from "mongoose";
import StatisticSchema, {IStatisticDB} from "../schema/statistic.schema";


export const StatisticBaseModel = model<IStatisticDB>('statistic', StatisticSchema);