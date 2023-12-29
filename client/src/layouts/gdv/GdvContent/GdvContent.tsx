"use client";
import { useState, useEffect, useRef } from "react";
import GdvInput from "@/components/GdvInput";
import GdvCustomerItem from "./GdvCustomerItem";
import GdvInfor from "./GdvInfor";
import Link from "next/link";
import { IReviewParcel, getReviewParcels } from "@/redux/services/gdv.view";
import { EStatusParcel } from "@/redux/services/queries/details.parcel";

const fakeData: IReviewParcel[] = [
  {
    code: "EA131513531VN",
    createdAt: "09:00 AM",
    creator: "Trần Mỹ Duyên",
    receiver: {
      name: "Lưu Thế Lữ",
      phone: "0123456789",
    },
    sender: {
      name: "Duy Nến",
      phone: "9876543210",
    },
    receiving_add: {
      commune: {
        name: "Hoàng Hoa Thám",
      },
      district: {
        name: "Ba Đình",
      },
    },
    sending_add: {
      commune: {
        name: "Hoàng Hoa Thám",
      },
      district: {
        name: "Ba Đình",
      },
    },
    status: EStatusParcel.FAILED,
    cost: 1000,
  },
  {
    code: "EA131513532VN",
    createdAt: "09:00 AM",
    creator: "Trần Mỹ Duyên",
    receiver: {
      name: "Lưu Thế Lữ",
      phone: "0123456789",
    },
    sender: {
      name: "Duy Nến",
      phone: "9876543210",
    },
    receiving_add: {
      commune: {
        name: "Hoàng Hoa Thám",
      },
      district: {
        name: "Ba Đình",
      },
    },
    sending_add: {
      commune: {
        name: "Hoàng Hoa Thám",
      },
      district: {
        name: "Ba Đình",
      },
    },
    status: EStatusParcel.DELIVERING,
    cost: 1000,
  },
];

const GdvConTent = () => {
  const [data, setData] = useState<IReviewParcel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parcelActive, setParcelActive] = useState<IReviewParcel | null>(null);
  const [isModal, setIsModal] = useState<boolean | null>(null);
  const inforRef = useRef<HTMLDivElement>(null);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getReviewParcels(10, 1);
      if (response.data?.data) {
        setIsLoading(false);
        setData(response.data.data);
      } else {
        setIsLoading(false);
        setData([]);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  // select other parcel code
  const onChangeParcelActive = (parcel: IReviewParcel) => {
    setParcelActive(parcel);
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
    getData();
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    if (data) {
      if (parcelActive === null) {
        if (window.innerWidth >= 1100) {
          setParcelActive(data[0]);
        } else {
          setParcelActive(data[0]);
        }
      }
    }
  }, [data]);

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
              {parcelActive !== null &&
                data !== null &&
                data.map((parcel, index) => (
                  <GdvCustomerItem
                    key={index}
                    parcelActive={parcelActive}
                    parcelData={parcel}
                    onActive={onChangeParcelActive}
                  ></GdvCustomerItem>
                ))}
              {isLoading && (
                <div className="w-full flex flex-row justify-center">
                  <span className="material-symbols-outlined mt-4 text-cyellow-500 animate-spin">
                    progress_activity
                  </span>
                </div>
              )}
            </section>
          </div>
        </div>
        {/* separated page */}
        <section className="mt-auto pt-4 pl-[10px] w-full flex flex-row items-center">
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
            {parcelActive !== null && (
              <GdvInfor parcel={parcelActive}></GdvInfor>
            )}
          </div>
        </div>
      )}
      {data !== null && (
        <div className="hidden gdv:static gdv:block gdv:flex-1 gdv:max-w-none gdv:min-w-0 gdv:transform-none flex-none">
          {parcelActive !== null && <GdvInfor parcel={parcelActive}></GdvInfor>}
        </div>
      )}
    </main>
  );
};

export default GdvConTent;
