import Image from "next/image";
import coolGirl from "@/assets/images/cool-girl.jpg";
const GdvCustomerItem = () => {
  return (
    <div className="flex flex-row w-full py-[10px]  border-b border-b-[#E2E8F0]">
      <div className="w-[30%] flex flex-row gap-[10px] items-center">
        <Image
          src={coolGirl}
          alt="cool girl"
          className="h-9 w-9 rounded-[18px] object-cover"
          loading="lazy"
        ></Image>
        <div className="flex flex-col items-start">
          <span className="text-sm text-cblue-600 font-bold">
            EA131513532VN
          </span>
          <span className="text-sm text-[#718096] font-normal">
            Phạm Thị Thảo
          </span>
        </div>
      </div>
      <div className="w-1/4 flex flex-row items-center justify-center">
        <button className="outline-none h-[26px] px-[10px] py-1 flex flex-row items-center bg-cgreen-600 rounded-full text-sm font-bold text-white hover:cursor-default">
          Chấp nhận gửi
        </button>
      </div>
      <div className="w-1/4 flex flex-row items-center justify-center">
        <span className="text-sm text-cgray-500">Trần Mỹ Duyên</span>
      </div>
      <div className="flex-1 flex flex-col items-end">
        <span className="text-sm text-cgray-500">09:00 AM</span>
        <span className="text-sm text-cgray-500">03-11-2023</span>
      </div>
    </div>
  );
};

export default GdvCustomerItem;
