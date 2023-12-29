interface IProps {
    start: {
        name?: string,
    },
    end: {
        name?: string,
    }
    loading?: boolean
}

export default function HeaderBanner(data: IProps) {
    return (
        !data.loading && (
            <section>
                <div className="rounded-xl bg-cyellow-500 w-full p-5">
                    <div className="flex gap-5 items-center">
                        <span className="material-symbols-rounded text-white flex-none">radio_button_checked</span>
                        <div className="relative flex-grow">
                            <span className="h-0 block border-b-2 border-white border-dashed"></span>
                            <div
                                className="absolute -top-5 left-[80%] h-8 w-8 bg-white rounded-full flex items-center justify-center border-4 border-cyellow-500 box-content">
                                <span className="material-symbols-rounded text-cyellow-500 text-[20px]">local_shipping</span>
                            </div>
                        </div>
                        <span className="material-symbols-rounded text-white flex-none">radio_button_checked</span>
                    </div>

                    <div className="flex justify-between mt-3">
                        <div className="text-left">
                            <p className="text-white text-xs">Điểm đi | 19:01</p>
                            <h3 className="text-cgray-600 font-semibold">{data.start.name}</h3>
                        </div>

                        <div className="text-right">
                            <p className="text-white text-xs">19:30 | Điểm đến</p>
                            <h3 className="text-cgray-600 font-semibold">{data.end.name}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-cblue-300 flex items-center gap-2">
                        <span className="material-symbols-rounded"> timelapse </span>
                        {"Khoảng 1 ngày 2h nữa sẽ đến nơi"}
                    </p>
                    <p className="text-cgray-600 flex items-center gap-2">
                        <span className="material-symbols-rounded">calendar_month</span>
                        {"23 thg 12 - 8h30"}
                    </p>
                </div>
            </section>
        )
    )
}