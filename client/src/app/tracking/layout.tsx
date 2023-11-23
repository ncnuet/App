"use client"

import { useAppDispatch } from "@/redux/hooks";
import { memo, useEffect, useState } from "react";
import { useGetParcelStatusQuery } from "@/redux/services/parcel.api";
import { setParcels } from "@/redux/features/parcel.slice";

export default memo(function TrackingLayout({ children }: { children: React.ReactNode; }) {
    const dispatch = useAppDispatch();
    const [oldData, setOldData] = useState<string[]>([]);
    const { isLoading, isFetching, data, error } = useGetParcelStatusQuery({ pids: oldData });

    useEffect(() => {
        try {
            const tracking_pids: string[] = JSON.parse(localStorage.getItem("tracking_pids") || "[]");
            setOldData(tracking_pids);

        } catch (error) {

            // TODO: show error message
            console.log("Loi roi");
            console.log(error);
        }
    }, [])


    useEffect(() => {
        if (!(isLoading || isFetching || error)) {
            dispatch(setParcels(data?.data.parcels))
        }
    }, [isLoading, isFetching])

    return (
        <main className="flex">
            {children}
        </main>
    )
})