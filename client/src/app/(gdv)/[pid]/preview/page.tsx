import Logo from "@/icons/Logo";
import QR from "@/assets/images/qr-code.png";
import Image from "next/image";
import ParcelBill from "@/layouts/gdv/ParcelBill";
import { IParcelBill } from "@/layouts/gdv/ParcelBill/ParcelBill";

const GdvPage = ({ ...props }: IParcelBill) => {
  return (
    <main className="my-12 w-[1096px] max-w-full bg-white p-[50px] shadow-sd1">
      <header className="flex flex-row items-center gap-0 md:gap-[200px] mb-2">
        <div className="flex-1 flex flex-row items-center justify-center">
          <Logo width="100" height="52" className={"text-cyellow-500"}></Logo>
          <div className="flex flex-col ml-2">
            <span className="text-2xl font-bold ">MagicPost</span>
            <span className="text-[15px] font-bold">
              Trao gửi trọn niềm tin
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image
            src={QR}
            width={64}
            height={64}
            alt="qr-code"
            className="w-16 h-16 mb-2 object-contain"
          ></Image>
          <span className="text-base text-cgray-600 font-semibold ">
            EB125966888VN
          </span>
        </div>
      </header>
      <ParcelBill {...props}></ParcelBill>
      <footer className="mt-[10px] flex flex-row items-center justify-center">
        <p className="text-base font-semibold ">
          Hotline: 1900 5454 33 - Website: magicpost.com - Email:
          cskh@magicpost.com.vn
        </p>
      </footer>
    </main>
  );
};

export default GdvPage;
