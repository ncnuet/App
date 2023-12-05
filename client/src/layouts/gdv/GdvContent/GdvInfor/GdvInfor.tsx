import GdvStatus from "@/components/GdvStatus";
interface IGdvInfor {
  parcelCode: string;
}
const GdvInfor = ({ parcelCode }: IGdvInfor) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-[15px] shadow-sd2 gap-[10px]">
      <div className="w-full flex flex-row items-center">
        <div className="flex flex-col flex-1">
          <h2 className="text-base text-cblue-600 font-bold">Thông tin đơn</h2>
          <h2 className="text-base text-cblue-600 font-bold">{parcelCode}</h2>
        </div>
        <button className="outline-none h-[34px] px-[10px] rounded-[8px] flex-none flex flex-row items-center bg-cyellow-500 hover:opacity-80 hover:cursor-pointer">
          <span className="material-symbols-outlined mr-1">page_info</span>
          <span className="text-[15px] font-normal">Chi tiết</span>
        </button>
      </div>
      <div className="flex flex-col p-[10px] bg-cgray-200 rounded-[10px] gap-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Người gửi
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            Phạm Thị Thảo
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Số điện thoại
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            0123456789
          </span>
        </div>
      </div>
      <div className="flex flex-col p-[10px] bg-cgray-200 rounded-[10px] gap-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Người nhận
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            Lưu Thế Lữ
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Số điện thoại
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            0123456789
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">Địa chỉ</span>
          <span className="text-sm text-cgray-600 font-semibold">
            Hoàng Hoa Thám - Ba Đình
          </span>
        </div>
      </div>
      <div className="flex flex-col p-[10px] bg-cgray-200 rounded-[10px] gap-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Tổng cước phí
          </span>
          <span className="text-sm text-cgray-600 font-semibold px-[10px] py-[1px] bg-cyellow-500 rounded-full">
            13.312
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Người trả phí
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            Người nhận
          </span>
        </div>
      </div>
      <div className="flex flex-col p-[10px] bg-cgray-200 rounded-[10px] gap-2">
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm text-cgray-600 font-semibold">
            Trạng thái
          </span>
          <GdvStatus isAccepted></GdvStatus>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">Ngày tạo</span>
          <span className="text-sm text-cgray-600 font-semibold">
            03-11-2023
          </span>
        </div>
      </div>
    </div>
  );
};

export default GdvInfor;
