import Sidebar from "@/app/tracking/components/Sidebar";
import Logo from "@/icons/Logo";

const GdvSidebar = () => {
  return (
    <aside className="hidden xs:flex flex-col select-none flex-none">
      <div className="flex flex-row items-center gap-3 pb-[30px]">
        <Logo width="48" height="24" className={"text-cyellow-500"}></Logo>
        <strong className="hidden md:block text-base text-cblue-600 font-bold">
          Quản lý chuyển phát{" "}
        </strong>
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-[#E0E1E200] via-[#E0E1E2] to-[#E0E1E228] mb-[30px]"></div>
      {/* Dashboard */}
      <div className="flex flex-col gap-2">
        <div className="w-full p-[10px] bg-white rounded-lg shadow-sd2">
          <div className="w-full flex flex-row items-center justify-start gap-3">
            <div className="w-[30px] h-[30px] rounded-[10px] bg-cyellow-500 flex justify-center items-center">
              <span className="material-symbols-outlined text-white">home</span>
            </div>
            <h2 className="hidden md:block text-sm font-bold">Dashboard</h2>
          </div>
        </div>
        <div className="w-full p-[10px] bg-transparent rounded-lg shadow-none">
          <div className="w-full flex flex-row items-center justify-start gap-3">
            <div className="w-[30px] h-[30px] rounded-[10px] bg-transparent  flex justify-center items-center">
              <span className="material-symbols-outlined text-cblue-600">
                home
              </span>
            </div>
            <h2 className="hidden md:block text-sm font-medium">Dashboard</h2>
          </div>
        </div>
        <div className="w-full p-[10px] bg-transparent rounded-lg shadow-none">
          <div className="w-full flex flex-row items-center justify-start gap-3">
            <div className="w-[30px] h-[30px] rounded-[10px] bg-transparent  flex justify-center items-center">
              <span className="material-symbols-outlined text-cblue-600">
                home
              </span>
            </div>
            <h2 className="hidden md:block text-sm font-medium">Dashboard</h2>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default GdvSidebar;
