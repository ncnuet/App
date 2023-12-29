import { IoBriefcaseOutline, IoBusinessOutline, IoGolfOutline } from "react-icons/io5";

interface IProps {
    role: string;
    office: string;
    address: string;
}

export default function Permission({ role, office, address }: IProps) {
    return (
        <div className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2">
            <h2 className="p-[20px] text-base text-cyellow-600 font-semibold border-b border-b-[#CCD7E2]">
                Vị trí công tác
            </h2>

            <div className="flex flex-col gap-5 pb-[30px] px-[20px]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex-none flex flex-row gap-2 items-center mr-2 text-cgray-600 font-semibold">
                        <span className="text-xl">  <IoBriefcaseOutline /></span>
                        <span className="text-sm">Chức vụ</span>
                    </div>
                    <span className="py-1 px-5 bg-cyellow-500 rounded-full text-[15px] text-black font-normal line-clamp-1">
                        {role}
                    </span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex-none flex flex-row gap-2 items-center mr-2 text-cgray-600 font-semibold">
                        <span className="text-xl"><IoBusinessOutline /></span>
                        <span className="text-sm">Cơ quan</span>
                    </div>

                    <span className="py-1 px-5 bg-cblue-300 rounded-full text-[15px] text-black font-normal line-clamp-1">
                        {office}
                    </span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex-none flex flex-row gap-2 items-center mr-2 text-cgray-600 font-semibold">
                        <span className="text-xl"><IoGolfOutline /></span>
                        <span className="text-sm">Địa chỉ</span>
                    </div>
                    <span className="py-1 px-5 bg-cgreen-400 rounded-full text-[15px] text-black font-normal line-clamp-1">
                        {address}
                    </span>
                </div>
            </div>
        </div>
    )
}