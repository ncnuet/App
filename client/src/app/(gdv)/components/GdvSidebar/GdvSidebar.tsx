"use client"

import Logo from "@/icons/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoMailOutline, IoPeopleCircleOutline, IoSettingsOutline } from "react-icons/io5";

const navLinks = [
  { name: "Dashboard", icon: <IoHomeOutline />, href: "/dashboard" },
  { name: "Đơn gửi", icon: <IoMailOutline />, href: "/gdv" },
  { name: "Cài đặt", icon: <IoSettingsOutline />, href: "/setting" },
  { name: "Quản lý nhân viên", icon: <IoPeopleCircleOutline />, href: "/manager" },
]

const GdvSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden xs:flex flex-col select-none flex-none">
      <div className="flex flex-row items-center gap-3 pb-[30px]">
        <Logo width="48" height="24" className={"text-cyellow-500"}></Logo>
        <strong className="hidden md:block text-base text-cblue-600 font-bold">
          Quản lý chuyển phát{" "}
        </strong>
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-[#E0E1E200] via-[#E0E1E2] to-[#E0E1E228] mb-[30px]"></div>

      <div className="flex flex-col gap-2">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={
              "w-full p-[10px] rounded-lg " +
              (pathname.startsWith(item.href) ? "bg-white shadow-sd2" : "")
            }>
            <div className="w-full flex flex-row items-center justify-start gap-3">
              <div className="w-[30px] h-[30px] rounded-[10px] bg-cyellow-500 flex justify-center items-center text-lg font-semibold">
                {item.icon}
              </div>
              <h2 className="hidden md:block text-sm font-bold">{item.name}</h2>
            </div>
          </Link>))}
      </div>
    </aside>
  );
};

export default GdvSidebar;
