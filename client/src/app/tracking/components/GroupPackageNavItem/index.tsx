"use client"

import { useAppSelector } from "@/redux/hooks";
import PackageNavItem from "../PackageNavItem";
import { parcelState } from "@/redux/features/parcel.slice";
import { memo } from "react";

export default memo(function GroupPackageNavItem() {
    const { parcels, isError } = useAppSelector(parcelState)

    return (
        <>
            <div className="flex flex-col gap-5 h-full overflow-y-scroll px-4 py-4 list">
                {
                    parcels.length > 0
                        ? parcels.map(parcel => (
                            <PackageNavItem
                                key={parcel.pid}
                                to={parcel.sending_add.province.name}
                                from={parcel.receiving_add.province.name}
                                pid={parcel.pid}
                                status={parcel.status}
                            />))
                        : !isError
                            ? [1, 2, 3].map(item => (
                                <div
                                    key={item}
                                    className="h-10 w-full lg:h-24 animate-pulse bg-gray-300 rounded-xl">
                                </div>
                            ))
                            : <></>
                }
            </div>
        </>
    )
})