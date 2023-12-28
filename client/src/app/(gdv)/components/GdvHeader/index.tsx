
import Logo from "@/icons/Logo";
import NameArea from "./components/Name";
import { IoNotificationsOutline, IoSearchOutline, IoSettingsOutline } from "react-icons/io5"
import Pathname from "../Pathname";

const GdvHeader = () => {
  return (
    <nav className="flex flex-row justify-between h-[52px] select-none px-4 pt-6 xs:p-0">
      <Pathname />

      <div className="flex flex-row gap-5 items-center h-full">
        <div className="w-fit md:w-[224px] h-12 py-2 px-4 flex flex-row items-center rounded-full border border-[#F0F0F0] bg-white">
          <span className="material-symbols-outlined hover:cursor-pointer">
            <IoSearchOutline />
          </span>
          <input
            className="hidden md:block outline-none px-2 w-full h-full text-cblue-600 placeholder:text-[#A0AEC0]"
            placeholder="Type here..."
            spellCheck={false}
          ></input>
        </div>

        <span className="material-symbols-outlined text-[#A0AEC0] hover:cursor-pointer">
          <IoSettingsOutline />
        </span>

        <span className="material-symbols-outlined text-[#A0AEC0] hover:cursor-pointer">
          <IoNotificationsOutline />
        </span>

        <NameArea />
      </div>
    </nav>
  );
};

export default GdvHeader;
