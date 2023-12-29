import { EStatusParcel } from "@/redux/services/queries/details.parcel";
import React from "react";

type Props = {
  status: EStatusParcel;
};

const GdvStatus = ({ status }: Props) => {
  return (
    <button
      className={
        `outline-none h-[26px] px-[10px] py-1 flex flex-row items-center flex-none ` +
        `${
          status === EStatusParcel.DELIVERING.toLowerCase()
            ? "bg-cyellow-500"
            : status === EStatusParcel.DELIVERED.toLowerCase()
            ? "bg-cblue-300"
            : status === EStatusParcel.FAILED.toLowerCase()
            ? "bg-cred-400"
            : "bg-cgreen-600"
        } rounded-full text-sm font-bold text-white hover:cursor-default`
      }
    >
      {status === EStatusParcel.DELIVERING.toLowerCase()
        ? "Đang vận chuyển"
        : status === EStatusParcel.DELIVERED.toLowerCase()
        ? "Đã vận chuyển"
        : status === EStatusParcel.FAILED.toLowerCase()
        ? "Thất bại"
        : "Chấp nhận gửi"}
    </button>
  );
};

export default GdvStatus;
