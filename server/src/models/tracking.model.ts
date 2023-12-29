import mongoose from "mongoose";
import { TrackingBaseModel } from "./base/tracking.base";

class TrackingModel {
    async create(data: { office: string, parcel: string, uid: string }) {
        const response = await TrackingBaseModel.create({
            parcel: data.parcel,
            events: [
                {
                    office: data.office,
                    name: "Created parcel",
                    responsor: data.uid,
                }
            ]
        })

        return response._id;
    }

    async push(parcel: string, data: { name: string, uid: string, office: string }) {
        const response = await TrackingBaseModel.updateOne({
            parcel: parcel
        }, {
            $push: {
                events: {
                    responsor: data.uid,
                    name: data.name,
                    office: data.office
                }
            }
        })

        return response.acknowledged;
    }

    async getByParcelID(pid: string) {
        const user = await TrackingBaseModel.find(
            { parcel: new mongoose.Types.ObjectId(pid) },
            { parcel: 1, events: 1, _id: 1 })
            .exec()

        return user.map(user => {
            const { _id, parcel, events } = user;
            return {
                tid: _id.toString(),
                parcel: parcel.toString(),
                events: events.map(event => ({
                    name: event.name,
                    responsor: event.responsor.toString(),
                    office: event.office.toString(),
                }))
            };
        })
    }
}
export default new TrackingModel();