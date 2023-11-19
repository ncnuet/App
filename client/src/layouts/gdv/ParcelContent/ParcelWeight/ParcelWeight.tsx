import { memo } from "react";
import GdvInput from "@/components/GdvInput";

interface IParcelWeight {
  actualWeight: string;
  covertWeight: string;
  onActualWeight: any;
  onConvertWeight: any;
}
const ParcelWeight = ({
  actualWeight,
  covertWeight,
  onActualWeight,
  onConvertWeight,
}: IParcelWeight) => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3">
        <h2 className="text-lg text-cblue-600 font-bold">Khối lượng thực tế</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" flex-1 flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Họ tên khách gửi
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="20 gam"
                icon="scale"
                isBig
                onInfor={(result: string) => onActualWeight(result)}
                value={actualWeight}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Khối lượng hàng thực tế
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Khối lượng quy dổi
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="0 gam"
                icon="scale"
                isBig
                onInfor={(result: string) => onConvertWeight(result)}
                value={covertWeight}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Khối lượng hàng quy đổi
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg text-cblue-600 font-bold">Cước phí</h2>
          <div className="flex flex-row gap-[6px]">
            <div className="w-5 h-5 flex flex-row justify-center items-center rounded-md border-cblue-600 bg-cyellow-500">
              <span className="material-symbols-outlined text-lg text-white">
                check
              </span>
            </div>
            <span className=" text-sm  text-black font-semibold">
              Người nhận thanh toán
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Cước chính
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              9.500
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Phụ phí
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              1.900
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Phí thu hộ (COD)
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">0</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Cước GTGT
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">0</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Tổng cước (gồm VAT)
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              12.312
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Thu khác
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">0</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Tổng thu
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold rounded-full px-[10px] py-[1px] bg-cyellow-500">
              13.312
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ParcelWeight);
