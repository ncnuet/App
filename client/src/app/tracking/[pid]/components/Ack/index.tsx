import { ParcelDetail } from "@/redux/services/queries/details.parcel"

interface IProps {
    loading: boolean,
    data?: ParcelDetail
}

export default function Ack({ loading, data }: IProps) {
    return loading
        ? <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            < div className="flex flex-col gap-3" >
                <div className="flex justify-between items-center h-6 gap-2">
                    <div className="bg-gray-200 animate-pulse rounded-md h-full w-1/5"></div>
                    <div className="bg-gray-200 animate-pulse rounded-md h-full w-3/5"></div>
                </div>
                <div className="flex justify-between items-center h-6 gap-2">
                    <div className="bg-gray-200 animate-pulse rounded-md h-full w-4/12"></div>
                    <div className="bg-gray-200 animate-pulse rounded-md h-full w-8/12"></div>
                </div>
            </div >
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center h-6 gap-2">
                    <div className="bg-gray-200 animate-pulse rounded-md h-full w-2/5"></div>
                    <div className="bg-gray-200 animate-pulse rounded-md h-full w-3/5"></div>
                </div>
            </div>
        </section >
        : <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm">Giờ nhận</span>
                    <span className="font-semibold">18:00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">Ngày nhận</span>
                    <span className="font-semibold">20/12/2023</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm">Địa chỉ nhận</span>
                    <span className="font-semibold">làng Mây</span>
                </div>
            </div>
        </section>
}