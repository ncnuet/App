import prettyGirl from "@/assets/images/girl.png";
import Image from "next/image";
const GdvHeader = () => {
  return (
    <nav className="flex flex-row justify-between h-[52px] select-none">
      <div className="flex flex-col gap-2 text-sm font-normal">
        <div>
          <span className="text-blue-400">Pages </span>
          <span className="text-cblue-600">/ Dashboard</span>
        </div>
        <span className="text-base text-cblue-600 font-bold">Dashboard</span>
      </div>
      <div className="flex flex-row gap-5 items-center h-full">
        <div className="w-[224px] h-12 py-2 px-4 flex flex-row items-center rounded-full border border-[#F0F0F0] bg-white">
          <span className="material-symbols-outlined hover:cursor-pointer">
            search
          </span>
          <input
            className="outline-none px-2 w-full h-full text-cblue-600 placeholder:text-[#A0AEC0]"
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
            className="h-9 w-9 rounded-[18px] object-cover"
            loading="lazy"
          ></Image>
          <div className="flex flex-col items-start">
            <span className="text-sm text-cblue-600 font-medium">
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
