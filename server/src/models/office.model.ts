import { IOfficeCreate, IOfficeUpdate } from "@/validators/office.validator";
import { OfficeBaseModel } from "./base/office.base";
import { findLevel1ById } from 'dvhcvn'
import { resolveAddress } from "@/utils/resolve_add";

class OfficeModel {
    async create(data: IOfficeCreate) {
       const address = resolveAddress(data.address)

        const response = await OfficeBaseModel.create({
            name: data.name,
            address,
            manager: data.manager,
            contact: data.contact,
            post_office_type: data.post_office_type,
            gather_office: data.gather_office
        })

        return response._id;
    };

    async delete(id: string) {
        const response = await OfficeBaseModel.deleteOne({ _id: id });
        return response.acknowledged;
    }

    async update(id: string, data: Omit<IOfficeUpdate, "id">) {
        const response = await OfficeBaseModel.updateOne({
            _id: id,
        }, {
            name: data.name,
            address: data.address,
            manager: data.manager,
            contact: data.contact,
            post_office_type: data.post_office_type,
            gather_office: data.gather_office
        })

        return response.acknowledged;
    }

    async getOffices(poid: string[]) {
        const post_offices = await OfficeBaseModel.find(
            { _id: { $in: poid } }
        ).exec();

        return post_offices.map(offices => {
            const { _id, name, address, contact, post_office_type, manager, gather_office } = offices
            return {
                poid: _id.toString(),
                name, address, contact, post_office_type,
                manager: manager.toString(),
                gather_office: gather_office.toString()
            }
        });
    }
}

export default new OfficeModel();