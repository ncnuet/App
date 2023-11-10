import LogoImg from "@/assets/images/logo.png"
import Image from "next/image";
import PackageNavItem from "../PackageNavItem";

export default function Sidebar() {
    return (
        <aside className="bg-cgray-200 h-screen flex flex-col w-[400px] flex-none relative">
            <header className="flex-non p-7">
                <div className="flex items-center justify-start mb-5">
                    <div className="h-7">
                        <Image alt="logo" src={LogoImg} className="object-scale-down h-full w-fit" />
                    </div>
                    <div className="ml-3">
                        <p className="text-cblue-600 font-semibold">MagicPost</p>
                        <p className="text-cyellow-600 text-sm">Trao gửi trọn niềm tin</p>
                    </div>
                </div>

                <h1 className="font-bold text-center text-3xl text-cblue-600">Tra cứu bưu gửi</h1>
            </header>

            <div className="flex-none p-7 py-5">
                <label
                    htmlFor="package_id"
                    className="text-sm ml-5 mb-2 text-cgray-500 block">
                    Tra cứu bưu gửi bằng mã bưu gửi
                </label>

                <div className="py-2 pl-5 pr-2 rounded-full border-2 border-cyellow-500 bg-white flex">
                    <input name="package_id" placeholder="EB123124123VN" className="bg-transparent outline-none w-full" />
                    <button
                        className="w-10 h-10 flex justify-center items-center flex-none rounded-full bg-cyellow-500">
                        <span className="material-symbols-rounded">arrow_right_alt</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-5 h-full overflow-y-scroll px-4 py-3 list">
                <PackageNavItem selected />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
            </div>
        </aside>
    )
}