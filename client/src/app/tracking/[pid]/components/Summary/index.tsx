interface IProps {
    pid: string
    weight: number
    sending_add: string
    receiving_add: string
}

export default function Summary({ pid, weight, receiving_add, sending_add }: IProps) {
    return (
        <section className="rounded-xl bg-cyellow-500 grid grid-cols-9 w-full p-5">
            <div className="text-white border-r-2 border-white border-dashed text-center col-span-3">
                <p className="text-xs">Số hiệu bưu gửi</p>
                <h3 className="font-semibold">{pid}</h3>
            </div>
            <div className="text-white border-r-2 border-white border-dashed text-center col-span-2">
                <p className="text-xs">Khối lượng</p>
                <h3 className="font-semibold">{weight}</h3>
            </div>
            <div className="text-white border-r-2 border-white border-dashed text-center col-span-2">
                <p className="text-xs">Nơi gửi</p>
                <h3 className="font-semibold">{sending_add}</h3>
            </div>
            <div className="text-white text-center col-span-2">
                <p className="text-xs">Nơi nhận</p>
                <h3 className="font-semibold">{receiving_add}</h3>
            </div>
        </section>
    )
}