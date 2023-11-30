"use client"

import { parcelState } from "@/redux/features/parcel.slice"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Tracking() {
    const parcels = useAppSelector(parcelState)
    const router = useRouter();

    useEffect(() => {
        parcels.parcels.length === 0 && console.log("Khong co du lieu")
    }, [])
    return (
        <main>
            <section>

            </section>
        </main>
    )
}