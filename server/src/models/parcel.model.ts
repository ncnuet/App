import { ParcelBaseModel } from "./schema/parcel.schema";

class ParcelModel {
    async getParcel(ids: string | string[]) {
        if (Array.isArray(ids)) {
            return await ParcelBaseModel.find({
                pid: { "$in": ids }
            }).exec();
        } else {
            return await ParcelBaseModel.find({
                pid: ids
            }).exec();
        }
    }
}

export default new ParcelModel();