import Image from "next/image";
import coolGirl from "@/assets/images/cool-girl.jpg";
import { IReviewParcel } from "@/redux/services/gdv.view";

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
          className="h-9 w-9 rounded-[18px] object-cover"
          loading="lazy"
        ></Image>
        <div className="flex flex-col items-start">
          <span className="text-sm text-cblue-600 font-bold">
            {parcelData.code}
          </span>
          <span className="text-sm text-[#718096] font-normal">
            {parcelData.creator}
          </span>
        </div>
      </div>
      <div className="w-1/2 sm:w-[30%] xl:w-1/4 flex flex-row items-center justify-end sm:justify-center flex-none">
        <button className="outline-none h-[26px] px-[10px] py-1 flex flex-row items-center bg-cgreen-600 rounded-full text-sm font-bold text-white hover:cursor-default">
          {parcelData.status}
        </button>
      </div>
      <div className="hidden sm:w-[30%] xl:w-1/4 sm:flex flex-row items-center justify-center">
        <span className="text-sm text-cgray-500">{parcelData.creator}</span>
      </div>
      <div className="hidden xl:flex-1 xl:flex flex-col items-end">
        <span className="text-sm text-cgray-500">{parcelData.createdAt}</span>
        <span className="text-sm text-cgray-500">03-11-2023</span>
      </div>
    </div>
  );
};

export default GdvCustomerItem;
