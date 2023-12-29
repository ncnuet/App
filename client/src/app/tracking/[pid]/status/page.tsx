"use client"

import { useGetParcelDetailsQuery } from "@/redux/services/parcel.api"
import { ParcelDetail } from "@/redux/services/queries/details.parcel";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderBanner1 from "./components/HeaderBanner";
import MainEvent from "./components/MainEvent";
import { getTrackingStatus } from "@/redux/services/tracking.api";
import { TrackingStatus } from "@/redux/services/queries/tracking.parcel";

export default function PackageStatus() {
    const { pid } = useParams();

    const [parcel, setParcel] = useState<ParcelDetail>()
    const [loading, setLoading] = useState<boolean>(true)
    const [tracking, setTracking] = useState<TrackingStatus>()
    const { data, isSuccess } = useGetParcelDetailsQuery({ pid: pid as string })


    async function getTracking() {
        const tmp = await getTrackingStatus(pid as string);
        if (tmp.status === 200) {
            console.log(tmp.data);            
            setTracking(tmp.data.data.tracking[0])
        }
    }

    useEffect(() => {
        getTracking();
        if (isSuccess) {
            data.data.parcels && data.data.parcels.length > 0
                ? setParcel(data?.data.parcels[0]) == void 0 && setLoading(false)
                : toast.error("Không thể tải nội dung")
        }
    }, [data])

    return (
        <main className="flex flex-col gap-5 h-full overflow-y-scroll p-7 list">
            <HeaderBanner1
                loading={loading}
                start={{ name: parcel?.sending_add.province?.name }}
                end={{ name: parcel?.receiving_add.province?.name }}
            />

            <section className="relative">
                <div className="absolute top-0 left-9 h-full w-fit py-10">
                    <div className="w-0 h-full border-l-2 border-dashed border-cyellow-300">
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-0 left-24 h-full w-fit py-10">
                        <div className="w-0 h-full border-l-2 border-dashed border-cyellow-300">
                        </div>
                    </div>

                    <div className="p-3 rounded-xl shadow-sd1 box-border bg-white relative z-20 border border-stroke-color flex gap-5 flex-col">
                        <MainEvent expanded />

                        <div className="flex flex-col gap-2 rounded-lg bg-cgray-100 p-3">
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-cgray-600">Vị trí</span>
                                <div className="flex items-center tetx-cgray-500">
                                    <span className="material-symbols-rounded text-[16px]">pin_drop</span>
                                    <p className="ml-3">Số 305, Phố Tây Sơn, Phường La Mã, Hà Nội</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-cgray-600">Trạng thái</span>
                                <div className="flex items-center text-white px-3 py-1 bg-cgreen-400 rounded-full">
                                    <span className="material-symbols-rounded text-[16px]">pin_drop</span>
                                    <p className="ml-3">Chấp nhận gửi</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-cgray-600">Nhân viên tiếp nhận</span>
                                <div className="flex items-center text-white px-3 py-1 bg-cblue-300 rounded-full">
                                    <span className="material-symbols-rounded text-[16px]">girl</span>
                                    <p className="ml-3">Trịnh Thu Hằng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <MainEvent />
                <MainEvent />
            </section>
        </main>
    )
}