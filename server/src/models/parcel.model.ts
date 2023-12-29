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
            notes: data.notes,
            return_type: data.return_type,
            cost_type: data.cost_type,
            cost: data.cost,
            goods_type: data.goods_type,
            creator: data.creator
        })

        return response._id;
    }

    async update(id: string, office_id: string, data: Omit<IParcelUpdate, "id">) {
        const response = await ParcelBaseModel.updateOne({
            _id: id,
            sending_office: office_id
        }, {
            sending_add: resolveAddress(data.sending_add),
            receiving_add: resolveAddress(data.receiving_add),
            sender: data.sender,
            receiver: data.receiver,
            receiving_office: data.receiving_office,
            status: data.status,
            goods: data.goods,
            notes: data.notes,
            return_type: data.return_type,
            cost_type: data.cost_type,
            cost: data.cost,
            goods_type: data.goods_type,
        })

        return response.acknowledged;
    }

    async delete(id: string, office_id: string) {
        const response = await ParcelBaseModel.deleteOne({
            _id: id,
            sending_office: office_id
        });

        return response.acknowledged
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
                sending_office, receiving_office, creator,
                goods_type, cost, cost_type, return_type,
            } = parcel;

            return {
                pid: _id.toString(),
                sender, sending_add, receiver,
                receiving_add, status, goods, notes,
                goods_type, cost, cost_type, return_type,
                sending_office: sending_office ? sending_office.toString() : null,
                receiving_office: receiving_office ? receiving_office.toString() : null,
                creator: creator ? creator.toString() : null,
            }
        })
    }

    async getParcelsByCreator (creator : string) {
        const result = await ParcelBaseModel.find({
            creator: creator
        })

        return result
    }
}

export default new ParcelModel();