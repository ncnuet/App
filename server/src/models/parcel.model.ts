import { ParcelBaseModel } from "./base/parcel.base";
import { resolveAddress } from "@/utils/resolve_add";
import { IParcelCreate, IParcelUpdate, IParcelUpdateStatus } from "@/validators/parcel.validator";

class ParcelModel {
    async create(data: IParcelCreate) {
        const response = await ParcelBaseModel.create({
            sending_add: resolveAddress(data.sending_add),
            receiving_add: resolveAddress(data.receiving_add),
            sender: data.sender,
            receiver: data.receiver,
            sending_office: data.sending_office,
            receiving_office: data.receiving_office,
            status: data.status,
            goods: data.goods,
            notes: data.notes
        })

        return response._id;
    }

    async delete(id: string, office_id: string) {
        const response = await ParcelBaseModel.deleteOne({
            _id: id,
            sending_office: office_id
        });

        return response.acknowledged
    }

    async update(id: string, office_id: string, data: Omit<IParcelUpdate, "id">) {
        const response = await ParcelBaseModel.updateOne({
            _id: id,
            sending_office: office_id
        }, {
            sending_add: data.sending_add ? resolveAddress(data.sending_add) : void 0,
            receiving_add: data.receiving_add ? resolveAddress(data.receiving_add) : void 0,
            sender: data.sender,
            receiver: data.receiver,
            receiving_office: data.receiving_office,
            status: data.status,
            goods: data.goods,
            notes: data.notes
        })

        return response.acknowledged;
    }

    async updateStatus(id: string, data: Omit<IParcelUpdateStatus, "id">) {
        const response = await ParcelBaseModel.updateOne({
            _id: id,
        }, {
            status: data.status
        })

        return response.acknowledged;
    }

    async getParcels(pid: string[]) {
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