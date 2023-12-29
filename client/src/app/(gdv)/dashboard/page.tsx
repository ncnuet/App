import ImgMailRocket from "@/assets/images/mailrocket.png"
import Image from "next/image"

export default function Dashboard() {
    return (
        <div className="p-10">
            <div className="flex flex-col items-center justify-center">
                <Image
                    alt="mail" src={ImgMailRocket}
                    className="" />
            </div>
        </div>
    )
}