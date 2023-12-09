import { IOfficeCreate, IOfficeUpdate } from "@/validators/office.validator";
import { OfficeBaseModel } from "./base/office.base";
import { resolveAddress } from "@/utils/resolve_add";

class OfficeModel {
    async create(data: IOfficeCreate) {
        const address = resolveAddress(data.address)

        const response = await OfficeBaseModel.create({
            name: data.name,
            address,
            manager: data.manager,
            contact: data.contact,
            office_type: data.office_type,
            gather_office: data.gather_office
        })

        return response._id;
    };

    async update(id: string, data: Omit<IOfficeUpdate, "id">) {
        const address = resolveAddress(data.address)

        const response = await OfficeBaseModel.updateOne({
            _id: id,
        }, {
            name: data.name,
            address: address,
            manager: data.manager,
            contact: data.contact,
            office_type: data.office_type,
            gather_office: data.gather_office
        })

        return response.acknowledged;
    }

    async delete(id: string) {
        const response = await OfficeBaseModel.deleteOne({ _id: id });
        return response.acknowledged;
    }

    async getOffices(poid: string[]) {
        const post_offices = await OfficeBaseModel.find(
            { _id: { $in: poid } }
        ).exec();

        return post_offices.map(offices => {
            const { _id, name, address, contact, office_type, manager, gather_office } = offices
            return {
                name, address, contact, office_type,
                poid: _id.toString(),
                manager: manager ? manager.toString() : null,
                gather_office: gather_office ? gather_office.toString() : null
            }
        });
    }
}

export default new OfficeModel();