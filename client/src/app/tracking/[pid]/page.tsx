import Image from "next/image";

export default function Main() {
    return (
        <main className="flex flex-col gap-5 h-full overflow-y-scroll p-7 list">
            <section className="rounded-xl bg-cyellow-500 grid grid-cols-9 w-full p-5">
                <div className="text-white border-r-2 border-white border-dashed text-center col-span-3">
                    <p className="text-xs">Số hiệu bưu gửi</p>
                    <h3 className="font-semibold">EB14453131VN</h3>
                </div>
                <div className="text-white border-r-2 border-white border-dashed text-center col-span-2">
                    <p className="text-xs">Khối lượng</p>
                    <h3 className="font-semibold">99 gram</h3>
                </div>
                <div className="text-white border-r-2 border-white border-dashed text-center col-span-2">
                    <p className="text-xs">Nơi gửi</p>
                    <h3 className="font-semibold">Hà Nội</h3>
                </div>
                <div className="text-white text-center col-span-2">
                    <p className="text-xs">Nơi nhận</p>
                    <h3 className="font-semibold">Hà Tĩnh</h3>
                </div>
            </section>

            <section className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Người gửi</span>
                        <span className="font-semibold">Trương Tấn Tạ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Số điện thoại</span>
                        <span className="font-semibold">0123456789</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Nước gửi</span>
                        <span className="font-semibold">VIETNAM-VI</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Địa chỉ gửi</span>
                        <span className="font-semibold">Thanh Lâm - Mê Linh</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Cước phí</span>
                        <span className="font-semibold">13.205đ</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Người nhận</span>
                        <span className="font-semibold">Lã Thu Phương</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Số điện thoại</span>
                        <span className="font-semibold">0123456789</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Nước gửi</span>
                        <span className="font-semibold">VIETNAM-VI</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Địa chỉ nhận</span>
                        <span className="font-semibold">Văn Lang - Huế</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Trạng thái</span>
                        <span className="font-semibold text-cgreen-600">Đã nhận</span>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Ngày nhận</span>
                        <span className="font-semibold">20/12/2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Giờ nhận</span>
                        <span className="font-semibold">18:00</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Địa chỉ nhận</span>
                        <span className="font-semibold">làng Mây</span>
                    </div>
                </div>
            </section>
            <section>
                <label className="text-sm block mb-2 font-semibold">Ghi chú của khách hàng</label>
                <textarea
                    disabled defaultValue="Hello babae"
                    className="bg-cgray-100 rounded-xl w-full"></textarea>
            </section>
            <section>
                <label className="text-sm block mb-2 font-semibold">Danh sách bưu gửi</label>
                <div className="p-5 grid grid-cols-6 bg-cgray-100 rounded-lg w-full text-cgray-600">
                    <div className="col-span-5">
                        <span className="text-sm text-cgray-400">Headphone</span>
                        <p className="font-semibold">IPhone Promax 15 Gold</p>
                    </div>
                    <div className="col-span-1 text-right">
                        <span className="text-sm text-cgray-400">Cân nặng</span>
                        <p className="font-semibold">400 x 1</p>
                    </div>
                    <div className="col-span-5">
                        <span className="text-sm text-cgray-400">Headphone</span>
                        <p className="font-semibold">IPhone Promax 15 Gold</p>
                    </div>
                    <div className="col-span-1 text-right">
                        <span className="text-sm text-cgray-400">Cân nặng</span>
                        <p className="font-semibold">400 x 1</p>
                    </div>
                    <div className="col-span-5">
                        <span className="text-sm text-cgray-400">Headphone</span>
                        <p className="font-semibold">IPhone Promax 15 Gold</p>
                    </div>
                    <div className="col-span-1 text-right">
                        <span className="text-sm text-cgray-400">Cân nặng</span>
                        <p className="font-semibold">400 x 1</p>
                    </div>
                </div>
            </section>

            <section>
                <label className="text-sm block mb-2 font-semibold">Tracking link</label>
                <div className="flex justify-center items-center flex-col">
                    <Image
                        alt="qrcode"
                        height={100} width={100}
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${"http://localhost:3000/tracking/asasxa"}&size=100x100`} />

                    <div className="px-4 py-2 rounded-full bg-cyellow-500 w-1/2 mt-5 flex items-center cursor-pointer">
                        <span className="font-semibold truncate">http://localhost:3000/tracking/asasxa</span>
                        <span className="material-symbols-rounded ml-3">
                            content_copy
                        </span>
                    </div>
                </div>
            </section>
        </main>
    )
}