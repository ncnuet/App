import { ObjectId, Schema } from "mongoose";
import { ParcelBaseModel } from "../base/parcel.base";
import { OfficeBaseModel } from "../base/office.base";

export interface IStatisticDB {
    office : string;
    in: string[];
    out: string[];
}

const StatisticSchema = new Schema<IStatisticDB> ({
    office: {type: String, required: true},
    in: {type : [String]},
    out: {type : [String]},
}, {
    timestamps: true,
});

export default StatisticSchema;