interface IProps {
    selected?: boolean
}

export default function PackageNavItem({ selected }: IProps) {
    return (
        <div
            className={
                "flex flex-col gap-1 px-7 py-3 rounded-xl hover:bg-white cursor-pointer hover:shadow-sd1 " +
                (selected ? "bg-white shadow-sd1" : "")}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-cgray-400">Mã bưu kiện</p>
                    <h1 className="text-lg text-cgray-600 font-semibold">EB125966898VN</h1>
                </div>
                <div className="p-3 py-1 bg-cyellow-500 rounded-full">
                    <span className="material-symbols-rounded block text-white">
                        local_shipping
                    </span>
                </div>
            </div>

            <div className="flex gap-5 items-center">
                <p className="flex items-center text-cgray-400 text-sm">
                    <span
                        className="material-symbols-rounded text-cyellow-500 text-[16px]">
                        radio_button_unchecked
                    </span>
                    <span className="ml-2">Hà Nôi</span>
                </p>
                <span className="material-symbols-rounded text-[16px] text-cred-400">trending_flat</span>
                <p className="flex items-center text-cgray-400 text-sm">
                    <span
                        className="material-symbols-rounded text-cgreen-600 text-[16px]">
                        where_to_vote
                    </span>
                    <span className="ml-2">Lào Cai</span>
                </p>
            </div>
        </div>
    )
}