"use client"

import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetParcelDetailsQuery } from "@/redux/services/parcel.api";
import { ParcelDetail } from "@/redux/services/queries/details.parcel";
import Details from "./components/Details";
import Goods from "./components/Goods";
import QRCode from "./components/QRCode";
import Notes from "./components/Notes";
import Ack from "./components/Ack";
import { toast } from "react-toastify";

export default function Main() {
    const { pid } = useParams();
    const [parcel, setParcel] = useState<ParcelDetail>()
    const [loading, setLoading] = useState<boolean>(true)

    const { data, isSuccess } = useGetParcelDetailsQuery({ pid: pid as string })

    useEffect(() => {
        if (isSuccess) {
            data.data.parcels && data.data.parcels.length > 0
                ? setParcel(data?.data.parcels[0]) == void 0 && setLoading(false)
                : toast.error("Không thể tải nội dung")
                ;
        }
    }, [data])

    return (
        <main className="flex flex-col gap-5 h-full overflow-y-scroll p-7 list">
            <Summary
                loading={loading}
                pid={pid as string}
                weight={0}
                receiving_add={parcel?.receiving_add.province?.name || ""}
                sending_add={parcel?.sending_add.province?.name || ""}
            />

            <Details loading={loading} data={parcel} />
            <Ack loading={loading} data={parcel} />

            <Notes loading={loading} notes={parcel?.notes} />
            <Goods loading={loading} goods={parcel?.goods} />
            <QRCode pid={pid as string} />
        </main>
    )
}