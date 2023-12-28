"use client";
import Image from "next/image";
import coolGirl from "@/assets/images/cool-girl.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IStaffInfor, getStaffInfor } from "@/redux/services/manager.staff";
const mockStaff: IStaffInfor = {
  avatar:
    "https://res.cloudinary.com/dxqd4odva/image/upload/v1703748165/VCA_app/avatars/cool-girl_avoub9.jpg",
  email: "esthera@simmmple.com",
  name: "Esthera Jackson",
  role: "Nhân viên",
};
const fakeData = new Array<IStaffInfor>(5);
fakeData.fill(mockStaff);
const ManagerPage = () => {
  const [staffData, setStaffData] = useState<IStaffInfor[] | null>(null);
  const getData = async () => {
    try {
      const response = await getStaffInfor("12345");
      if (response?.data && typeof response?.data === "object") {
        setStaffData(response.data);
      } else {
        setStaffData(fakeData);
      }
    } catch (error) {
      setStaffData(fakeData);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="w-full h-fit max-h-full overflow-hidden flex flex-col gap-3 p-6 rounded-[15px] shadow-sd2 bg-white">
      <h2 className="text-lg text-cblue-600 font-bold">
        Quản lý tài khoản trưởng điểm
      </h2>
      <div className="max-h-full flex flex-col gap-2 px-1 -mr-7">
        <section className="grid grid-cols-3 pt-2 pb-[18px] border-b border-b-[#E2E8F0] mr-7">
          <h3 className="col-span-2 lg:col-span-1 text-sm text-[#A0AEC0] font-bold ">
            Tài khoản
          </h3>
          <h3 className="hidden lg:block text-sm text-[#A0AEC0] font-bold ">
            Chức vụ
          </h3>
          <h3 className="text-sm text-[#A0AEC0] font-bold ">Quản lý</h3>
        </section>
        {staffData !== null && (
          <section className="flex-grow overflow-scroll flex flex-col gap-4 list pr-7">
            {staffData.map((item, index) => (
              <div
                key={index}
                className={
                  "grid grid-cols-3 pb-[10px] items-center border-b border-b-[#E2E8F0]" +
                  `${index === 0 && "mt-2"}`
                }
              >
                <div className="col-span-2 lg:col-span-1 flex flex-row gap-[10px] items-center">
                  <Image
                    src={item.avatar}
                    alt="cool girl"
                    className="hidden sm:block flex-none h-9 w-9 rounded-[18px] object-cover"
                    loading="lazy"
                    width={36}
                    height={36}
                  ></Image>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-cblue-600 font-bold">
                      {item.name}
                    </span>
                    <span className="text-sm text-[#718096] font-normal">
                      {item.email}
                    </span>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm text-cblue-600 font-bold">
                    Manager
                  </span>
                  <span className="text-sm text-[#718096] font-normal">
                    {item.role}
                  </span>
                </div>
                <Link
                  href={{
                    pathname: "/manager/5/setting",
                    query: {
                      pid: "5",
                    },
                  }}
                >
                  <span className="text-sm text-cgray-500">Chỉnh sửa</span>
                </Link>
              </div>
            ))}
          </section>
        )}
        {staffData === null && (
          <section className="text-center">
            <span className="material-symbols-outlined w-fit text-cyellow-500 text-3xl animate-spin">
              progress_activity
            </span>
          </section>
        )}
      </div>
    </main>
  );
};

export default ManagerPage;
