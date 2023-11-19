import prettyGirl from "@/assets/images/girl.png";
import Logo from "@/icons/Logo";
import Image from "next/image";
const GdvHeader = () => {
  return (
    <nav className="flex flex-row justify-between h-[52px] select-none px-4 pt-6 xs:p-0">
      <div className="flex flex-col gap-2 text-sm font-normal xs:justify-start justify-center">
        <div className="hidden xs:block">
          <span className=" text-blue-400">Pages </span>
          <span className="text-cblue-600">/ Dashboard</span>
        </div>
        <span className="hidden xs:block text-base text-cblue-600 font-bold">
          Dashboard
        </span>

        <Logo
          width="48"
          height="24"
          className={"xs:hidden text-cyellow-500 ml-2"}
        ></Logo>
      </div>
      <div className="flex flex-row gap-5 items-center h-full">
        <div className="w-fit md:w-[224px] h-12 py-2 px-4 flex flex-row items-center rounded-full border border-[#F0F0F0] bg-white">
          <span className="material-symbols-outlined hover:cursor-pointer">
            search
          </span>
          <input
            className="hidden md:block outline-none px-2 w-full h-full text-cblue-600 placeholder:text-[#A0AEC0]"
            placeholder="Type here..."
            spellCheck={false}
          ></input>
        </div>
        <span className="material-symbols-outlined text-[#A0AEC0] hover:cursor-pointer">
          settings
        </span>
        <span className="material-symbols-outlined text-[#A0AEC0] hover:cursor-pointer">
          notifications
        </span>
        <div className="ml-5 flex flex-row gap-2 items-center">
          <Image
            src={prettyGirl}
            alt="pretty girl"
            className="h-9 w-9 rounded-[18px] object-cover flex-none"
            loading="lazy"
          ></Image>
          <div className="hidden sm:flex flex-col items-start">
            <span className="line-clamp-1 md:text-clip text-sm text-cblue-600 font-medium">
              Phạm Thị Thảo
            </span>
            <span className="text-xs text-cblue-600 font-normal">BOD</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default GdvHeader;
