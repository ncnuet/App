import GdvInput from "@/components/GdvInput";

const GdvConTent = () => {
  return (
    <main className="h-full w-[864px] bg-white rounded-2xl p-6 shadow-sd2 flex flex-col">
      <section className="flex flex-row items-center gap-3">
        <span className="flex-1 text-lg text-cblue-600 font-bold">
          Bưu gửi đã tạo
        </span>
        <div className="h-full w-[200px]">
          <GdvInput placeholder="EB12345" icon="search"></GdvInput>
        </div>
        <button className="outline-none py-[5px] px-[10px] rounded-[8px] flex flex-row items-center bg-cyellow-500 hover:opacity-80 hover:cursor-pointer">
          <span className="material-symbols-outlined">add</span>
          <span className="text-[15px] font-normal">Đơn mới</span>
        </button>
      </section>
    </main>
  );
};

export default GdvConTent;
