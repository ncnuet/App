import { Goods } from "@/redux/services/queries/details.parcel"

interface IProps {
    loading: boolean
    goods?: Goods[]
}

export default function Goods({ goods, loading }: IProps) {
    return (
        <section>
            <label className="text-sm block mb-2 font-semibold">Danh sách bưu gửi</label>

            {loading
                ? <div className="p-5 bg-cgray-100 rounded-lg w-full animate-pulse h-28"></div>
                : <div className="p-5 bg-cgray-100 rounded-lg w-full text-cgray-600">
                    {goods?.map((item => (
                        <div className="flex mb-2">
                            <div className="flex-[5]">
                                <span className="text-sm text-cgray-400">{item.category}</span>
                                <p className="font-semibold">{item.name}</p>
                            </div>
                            <div className="flex-[1] text-right">
                                <span className="text-sm text-cgray-400">Cân nặng</span>
                                <p className="font-semibold">{item.quantity} x {item.weight}</p>
                            </div>
                        </div>
                    )))}
                </div>
            }


        </section>
    )
}