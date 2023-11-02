import Logo from "@/icons/Logo";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginContent = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="flex flex-col">
        <div className="flex flex-row items-center mb-[44px]">
          <Logo width="60" height="30" className={"text-[#FDB813]"}></Logo>
          <h2 className="text-[16px] text-black ml-2 font-[700]">
            Hệ thống quản lý chuyển phát
          </h2>
        </div>
        <span className="text-[20px] text-[#FFA800] font-bold pb-[2px] ">
          Chào mừng trở lại
        </span>
        <span className="text-[12px] text-[#838383] font-regular ">
          Đăng nhập vào hệ thống quản lý chuyển phát MagicPost
        </span>
      </header>
      <footer className="mt-auto flex flex-row items-center text-[12px] text-gray-400 font-medium select-none">
        <span className="hover:cursor-pointer hover:opacity-60 active:opacity-80">
          @devbygroup6
        </span>
        <span className="flex flex-row items-center ml-4 hover:cursor-pointer hover:opacity-60 active:opacity-80">
          <FontAwesomeIcon
            icon={faGithub}
            className="w-4 h-4 text-gray-400 mr-1"
          />
          github
        </span>
        <span className="hover:cursor-pointer hover:opacity-60 active:opacity-80">
          <span className="ml-4 text-[12px] font-semi">SOS</span>
          <span className="ml-1">Liên hệ kỹ thuật</span>
        </span>
      </footer>
    </div>
  );
};
export default LoginContent;
