export interface IProps {
    order?: boolean,
    expanded?: boolean
}

export default function MainEvent({ order, expanded }: IProps) {
    return (
        <div className={
            "flex justify-between items-center " +
            (order ? "ml-10 " : "") +
            (expanded ? "" : "p-5 ")} >
            <div className="flex flex-none gap-4 items-center">
                {order
                    ? <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full">
                        <span className="material-symbols-rounded text-cyellow-500 flex-none">radio_button_checked</span>
                    </div>
                    : <div className="h-9 w-9 flex flex-none justify-center items-center rounded-full bg-cyellow-500">
                        <span className="material-symbols-rounded text-black text-[16px]">inventory_2</span>
                    </div>
                }
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
        </div >
    )
}