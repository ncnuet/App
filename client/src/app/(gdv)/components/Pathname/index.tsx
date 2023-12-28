"use client"

import { usePathname } from "next/navigation"

export default function Pathname() {
    const path = usePathname();
    const subpaths = path.slice(1).split("/");

    return (
        <div className="flex flex-col gap-2 text-sm font-normal xs:justify-start justify-center">
            <div className="hidden xs:block">
                <span className=" text-blue-400">Pages </span>
                {
                    subpaths.length > 1
                        ? subpaths.slice(0, -1).map((item, index) => (
                            <span key={index} className="text-cblue-600">/ {item}</span>
                        ))
                        : <span className="text-cblue-600">/</span>
                }
            </div>
            <span className="hidden xs:block text-base text-cblue-600 font-bold">
                {subpaths[subpaths.length - 1]}
            </span>
        </div>
    )
}