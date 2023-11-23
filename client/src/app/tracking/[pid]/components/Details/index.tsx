export default function ({ }) {
    return (
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
    )
}