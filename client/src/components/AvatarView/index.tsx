"use client"

import Image from "next/image";
import prettyGirl from "@/assets/images/girl.png";

export default function AvatarView({ avatar, name }: { avatar: string, name: string }) {
    return (
        <div className="flex flex-col gap-3 rounded-[15px] mt-3">
            <div className="flex flex-col gap-3 pb-[30px] px-[30px]">
                <div className="flex flex-col items-center select-none">
                    <Image
                        src={avatar ? avatar : prettyGirl}
                        alt="good-girl"
                        width={50}
                        height={50}
                        className="flex-none w-24 h-24 rounded-[24px] outline outline-cyellow-500 object-scale-down"
                    />

                    <span className="text-xl mt-3">  {name ? name : "Hãy cứ vui cươi"}</span>
                </div>

                <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent"></div>
            </div>
        </div>
    )
}