import Link from "next/link";
import {
    MdClear, MdWhereToVote, MdOutlineRadioButtonChecked,
    MdOutlineTrendingFlat, MdOutlineLocalShipping, MdCheck
} from "react-icons/md";

interface IProps {
    selected?: boolean
    pid: string
    to: string
    from: string
    status: string
}


export default function PackageNavItem({ selected, pid, to, from, status }: IProps) {
    return (
        <Link
            href={"/tracking/" + pid + "/"}
            className={
                "flex flex-col gap-1 px-7 py-3 rounded-xl hover:bg-white cursor-pointer hover:shadow-sd1 " +
                (selected ? "bg-white shadow-sd1" : "")}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-cgray-400">Mã bưu kiện</p>
                    <h1 className="text-lg text-cgray-600 font-semibold">{pid.slice(0, 14).toUpperCase()}</h1>
                </div>

                {status === "DELIVERED"
                    ? <div className="p-3 py-1 bg-cgreen-400 rounded-full">
                        <span className="text-white text-xl"><MdCheck /></span>
                    </div>
                    : status === "DELIVERING"
                        ? <div className="p-3 py-1 bg-cyellow-500 rounded-full">
                            <span className="text-white text-xl"><MdOutlineLocalShipping /></span>
                        </div>
                        : <div className="p-3 py-1 bg-cred-400 rounded-full">
                            <span className="text-white text-xl"><MdClear /></span>
                        </div>
                }
            </div>

            <div className="flex items-center overflow-hidden justify-between">
                <p className="flex items-center text-cgray-400 text-sm">
                    <span className="text-cyellow-500 text-lg"><MdOutlineRadioButtonChecked /></span>
                    <span className="ml-2 text-truncate whitespace-nowrap overflow-hidden">{to}</span>
                </p>
                <span className="text-cred-400 text-lg"><MdOutlineTrendingFlat /></span>
                <p className="flex items-center text-cgray-400 text-sm">
                    <span className="text-cgreen-400 text-lg"><MdWhereToVote /></span>
                    <span className="ml-2 text-truncate whitespace-nowrap overflow-hidden">{from}</span>
                </p>
            </div>
        </Link>
    )
}