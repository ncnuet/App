"use client"

import { useAppDispatch } from "@/redux/hooks";
import { memo, useEffect } from "react";
import { getParcelStatus } from "@/redux/services/parcel.api";
import { setError, setParcels } from "@/redux/features/parcel.slice";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { toast } from "react-toastify";

export default memo(function TrackingLayout({ children }: { children: React.ReactNode; }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function internal() {
            try {
                dispatch(setError(false))
                const pids: string[] = JSON.parse(localStorage.getItem("tracking_pids") || "[]");
                const response = await getParcelStatus(pids);

                if (response.data.data.parcels.length === 0) dispatch(setError(true))
                dispatch(setParcels(response.data.data.parcels || []))
            } catch (error) {
                dispatch(setError(true))
                toast.error("Không tải được tài nguyên")
                console.log(error);
            }
        }
        internal();
    }, [])

    return (
        <main className="flex">
            {children}
        </main>
    )
})