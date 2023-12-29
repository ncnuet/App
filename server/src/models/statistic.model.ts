import { StatisticBaseModel } from "./base/statistic.base";
import { IStatisticDB } from "./schema/statistic.schema";

export interface IStatisticAdd {
    parcels: String[],
}

export interface IStatisticDelete {
    parcels: String[],
}

export interface IStatisticCreate extends IStatisticDB{

}

class StatisticModel {
    async getStatistic(sid: string[]) {
        const statistic = await StatisticBaseModel.find(
            { _id: { $in: sid } },
        ).exec();

        return statistic
    }

    async create(data: IStatisticCreate) {
        const result = await StatisticBaseModel.create({
            office: data.office,
            in: data.in,
            out: data.out
        })

        return result;
    }

    async addIn(data : IStatisticAdd, office: string) {
        const result = await StatisticBaseModel.updateOne(
            { office: office },
            { $push: { in: { $each: data.parcels } } }
        );

        return result;
    }

    async deleteIn(data: IStatisticDelete, office: string) {
        const result = await StatisticBaseModel.updateOne(
            { office: office },
            { $pull: { in: { $in: data.parcels } } }
        );

        return result
    }

    async addOut(data : IStatisticAdd, office: string) {
        const result = await StatisticBaseModel.updateOne(
            { office: office },
            { $push: { out: { $each: data.parcels } } }
        );

        return result;
    }

    async deleteOut(data: IStatisticDelete, office: string) {
        const result = await StatisticBaseModel.updateOne(
            { office: office },
            { $pull: { out: { $in: data.parcels } } }
        );

        return result
    }
}

export default new StatisticModel();