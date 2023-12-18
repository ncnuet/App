import LogoImg from "@/assets/images/logo.png"
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import GroupPackageNavItem from "../GroupPackageNavItem";

export default function Sidebar() {
    return (
        <aside className="hidden md:flex bg-cgray-200 h-screen flex-col w-fit lg:w-[400px] flex-none relative">
            <header className="flex-non p-7">
                {/* Logo */}
                <div className="flex items-center justify-center mb-5">
                    <div className="h-7">
                        <Image alt="logo" src={LogoImg} className="object-scale-down h-full w-fit" />
                    </div>
                    <div className="hidden lg:ml-3">
                        <p className="text-cblue-600 font-semibold">MagicPost</p>
                        <p className="text-cyellow-600 text-sm">Trao gửi trọn niềm tin</p>
                    </div>
                </div>

                {/* Heading page */}
                <h1 className="hidden lg:block font-bold text-2xl text-center text-cblue-600">Tra cứu bưu gửi</h1>
            </header>

            <div className="hidden lg:block flex-none p-7 py-5">
                <label
                    htmlFor="parcel_id"
                    className="text-sm ml-5 mb-2 text-cgray-500 block">
                    Tra cứu bưu gửi bằng mã bưu gửi
                </label>

                <div className="py-2 pl-5 pr-2 rounded-full border-2 border-cyellow-500 bg-white flex">
                    <input name="parcel_id" placeholder="EB123124123VN" className="bg-transparent outline-none w-full" />
                    <button
                        className="w-10 h-10 flex justify-center items-center flex-none rounded-full bg-cyellow-500 text-2xl">
                        <MdArrowForward />
                    </button>
                </div>
            </div>

            <GroupPackageNavItem />
        </aside>
    )
}