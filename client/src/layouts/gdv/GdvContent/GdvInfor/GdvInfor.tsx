"use client";
import GdvStatus from "@/components/GdvStatus";
import { IReviewParcel } from "@/redux/services/gdv.view";
import { useMemo } from "react";
interface IGdvInfor {
  parcel: IReviewParcel;
}
const GdvInfor = ({ parcel }: IGdvInfor) => {
  const handleTime = useMemo(() => {
    const fullDate = new Date(parcel.createdAt);
    const day = ("0" + fullDate.getDate()).slice(-2);
    const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    const year = fullDate.getFullYear();
    const dateTimeObject = {
      date: `${day}-${month}-${year}`,
    };
    return dateTimeObject;
  }, [parcel]);
  return (
    <div className="flex flex-col p-4 bg-white rounded-[15px] shadow-sd2 gap-[10px]">
      <div className="w-full flex flex-row items-center">
        <div className="flex flex-col flex-1">
          <h2 className="text-base text-cblue-600 font-bold">Thông tin đơn</h2>
          <h2 className="text-base text-cblue-600 font-bold">
            {parcel.code.toUpperCase()}
          </h2>
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
            {parcel.sender.name}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Số điện thoại
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            {parcel.sender.phone}
          </span>
        </div>
      </div>
      <div className="flex flex-col p-[10px] bg-cgray-200 rounded-[10px] gap-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Người nhận
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            {parcel.receiver.name}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Số điện thoại
          </span>
          <span className="text-sm text-cgray-600 font-semibold">
            {parcel.receiver.phone}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">Địa chỉ</span>
          <span className="text-sm text-cgray-600 font-semibold">
            {`${parcel.receiving_add?.commune?.name} - ${
              parcel.receiving_add?.district?.name
            }${parcel.receiving_add?.province?.name ? "..." : ""}`}
          </span>
        </div>
      </div>
      <div className="flex flex-col p-[10px] bg-cgray-200 rounded-[10px] gap-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">
            Tổng cước phí
          </span>
          <span className="text-sm text-cgray-600 font-semibold px-[10px] py-[1px] bg-cyellow-500 rounded-full">
            {parcel.cost}
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
            {parcel.status}
          </span>
          <GdvStatus isAccepted></GdvStatus>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-cgray-600 font-semibold">Ngày tạo</span>
          <span className="text-sm text-cgray-600 font-semibold">
            {handleTime.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GdvInfor;
