import { IAddress } from "@/validators/base.validator";
import { findLevel1ById } from "dvhcvn";

export function resolveAddress(address: IAddress) {
    if (address) {
        const _province = findLevel1ById(address.province.id);
        const province = { id: _province.id, name: _province.name }
        const _district = _province.findLevel2ById(address.district.id)
        const district = { id: _district.id, name: _district.name }
        const _commune = _district.findLevel3ById(address.commune.id)
        const commune = { id: _commune.id, name: _commune.name }

        return {
            country: { name: "Việt Nam", id: "vi" },
            province,
            district,
            commune,
            detail: address.detail
        }
    } else return void 0;
}