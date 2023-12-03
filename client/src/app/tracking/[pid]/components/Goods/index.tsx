import { Goods } from "@/redux/services/queries/details.parcel"

interface IProps {
    loading: boolean
    goods?: Goods[]
}

export default function Goods({ goods, loading }: IProps) {
    return loading
        ?
        <section>
            <div className="h-4 w-2/6 rounded-md bg-gray-200 mb-2"></div>
            <div className="p-5 bg-cgray-100 rounded-lg w-full animate-pulse">
                {[1, 2].map(item => (
                    <div
                        key={item}
                        className="flex mb-5 justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="bg-gray-200 rounded-md h-4 w-[50px]"></div>
                            <div className="bg-gray-300 rounded-md h-4 w-[150px]"></div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="bg-gray-200 rounded-md h-4 w-[50px]"></div>
                            <div className="bg-gray-300 rounded-md h-4 w-[100px]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        : <section>
            <label className="text-sm block mb-2 font-semibold">Danh sách bưu gửi</label>
            <div className="p-5 bg-cgray-100 rounded-lg w-full text-cgray-600">
                {goods?.map(((item, index) => (
                    <div className="flex mb-5" key={index}>
                        <div className="flex-[5]">
                            <span className="text-sm text-cgray-400">{item.category}</span>
                            <p className="font-semibold">{item.name}</p>
                        </div>
                        <div className="flex-[1] text-right">
                            <span className="text-sm text-cgray-400 truncate">Cân nặng</span>
                            <p className="font-semibold">{item.quantity} x {item.weight}</p>
                        </div>
                    </div>
                )))}
            </div>
        </section>
}