"use client"

import prettyGirl from "@/assets/images/girl.png";
import { logout, profileState } from "@/redux/features/profile.slice";
import { useAppSelector } from "@/redux/hooks";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

function OptionMenu() {
    const dispatch = useDispatch();
    const router = useRouter()

    function onClickLogout() {
        dispatch(logout({}))
        router.replace('/login')
    }

    return (
        <div className="py-1 w-36">
            <button
                onClick={onClickLogout}
                className="hover:bg-cyellow-300 p-2 cursor-pointer rounded-sm hover:text-black w-full flex items-center">
                <span className="text-xl font-semibold"><IoIosLogOut /></span>
                <span className="ml-3">Logout</span>
            </button>
        </div>
    )
}

export default function NameArea() {
    const user = useAppSelector(profileState)

    return (
        <div className="ml-5 flex flex-row gap-2 items-center">
            <div className="hidden sm:flex flex-col items-end">
                <span className="line-clamp-1 md:text-clip text-sm text-cblue-600 font-medium">
                    {user.name}
                </span>
                <span className="text-xs text-cblue-600 font-normal">
                    {user.role}
                </span>
            </div>

            <Tippy content={<OptionMenu />} trigger="click" interactive theme="light">
                <button>
                    <Image
                        src={prettyGirl}
                        alt="pretty girl"
                        className="h-9 w-9 rounded-[18px] object-cover flex-none"
                        loading="lazy"
                    />
                </button>
            </Tippy>

        </div>
    )
}