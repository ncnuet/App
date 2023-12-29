import { IOfficeCreate, IOfficeUpdate } from "@/validators/office.validator";
import { OfficeBaseModel } from "./base/office.base";
import { resolveAddress, resolveAddress2 } from "@/utils/resolve_add";
import { EOfficeType } from "./schema/office.schema";

class OfficeModel {
    async create(data: IOfficeCreate) {
        const address = resolveAddress2(data.address)

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
        const address = resolveAddress2(data.address)

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

    async getOffices(poid?: string[]) {
        const post_offices = await OfficeBaseModel.find(
            poid
                ? { _id: { $in: poid } }
                : {}
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

    async getOfficeGather(name: string) {
        const post_offices = await OfficeBaseModel.find(
            {
                office_type: EOfficeType.Gathering,
                $text: {
                    $search: name || ""
                }
            },
            { score: { $meta: 'textScore' } }
        ).exec();

        return post_offices.map(offices => {
            const { _id, name } = offices
            return {
                name,
                poid: _id.toString()
            }
        });
    }
}

export default new OfficeModel();