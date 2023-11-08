import ParcelContent from "@/layouts/gdv/ParcelContent";

const ParcelPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      {/* header */}
      <header className="flex flex-row items-center">
        <span className="flex-1 text-xl text-cblue-600 font-bold">
          Đơn hàng số EB1256165415VN
        </span>
        <div className="flex flex-row items-center gap-[10px]">
          <button className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cred-400 text-white hover:opacity-80">
            <span className="material-symbols-outlined">delete</span>
            <span className="text-[15px] font-normal">Xóa</span>
          </button>
          <button className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cyellow-500 text-black hover:opacity-80">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="text-[15px] font-normal">Lưu</span>
          </button>
        </div>
      </header>
      <ParcelContent></ParcelContent>
    </div>
  );
};

export default ParcelPage;
