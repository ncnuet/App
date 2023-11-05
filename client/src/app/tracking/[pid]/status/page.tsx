export default function PackageStatus() {
    return (
        <main className="flex flex-col gap-5 h-full overflow-y-scroll p-7 list">
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
                            <h3 className="text-cgray-600 font-semibold">Mê Linh SOC</h3>
                        </div>

                        <div className="text-right">
                            <p className="text-white text-xs">19:30 | Điểm đến</p>
                            <h3 className="text-cgray-600 font-semibold">Hà Nội SOC</h3>
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

            <section className="relative">
                <div className="absolute top-0 left-9 h-full w-fit py-10">
                    <div className="w-0 h-full border-l-2 border-dashed border-cyellow-300">
                    </div>
                </div>

                <div className="flex justify-between items-center p-5">
                    <div className="flex flex-none gap-4 items-center">
                        <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full bg-cyellow-500">
                            <span className="material-symbols-rounded text-black text-[16px]">inventory_2</span>
                        </div>
                        <div>
                            <div className="text-xs text-cgray-400">
                                <span className="">19:31</span>
                                <span className="ml-3">20/11/2023</span>
                            </div>
                            <h3 className="font-semibold">Tuyên Quang SOC</h3>
                        </div>
                    </div>
                    <div className="flex items-center text-cgray-400">
                        <span className="material-symbols-rounded">pin_drop</span>
                        <p className="ml-3 text-sm">Sóc Sơn, Hà Nội</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-0 left-20 h-full w-fit py-10">
                        <div className="w-0 h-full border-l-2 border-dashed border-cyellow-300">
                        </div>
                    </div>
                    <div className="p-3 rounded-xl shadow-sd1 box-border bg-white relative z-20 border border-stroke-color flex gap-5 flex-col">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-none gap-4 items-center">
                                <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full bg-cyellow-500">
                                    <span className="material-symbols-rounded text-black text-[16px]">inventory_2</span>
                                </div>
                                <div>
                                    <div className="text-xs text-cgray-400">
                                        <span className="">19:31</span>
                                        <span className="ml-3">20/11/2023</span>
                                    </div>
                                    <h3 className="font-semibold">Tuyên Quang SOC</h3>
                                </div>
                            </div>
                            <div className="flex items-center text-cgray-400">
                                <span className="material-symbols-rounded">pin_drop</span>
                                <p className="ml-3 text-sm">Sóc Sơn, Hà Nội</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 rounded-lg bg-cgray-100 p-3">
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-cgray-600">Vị trí</span>
                                <div className="flex items-center tetx-cgray-500">
                                    <span className="material-symbols-rounded text-[16px]">pin_drop</span>
                                    <p className="ml-3">Số 305, Phố Tây Sơn, Phường La Mã, Hà Nội</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-cgray-600">Trạng thái</span>
                                <div className="flex items-center text-white px-3 py-1 bg-cgreen-400 rounded-full">
                                    <span className="material-symbols-rounded text-[16px]">pin_drop</span>
                                    <p className="ml-3">Chấp nhận gửi</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-cgray-600">Nhân viên tiếp nhận</span>
                                <div className="flex items-center text-white px-3 py-1 bg-cblue-300 rounded-full">
                                    <span className="material-symbols-rounded text-[16px]">girl</span>
                                    <p className="ml-3">Trịnh Thu Hằng</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-5 ml-10">
                        <div className="flex flex-none gap-4 items-center">
                            <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full">
                                <span className="material-symbols-rounded text-cyellow-500 flex-none">radio_button_checked</span>
                            </div>
                            <div>
                                <div className="text-xs text-cgray-400">
                                    <span className="">19:31</span>
                                    <span className="ml-3">20/11/2023</span>
                                </div>
                                <h3 className="font-semibold">Tuyên Quang SOC</h3>
                            </div>
                        </div>
                        <div className="flex items-center text-cgray-400">
                            <span className="material-symbols-rounded">pin_drop</span>
                            <p className="ml-3 text-sm">Sóc Sơn, Hà Nội</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-5 ml-10">
                        <div className="flex flex-none gap-4 items-center">
                            <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full">
                                <span className="material-symbols-rounded text-cyellow-500 flex-none">radio_button_checked</span>
                            </div>
                            <div>
                                <div className="text-xs text-cgray-400">
                                    <span className="">19:31</span>
                                    <span className="ml-3">20/11/2023</span>
                                </div>
                                <h3 className="font-semibold">Tuyên Quang SOC</h3>
                            </div>
                        </div>
                        <div className="flex items-center text-cgray-400">
                            <span className="material-symbols-rounded">pin_drop</span>
                            <p className="ml-3 text-sm">Sóc Sơn, Hà Nội</p>
                        </div>
                    </div>

                </div>

                <div className="flex justify-between items-center p-5">
                    <div className="flex flex-none gap-4 items-center">
                        <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full bg-cyellow-500">
                            <span className="material-symbols-rounded text-black text-[16px]">inventory_2</span>
                        </div>
                        <div>
                            <div className="text-xs text-cgray-400">
                                <span className="">19:31</span>
                                <span className="ml-3">20/11/2023</span>
                            </div>
                            <h3 className="font-semibold">Tuyên Quang SOC</h3>
                        </div>
                    </div>
                    <div className="flex items-center text-cgray-400">
                        <span className="material-symbols-rounded">pin_drop</span>
                        <p className="ml-3 text-sm">Sóc Sơn, Hà Nội</p>
                    </div>
                </div>
            </section>
        </main>
    )
}