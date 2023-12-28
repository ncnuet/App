"use client";
import Image from "next/image";
import coolGirl from "@/assets/images/cool-girl.jpg";
import { IReviewParcel } from "@/redux/services/gdv.view";
import { useMemo } from "react";

interface IGdvCustomerItem {
  parcelActive: IReviewParcel;
  parcelData: IReviewParcel;
  onActive?: any;
}
const GdvCustomerItem = ({
  parcelActive,
  onActive,
  parcelData,
}: IGdvCustomerItem) => {
  const handleTime = useMemo(() => {
    const fullDate = new Date(parcelData.createdAt);
    const hours = fullDate.getHours() % 12 || 12;
    const minutes =
      fullDate.getMinutes() <= 9
        ? "0" + fullDate.getMinutes().toString()
        : fullDate.getMinutes().toString();
    const ampm = fullDate.getHours() >= 12 ? "PM" : "AM";
    const day = ("0" + fullDate.getDate()).slice(-2);
    const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    const year = fullDate.getFullYear();
    const dateTimeObject = {
      time: `${hours}:${minutes} ${ampm}`,
      date: `${day}-${month}-${year}`,
    };
    return dateTimeObject;
  }, [parcelData]);
  const handleStatus = useMemo(() => {
    let status = "Chấp nhận gửi";
    switch (parcelData.status) {
      case "failed":
        status = "Thất bại";
        break;
      case "delivering":
        status = "Đang vận chuyển";
        break;
      default:
        status = "Chấp nhận gửi";
        break;
    }
    return status;
  }, [parcelData]);
  return (
    <div
      className={
        `flex flex-row w-full pb-[10px] pt-[18px] border-b border-b-[#E2E8F0] hover:cursor-pointer hover:bg-cyellow-100` +
        `${
          parcelActive.code === parcelData.code
            ? " bg-cyellow-100"
            : " bg-transparent"
        }`
      }
      onClick={() => onActive(parcelData)}
    >
      <div className="w-1/2 sm:w-2/5 xl:w-[30%] flex flex-row gap-[10px] items-center">
        <Image
          src={coolGirl}
          alt="cool girl"
          className="h-9 w-9  flex-none rounded-[18px] object-cover"
          loading="lazy"
        ></Image>
        <div className="flex flex-col items-start">
          <span className="text-sm text-cblue-600 font-bold">
            {(parcelData.code.substring(0, 12) + "...").toUpperCase()}
          </span>
          <span className="text-sm text-[#718096] font-normal">
            {parcelData.creator}
          </span>
        </div>
      </div>
      <div className="w-1/2 sm:w-[30%] xl:w-1/4 flex flex-row items-center justify-end sm:justify-center flex-none">
        <button
          className={
            "outline-none h-[26px] px-[10px] py-1 flex flex-row items-center rounded-full text-sm font-bold text-white hover:cursor-default " +
            `${
              parcelData.status === "failed"
                ? "bg-cred-400"
                : parcelData.status === "delivering"
                ? "bg-cyellow-500"
                : "bg-cgreen-600"
            }`
          }
        >
          {handleStatus}
        </button>
      </div>
      <div className="hidden sm:w-[30%] xl:w-1/4 sm:flex flex-row items-center justify-center">
        <span className="text-sm text-cgray-500">{parcelData.creator}</span>
      </div>
      <div className="hidden xl:flex-1 xl:flex flex-col items-end">
        <span className="text-sm text-cgray-500">{handleTime.time}</span>
        <span className="text-sm text-cgray-500">{handleTime.date}</span>
      </div>
    </div>
  );
};

export default GdvCustomerItem;
