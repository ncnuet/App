"use client"

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Navbar() {
    const { pid } = useParams();
    const pathname = usePathname();

    const links = [
        { name: "Thông tin bưu gửi", href: "/tracking/" + pid },
        { name: "Theo dõi bưu gửi", href: "/tracking/" + pid + "/status" },
    ]

    return (
        <nav>
            <ul className="flex gap-5 flex-none p-5">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className={
                            "cursor-pointer " +
                            (pathname === link.href
                                ? "text-cyellow-500 font-semibold pb-2 border-b-2 border-cyellow-500"
                                : "text-cgray-400")
                        }>
                        <Link href={link.href}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}