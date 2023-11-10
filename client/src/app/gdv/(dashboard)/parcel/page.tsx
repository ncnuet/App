"use client";
import { useEffect, useState } from "react";
import ParcelContent from "@/layouts/gdv/ParcelContent";
import { isCancel } from "axios";

const ParcelPage = () => {
  const [isCancel, setIsCancel] = useState<boolean | null>(null);
  useEffect(() => {
    if (isCancel !== null && isCancel === true) {
      setIsCancel(false);
    }
  }, [isCancel]);
  return (
    <div className="flex flex-col gap-5 flex-grow overflow-hidden">
      {/* header */}
      <header className=" flex flex-col xs:flex-row gap-2 xs:items-center xs:pl-0 pl-4 flex-none">
        <span className="flex-1 text-xl text-cblue-600 font-bold">
          Đơn hàng số EB1256165415VN
        </span>
        <div className="flex flex-row items-center gap-[10px]">
          <button
            onClick={() => setIsCancel(true)}
            className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cred-400 text-white hover:opacity-80 active:opacity-90"
          >
            <span className="material-symbols-outlined text-[22px]">
              delete
            </span>
            <span className="text-[15px] font-normal">Xóa</span>
          </button>
          <button className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cyellow-500 text-black hover:opacity-80">
            <span className="material-symbols-outlined text-[22px]">
              check_circle
            </span>
            <span className="text-[15px] font-normal">Lưu</span>
          </button>
        </div>
      </header>
      <ParcelContent isCancel={isCancel}></ParcelContent>
    </div>
  );
};

export default ParcelPage;
