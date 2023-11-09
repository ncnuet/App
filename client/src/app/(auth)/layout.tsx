import Image from "next/image";
import { ReactNode } from "react";
import FormWrapper from "@/components/FormWrapper";
import StorageImg from "@/assets/images/storage.png";
import Logo from "@/icons/Logo";
import React from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="w-screen h-screen bg-cyellow-100 flex justify-center items-center">
                <h1 className="text-[268px] text-center text-cyellow-300 font-extrabold uppercase absolute top-0 -mt-14 w-full select-none">
                    magic post
                </h1>

                <main className={"max-w-[1024px] h-[628px] z-10 transform p-[8px] rounded-[20px] bg-white shadow-sd1 flex flex-row "}>

                    {/* Deco image */}
                    <section className="relative w-[56%] h-full overflow-hidden rounded-[16px] order-2">
                        <Image
                            src={StorageImg}
                            width={562}
                            height={628}
                            alt="storage"
                            className="w-full h-full animate-pulse storage-animation"
                            loading="lazy"
                        ></Image>

                        <div className="absolute bg-gradient-to-b from-[#FDB712F2] to-[#FDB7124F] top-0 left-0 right-0 bottom-0 flex flex-col items-center select-none">
                            <Logo
                                width="173"
                                height="87"
                                className="mt-[72px] mb-4 text-white"
                            ></Logo>
                            <span className="text-[32px] text-white font-bold uppercase">
                                magic post
                            </span>
                            <span className="text-[18px] text-white font-[600] tracking-widest mt-[-8px]">
                                Trao gửi trọn niềm tin
                            </span>
                        </div>
                    </section>
                    
                    {children}
                </main>
            </div>
        </>
    )
}