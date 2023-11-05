import Logo from "@/icons/Logo";
import Image from "next/image";
import React from "react";
import FormWrapper from "@/components/FormWrapper";
import StorageImg from "@/assets/images/storage.png";

type Props = {
  left?: boolean;
  children: React.ReactNode;
};

const AuthContainer = ({
  left = true,
  children = "Xác thực thông tin",
}: Props) => {
  return (
    <main
      className={`max-w-[1024px] h-[628px] z-10 transform translate-y-[4%] p-[8px] rounded-[10px] bg-white shadow-sd1 flex ${
        left ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <section className="relative w-[56%] h-full overflow-hidden rounded-[10px]">
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
          <span className="text-[18px] text-white font-[600]  tracking-widest mt-[-8px]">
            Trao gửi trọn niềm tin
          </span>
        </div>
      </section>
      <section className=" flex-1 pt-[50px] px-[40px]">
        <FormWrapper>{children}</FormWrapper>
      </section>
    </main>
  );
};

export default AuthContainer;
