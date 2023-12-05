import Image from "next/image"
import { MdContentCopy } from "react-icons/md"
import { toast } from "react-toastify"

interface IProps {
    pid: string
}

export default function QRCode({ pid }: IProps) {
    return (
        <section>
            <label className="text-sm block mb-2 font-semibold">Tracking link</label>
            <div className="flex justify-center items-center flex-col">
                <Image
                    alt="qrcode"
                    height={100} width={100}
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${process.env.NEXT_PUBLIC_DOMAIN + "/tracking/" + pid}&size=100x100`} />

                <div
                    className="px-4 py-2 rounded-full bg-cyellow-500 w-1/2 mt-5 flex items-center cursor-pointer"
                    onClick={() => {
                        navigator &&
                            navigator.clipboard.writeText(process.env.NEXT_PUBLIC_DOMAIN + "/tracking/" + pid)
                        toast.success("Đã copy thành công")
                    }}>

                    <span className="font-semibold truncate flex-grow overflow-hidden">
                        {pid}
                    </span>

                    <button className="ml-2 text-lg w-5 flex-none">
                        <MdContentCopy />
                    </button>
                </div>
            </div>
        </section>
    )
}