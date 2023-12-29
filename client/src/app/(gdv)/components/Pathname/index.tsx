"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Pathname() {
    const pathname = usePathname();
    const subpaths = pathname.slice(1).split("/");

    return (
        <div className="flex flex-col gap-2 text-sm font-normal xs:justify-start justify-center">
            <div className="hidden xs:block">
                <span className=" text-blue-400">Pages </span>
                {
                    subpaths.length > 1
                        ? subpaths.slice(0, -1).map((item, index) => (
                            <Link
                                href={"/" + subpaths.slice(0, index + 1).join("/")}
                                key={index}
                                className="text-cblue-600 cursor-pointer hover:text-blue-400">
                                / {item}
                            </Link>
                        ))
                        : <span className="text-cblue-600">/</span>
                }
            </div>
            <Link
                href={pathname}
                className="hidden xs:block text-base text-cblue-600 font-bold">
                {subpaths[subpaths.length - 1]}
            </Link>
        </div>
    )
}