"use client";
import { useState, useEffect, useRef } from "react";
import GdvInput from "@/components/GdvInput";
import GdvCustomerItem from "./GdvCustomerItem";
import GdvInfor from "./GdvInfor";
import Link from "next/link";

const fakeData = [
  { code: "EA131513531VN" },
  { code: "EA131513532VN" },
  { code: "EA131513533VN" },
  { code: "EA131513534VN" },
  { code: "EA131513535VN" },
  { code: "EA131513536VN" },
  { code: "EA131513537VN" },
  { code: "EA131513538VN" },
  { code: "EA131513539VN" },
  { code: "EA131513530VN" },
];

const GdvConTent = () => {
  const [parcelActive, setParcelActive] = useState<string | null>(null);
  const [isModal, setIsModal] = useState<boolean | null>(null);
  const inforRef = useRef<HTMLDivElement>(null);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  // select other parcel code
  const onChangeParcelActive = (parcelCode: string) => {
    setParcelActive(parcelCode);
    if (window.innerWidth < 1100) {
      inforRef.current?.classList.remove("gdv-animation");
      setIsModal(true);
    }
  };

  // close infor in [responsive mode]
  const onCloseInfor = () => {
    inforRef.current?.classList.toggle("gdv-hidden-animation");
    timeoutRef.current = setTimeout(() => {
      setIsModal(false);
      inforRef.current?.classList.toggle("gdv-hidden-animation");
    }, 200);
  };

  // Wheather screen is long enough for infor
  useEffect(() => {
    if (parcelActive === null) {
      if (window.innerWidth >= 1100) {
        setParcelActive("EA131513531VN");
      } else {
        setParcelActive("EA134422333VN");
      }
    }
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

  return (
    <main className="flex-1 flex flex-row gap-6">
      <div className="h-full w-full gdv:w-[65%] bg-white rounded-2xl p-6 shadow-sd2 flex flex-col">
        <section className="flex flex-row items-center justify-between sm:justify-start gap-3">
          <span className="hidden  sm:block sm:flex-1 md:line-clamp-1  text-lg text-cblue-600 font-bold">
            Bưu gửi đã tạo
          </span>
          <div className="h-full w-[200px]">
            <GdvInput placeholder="EB12345" icon="search"></GdvInput>
          </div>
          <Link href={"/gdv/parcel"} scroll={false}>
            <button className="outline-none flex-none py-[5px] px-[10px] rounded-[8px] flex flex-row items-center bg-cyellow-500 hover:opacity-80 hover:cursor-pointer active:opacity-90">
              <span className="material-symbols-outlined">add</span>
              <span className="text-[15px] font-normal">Đơn mới</span>
            </button>
          </Link>
        </section>
        <div className="flex flex-col w-full px-1">
          <section className="min-h-10 w-full mt-4  pb-6 flex flex-row items-center text-sm text-[#A0AEC0] font-bold select-none border-b border-b-[#E2E8F0]">
            <span className="w-1/2 sm:w-[40%] xl:w-[30%] ">Mã đơn</span>
            <span className="w-1/2 sm:w-[30%] xl:w-[25%] flex flex-row items-center justify-end sm:justify-center">
              Trạng thái
              <span className="material-symbols-outlined ml-2 text-base">
                south
              </span>
            </span>
            <span className="hidden sm:w-[30%] xl:w-[25%] sm:flex flex-row items-center justify-center">
              Người tạo
              <span className="material-symbols-outlined ml-2 text-base">
                south
              </span>
            </span>
            <span className="hidden xl:flex-grow xl:flex xl:flex-row  items-center justify-end">
              Ngày tạo
              <span className="material-symbols-outlined ml-2 text-base">
                south
              </span>
            </span>
          </section>
          <div className="-ml-1 pl-1 -mr-7 px-7 max-h-[416px] overflow-y-auto overflow-x-hidden gdv-item">
            <section className="w-full flex flex-col">
              {fakeData.map((parcel, index) => (
                <GdvCustomerItem
                  key={index}
                  parcelActive={parcelActive || ""}
                  parcelCode={parcel.code}
                  onActive={onChangeParcelActive}
                ></GdvCustomerItem>
              ))}
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
      {isModal && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0 bg-transparent flex flex-row pt-[240px] justify-center"
          onClick={onCloseInfor}
        >
          <div
            ref={inforRef}
            className="gdv-infor gdv-animation"
            onClick={(e) => e.stopPropagation()}
          >
            <GdvInfor parcelCode={parcelActive || ""}></GdvInfor>
          </div>
        </div>
      )}
      <div className="hidden gdv:static gdv:block gdv:flex-1 gdv:max-w-none gdv:min-w-0 gdv:transform-none flex-none">
        <GdvInfor parcelCode={parcelActive || ""}></GdvInfor>
      </div>
    </main>
  );
};

export default GdvConTent;
