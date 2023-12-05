import { ParcelBaseModel } from "./base/parcel.base";

class ParcelModel {
    async getParcel(pid: string[]) {
        const result = await ParcelBaseModel.find({
            _id: { $in: pid }
        }).exec();

        return result.map(parcel => {
            const {
                _id, sender, sending_add, receiver,
                receiving_add, status, goods, notes,
                sending_office, receiving_office
            } = parcel;

            return {
                pid: _id.toString(),
                sender, sending_add, receiver,
                receiving_add, status, goods, notes,
                sending_office: sending_office.toString(),
                receiving_office: receiving_office.toString()
            }
        })
    }
}

export default new ParcelModel();