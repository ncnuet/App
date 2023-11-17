import mongoose from "mongoose";
import { TrackingBaseModel } from "./base/tracking.base";

class TrackingModel {
    async getTrackingByParcelID(pid: string) {
        const user = await TrackingBaseModel.find(
            { parcel: new mongoose.Types.ObjectId(pid) },
            { post_office: 1, parcel: 1, events: 1, _id: 1 })
            .exec()

        return user.map(user => {
            const { _id, parcel, post_office, events } = user;
            return {
                tid: _id.toString(),
                parcel: parcel.toString(),
                post_office: post_office.toString(),
                events
            };
        })
    }
}
export default new TrackingModel();