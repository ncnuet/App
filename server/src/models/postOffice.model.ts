import { IOfficeCreate, IOfficeUpdate } from "@/validators/office.validator";
import { PostOfficeBaseModel } from "./base/post_office.base";
import { findLevel1ById } from 'dvhcvn'

class PostOfficeModel {
    async create(data: IOfficeCreate) {
        const _province = findLevel1ById("01");
        const province = { id: _province.id, name: _province.name }
        const _district = _province.findLevel2ById("001")
        const district = { id: _district.id, name: _district.name }
        const _commune = _district.findLevel3ById("00001")
        const commune = { id: _commune.id, name: _commune.name }

        const address = {
            country: { name: "Việt Nam", id: "vi" },
            province,
            district,
            commune,
            detail: data.address.detail
        }

        const response = await PostOfficeBaseModel.create({
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
        const response = await PostOfficeBaseModel.deleteOne({ _id: id });
        return response.acknowledged;
    }

    async update(id: string, data: Omit<IOfficeUpdate, "id">) {
        const response = await PostOfficeBaseModel.updateOne({
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

    async getPostOffices(poid: string[]) {
        const post_offices = await PostOfficeBaseModel.find(
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

export default new PostOfficeModel();