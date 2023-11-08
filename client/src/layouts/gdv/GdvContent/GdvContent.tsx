import GdvInput from "@/components/GdvInput";
import GdvCustomerItem from "./GdvCustomerItem";
import GdvInfor from "./GdvInfor";

const GdvConTent = () => {
  return (
    <main className="flex-1 flex flex-row gap-6">
      <div className="h-full w-[836px] bg-white rounded-2xl p-6 shadow-sd2 flex flex-col">
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
        <div className="flex flex-col w-full px-1">
          <section className="min-h-10 w-full mt-4  pb-4 flex flex-row items-center text-sm text-[#A0AEC0] font-bold select-none border-b border-b-[#E2E8F0]">
            <span className="w-[30%] ">Mã đơn</span>
            <span className="w-[25%] flex flex-row items-center justify-center">
              Trạng thái
              <span className="material-symbols-outlined ml-2 text-base">
                south
              </span>
            </span>
            <span className="w-[25%] flex flex-row items-center justify-center">
              Người tạo
              <span className="material-symbols-outlined ml-2 text-base">
                south
              </span>
            </span>
            <span className="w-[20%] flex flex-row items-center justify-end">
              Ngày tạo
              <span className="material-symbols-outlined ml-2 text-base">
                south
              </span>
            </span>
          </section>
          <div className="-ml-1 pl-1 -mr-7 px-7 max-h-[416px] overflow-y-auto overflow-x-hidden gdv-item">
            <section className="mt-2 w-full flex flex-col gap-2">
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
              <GdvCustomerItem></GdvCustomerItem>
            </section>
          </div>
        </div>
        {/* separated page */}
        <section className="mt-4 pl-[10px] w-full flex flex-row items-center">
          <span className="parcel-bill__content text-cgray-500">
            Hiển thị 10 mục
          </span>
          <div className="ml-auto flex flex-row items-center border border-[#CCD7E2] rounded-lg">
            <button className="py-[5px] px-[10px] border-r border-r-[#CCD7E2] parcel-bill__content text-cgray-400 flex flex-row hover:opacity-70">
              Trước
            </button>
            <button className="py-[5px] px-[10px] border-r border-r-[#CCD7E2] parcel-bill__content text-cblue-300 bg-indigo-50 flex flex-row hover:opacity-70">
              1
            </button>
            <button className="py-[5px] px-[10px] border-r border-r-[#CCD7E2] parcel-bill__content text-cgray-400 flex flex-row hover:opacity-70">
              10
            </button>
            <button className="py-1 px-[10px] parcel-bill__content text-cgray-400 flex flex-row hover:opacity-70">
              Tiếp
            </button>
          </div>
        </section>
      </div>
      <GdvInfor></GdvInfor>
    </main>
  );
};

export default GdvConTent;
