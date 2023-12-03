import Tippy from "@tippyjs/react"

interface IProps {
    loading: boolean
    pid?: string
    weight?: number
    sending_add?: string
    receiving_add?: string
}

export default function Summary({ loading, pid, weight, receiving_add, sending_add }: IProps) {
    return (
        !loading
            ? <section className="rounded-xl bg-cyellow-500 grid grid-cols-3 xs:grid-cols-9 gap-4 xs:gap-0 w-full p-5">
                <div className="text-white border-b-2 xs:border-r-2 xs:border-b-0 border-white border-dashed text-center col-span-3 px-1">
                    <p className="text-xs">Số hiệu bưu gửi</p>
                    <h3 className="font-semibold">{pid?.slice(0, 14)}</h3>
                </div>

                <div className="text-white border-b-2 xs:border-r-2 xs:border-b-0 border-white border-dashed text-center xs:col-span-2 col-span-3 px-1">
                    <p className="text-xs">Khối lượng</p>
                    <h3 className="font-semibold">{weight}</h3>
                </div>

                <div className="text-white border-b-2 xs:border-r-2 xs:border-b-0 border-white border-dashed text-center xs:col-span-2 col-span-3 px-2">
                    <p className="text-xs">Nơi gửi</p>
                    <Tippy
                        theme="light"
                        content={sending_add}>
                        <h3 className="font-semibold truncate">{sending_add}</h3>
                    </Tippy>


                </div>
                <div className="text-white text-center xs:col-span-2 col-span-3 px-2">
                    <p className="text-xs">Nơi nhận</p>
                    <Tippy
                        theme="light"
                        content={receiving_add}>
                        <h3 className="font-semibold truncate">{receiving_add}</h3>
                    </Tippy>
                </div>
            </section>
            : <section
                className="rounded-xl bg-yellow-200 w-full animate-pulse h-24 flex-none" >
            </section >
    )
}