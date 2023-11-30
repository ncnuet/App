"use client"

import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetParcelDetailsQuery } from "@/redux/services/parcel.api";
import { ParcelDetail } from "@/redux/services/queries/details.parcel";
import Details from "./components/Details";
import Goods from "./components/Goods";
import QRCode from "./components/QRCode";

export default function Main() {
    const { pid } = useParams();
    const [parcel, setParcel] = useState<ParcelDetail>()
    const [loading, setLoading] = useState<boolean>(false)

    const { data, isSuccess } = useGetParcelDetailsQuery({ pid: pid as string })

    useEffect(() => {
        if (isSuccess) {
            setParcel(data?.data.parcels[0])
        }
    }, [data])

    return (
        parcel &&
        <main className="flex flex-col gap-5 h-full overflow-y-scroll p-7 list">
            <Summary
                pid={parcel && parcel.pid.slice(0, 14) || ""}
                weight={0}
                receiving_add={parcel && parcel.receiving_add.province?.name || ""}
                sending_add={parcel && parcel.sending_add.province?.name || ""}
            />

            <Details data={parcel} />

            <section className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Ngày nhận</span>
                        <span className="font-semibold">20/12/2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Giờ nhận</span>
                        <span className="font-semibold">18:00</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Địa chỉ nhận</span>
                        <span className="font-semibold">làng Mây</span>
                    </div>
                </div>
            </section>

            <section>
                <label className="text-sm block mb-2 font-semibold">Ghi chú của khách hàng</label>
                <textarea
                    disabled defaultValue={parcel.notes}
                    rows={5}
                    className="bg-cgray-100 rounded-xl w-full" />
            </section>

            <Goods goods={parcel.goods} />
            <QRCode pid={pid as string} />
        </main> ||
        <span>Loading</span>
    )
}