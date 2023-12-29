"use client";
import { useEffect, useState } from "react";
import ParcelContent from "@/layouts/gdv/ParcelContent";
import Link from "next/link";
import { INewParcel, getDetailParcel } from "@/redux/services/gdv.view";
interface searchParamsProps {
  searchParams: {
    pid: string;
  };
}
const ParcelPage = ({ searchParams }: searchParamsProps) => {
  const [isCancel, setIsCancel] = useState<boolean | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [data, setData] = useState<INewParcel | null>(null);
  const getData = async (pids: string[]) => {
    try {
      const response = await getDetailParcel(pids);
      if (response.data?.data) {
        setData(response.data.data.parcels[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    setIsSave(true);
  };

  const onChangeModal = () => {
    setIsModal((prev) => !prev);
  };

  const onChangePreview = () => {
    setIsPreview((prev) => !prev);
  };
  useEffect(() => {
    if (isCancel !== null && isCancel) {
      setIsCancel(false);
    }
  }, [isCancel]);
  useEffect(() => {
    if (searchParams.pid) {
      setIsDisabled(true);
      getData([searchParams.pid]);
    }
  }, []);
  useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-5 flex-grow overflow-hidden">
      {/* header */}
      <header className=" flex flex-col xs:flex-row gap-2 xs:items-center xs:pl-0 pl-4 flex-none">
        <span className="flex-1 text-xl text-cblue-600 font-bold">
          Đơn hàng số EB1256165415VN
        </span>
        {!isDisabled && (
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
            <button
              onClick={onChangeModal}
              className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cyellow-500 text-black hover:opacity-80 active:opacity-90"
            >
              <span className="material-symbols-outlined text-[22px]">
                check_circle
              </span>
              <span className="text-[15px] font-normal">Lưu</span>
            </button>
            {isSave && (
              <button
                onClick={onChangePreview}
                className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cblue-300 text-black hover:opacity-80 active:opacity-90"
              >
                <span className="material-symbols-outlined text-[22px]">
                  pageview
                </span>
                <span className="text-[15px] font-normal">Xem</span>
              </button>
            )}
          </div>
        )}
      </header>
      <ParcelContent
        data={data}
        isDisabled={isDisabled}
        isCancel={isCancel}
        isModal={isModal}
        isPreview={isPreview}
        onChangeModal={onChangeModal}
        onSave={onSave}
        onChangePreview={onChangePreview}
      ></ParcelContent>
    </div>
  );
};

export default ParcelPage;
