"use client"

import { useAppSelector } from "@/redux/hooks";
import PackageNavItem from "../PackageNavItem";
import { parcelState } from "@/redux/features/parcel.slice";
import { memo } from "react";

export default memo(function GroupPackageNavItem() {
    const parcel = useAppSelector(parcelState)
    console.log(parcel);

    return (
        <>
            <div className="flex flex-col gap-5 h-full overflow-y-scroll px-4 py-4 list">
                {parcel.parcels.map(parcel => (
                    <PackageNavItem
                        key={parcel.pid}
                        to={parcel.sending_add.province.name}
                        from={parcel.receiving_add.province.name}
                        pid={parcel.pid}
                        status={parcel.status}
                    />))}
            </div>
        </>
    )
})