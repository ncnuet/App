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
        <section className="rounded-xl bg-cyellow-500 grid grid-cols-9 w-full p-5">
            <div className="text-white border-r-2 border-white border-dashed text-center col-span-3 px-1">
                <p className="text-xs">Số hiệu bưu gửi</p>
                <h3 className="font-semibold">{pid?.slice(0, 14)}</h3>
            </div>

            <div className="text-white border-r-2 border-white border-dashed text-center col-span-2 px-1">
                <p className="text-xs">Khối lượng</p>
                {loading
                    ? <h3 className="animate-pulse bg-yellow-400 rounded-md w-1/2 h-6 mx-auto my-1"></h3>
                    : <h3 className="font-semibold">{weight}</h3>}
            </div>

            <div className="text-white border-r-2 border-white border-dashed text-center col-span-2 px-2">
                <p className="text-xs">Nơi gửi</p>
                {loading
                    ? <h3 className="animate-pulse bg-yellow-400 rounded-md w-3/4 h-6 mx-auto my-1"></h3>
                    : <Tippy
                        theme="light"
                        content={sending_add}>
                        <h3 className="font-semibold truncate">{sending_add}</h3>
                    </Tippy>}

            </div>
            <div className="text-white text-center col-span-2 px-2">
                <p className="text-xs">Nơi nhận</p>
                {loading
                    ? <h3 className="animate-pulse bg-yellow-400 rounded-md w-3/4 h-6 mx-auto my-1"></h3>
                    : <Tippy
                        theme="light"
                        content={receiving_add}>
                        <h3 className="font-semibold truncate">{receiving_add}</h3>
                    </Tippy>}

            </div>
        </section>
    )
}