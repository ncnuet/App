import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import LogoImg from "@/assets/images/logo.png"
import Image from "next/image";

export default function TrackingTemplate({ children }: { children: ReactNode }) {
    return (
        <>
            <Sidebar />
            <article className="flex flex-grow">
                <section className="pb-7 md:py-7 w-full xl:w-[650px] flex flex-col shadow-sd1 h-screen flex-none">
                    <header className="block md:hidden w-full px-7 py-4 bg-gray-50">
                        {/* Logo */}
                        <div className="flex items-center justify-start">
                            <div className="h-7">
                                <Image alt="logo" src={LogoImg} className="object-scale-down h-full w-fit" />
                            </div>
                            <div className="ml-3">
                                <p className="text-cblue-600 font-semibold">MagicPost</p>
                                <p className="text-cyellow-600 text-sm">Trao gửi trọn niềm tin</p>
                            </div>
                        </div>
                    </header>
                    <Navbar />
                    {children}
                </section>
                <section className="hidden xl:flex-grow">
                    {/* <Map /> */}
                </section>
            </article>
        </>
    )
}