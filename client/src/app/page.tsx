import CarImg from "@/assets/images/car.png"
import BoxesImg from "@/assets/images/boxes.png"
import LogoImg from "@/assets/images/logo.png"
import Image from "next/image"
import Link from "next/link";
import InputTracking from "./components/Input";

export default function Home() {
  return (
    <main className="bg-cyellow-100 min-h-screen w-screen flex xs:items-center p-0 xs:p-10 sm:p-28 relative">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <h1 className="select-none text-[268px] font-extrabold text-center whitespace-nowrap -mt-14 text-cyellow-300">MAGIC POST
        </h1>

        <div className="h-1/3 float-right -m-44 relative z-10 right-28">
          <Image alt="a car" src={CarImg} className="h-full object-scale-down transform -scale-x-100 2xl:scale-x-100" />
        </div>

        <div className="h-1/4 absolute z-50 xs:z-10 bottom-5 left-0 hidden xs:block">
          <Image alt="boxes" src={BoxesImg} className="h-full object-scale-down" />
        </div>
      </div>

      <div className="w-[550px] relative z-40 p-10 bg-[#ffffffc9] backdrop-blur-sm xs:backdrop-blur-lg xs:rounded-2xl shadow-lg">

        <div className="flex sm:hidden w-full justify-center items-center pb-10">
          <div className="h-10">
            <Image alt="logo" src={LogoImg} className="h-full object-scale-down" />
          </div>
          <div>
            <p className="font-semibold text-xl">MagicPost</p>
            <p className="font-sm">Trao gửi trọn niềm tin</p>
          </div>
        </div>

        <h1 className="font-semibold text-4xl uppercase mb-5 text-cblue-600">Tra cứu bưu gửi</h1>

        <p className="text-cblue-600 mb-3">Chúng tôi ở đây để giúp bạn theo dõi bưu gửi của bạn. Mọi thứ thật đơn giản, nhưng trước hết hãy cho chúng tôi biết <span className="font-semibold text-cyellow-600">Mã số bưu kiện</span> mà bạn muốn theo dõi. </p>

        <p className="text-cblue-600 text-sm">Mã số của bưu gửi thường nằm trong biên lai của khách hàng. </p>
        <a href="#" className="text-cyellow-600 text-sm hover:underline">Xem cách tra cứu</a>

        <InputTracking />

        <div className="pl-5 mt-5 flex gap-3 flex-wrap justify-center sm:justify-start">
          <Link
            href="/tracking"
            className="text-cyellow-600 font-semibold underline text-sm block min-w-fit">
            Lịch sử tra cứu
          </Link>
          <Link
            href="/login"
            className="text-cyellow-600 font-semibold underline text-sm block min-w-fit">
            Đăng nhập
          </Link>
          <a href="#" className="text-cyellow-600 font-semibold underline text-sm block min-w-fit">Chính sách</a>
          <a href="#" className="text-cyellow-600 font-semibold underline text-sm block min-w-fit">FAQ</a>
        </div>

        <div className="xs:hidden h-1/4 mt-20 xs:z-10 ">
          <Image alt="boxes" src={BoxesImg} className="h-full object-scale-down" />
        </div>
      </div>
    </main>
  );
}
