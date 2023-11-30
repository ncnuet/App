"use client"

import { parcelState } from "@/redux/features/parcel.slice"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import ImgEmpty from "@/assets/images/empty.png"
import Image from "next/image"

export default function Tracking() {
    const { parcels } = useAppSelector(parcelState)
    const router = useRouter();

    useEffect(() => {
        parcels.length === 0
            ? console.log("Khong co du lieu")
            : router.replace("/tracking/" + parcels[0].pid)
    }, [parcels])
    return (
        <main>
            <section className="flex flex-col items-center">
                <div className="w-1/2">
                    <Image
                        alt="empty"
                        src={ImgEmpty}
                        className="object-scale-down"
                    />
                </div>
                <p className="text-gray-400">Không có đơn nào để xem</p>
            </section>
        </main>
    )
}