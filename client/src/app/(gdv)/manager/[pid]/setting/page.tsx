"use client";
import Image from "next/image";
import GdvInput from "@/components/GdvInput";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  editStaffInfor
} from "@/redux/services/manager.staff";
import { getDetailStaff, updateAccount } from "@/redux/services/user.api";
import { UserDetail } from "@/redux/services/queries/manager.user";
import { useParams } from "next/navigation";
import AvatarPicker from "./components/AvatarPicker";
import Permission from "./components/Permission";
import { IoCheckmarkOutline, IoGolfOutline, IoMailOutline, IoPhonePortraitOutline, IoPlanetOutline, IoThunderstormOutline } from "react-icons/io5";
import Button from "@/components/Button";
import Account from "./components/Account";

interface IProps {

}

type Gender = "Nam" | "Nữ";
const fakeData = {
  name: "Phạm Thị Thảo",
  email: "cogiaothao96@gmail.com",
  address: "Quất Lâm, Nam Định",
  phoneNumber: "0123456789",
  gender: "Nam",
  userName: "Phạm Thị Thảo",
  password: "teacher@93",
  position: "Nhân viên",
  office: "Trụ sở điều hành Magic Post",
  location: "Trần Duy Hưng, Cầu Giấy, Hà Nội",
};

const StaffInfo = ({ }: IProps) => {
  const params = useParams();
  const pid = params.pid as string;


  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserDetail | null>(null);

  const [gender, setGender] = useState<Gender>("Nam");

  const getData = async () => {
    try {
      const response = await getDetailStaff([pid]);
      console.log(response);

      if (response.data.data) {
        setData(response.data.data.users[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setLoading(true);
    if (pid !== null) {
      getData();
    }
  }, []);

  const onGender = () => {
    if (gender === "Nam") {
      setGender("Nữ");
    } else {
      setGender("Nam");
    }
  };

  const onInforSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const body = Object.fromEntries(formData.entries());
    if (body.hasOwnProperty("gender")) {
      delete body.gender;
    }
    if (pid !== null) {
      try {
        const response = await editStaffInfor(pid, {
          email: "quanlytapket1@gmail.com",
        });
        alert(response?.data);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <main
      className="max-h-full overflow-scroll -mr-5 pr-5 pb-10 grid grid-cols-10 gap-5 xl:gap-3 list"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}>

      {data !== null && (
        <>
          <section className="col-span-10 xl:col-span-7 flex flex-col gap-5">
            <form
              onSubmit={onInforSubmitHandler}
              className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2"
            >
              <div className="px-[20px] py-[10.75px] flex flex-row justify-between items-center border-b border-b-[#CCD7E2]">
                <h2 className="text-base text-cyellow-600 font-semibold">
                  Thông tin cá nhân
                </h2>
                <Button name="Lưu thông tin" icon={<IoCheckmarkOutline />} />
              </div>
              <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm text-cgray-600 font-semibold">
                      Tên đầy đủ
                    </h3>
                    <GdvInput
                      isBig
                      icon={<IoPlanetOutline />}
                      placeholder="Phạm Thị Thảo"
                      defaultValue={data.name || ""}
                      onInfo={() => { }}
                      name="name"
                    ></GdvInput>
                    <span className="text-[11px] text-cgray-400 font-normal">
                      Tên này sẽ đại diện cho bạn và hiện thị ở những nơi bạn
                      đến
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm text-cgray-600 font-semibold">
                      Email
                    </h3>
                    <GdvInput
                      isBig
                      icon={<IoMailOutline />}
                      placeholder="cogiaothao96@gmail.com"
                      onInfo={() => { }}
                      name="email"
                      defaultValue={data.email || ""}
                    ></GdvInput>
                    <span className="text-[11px] text-cgray-400 font-normal">
                      Địa chỉ liên hệ của bạn là cách để khôi phục mật khẩu nếu
                      bạn quên
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-10 gap-5">
                  <div className="col-span-10 lg:col-span-5 flex flex-col gap-2">
                    <h3 className="text-sm text-cgray-600 font-semibold">
                      Địa chỉ
                    </h3>
                    <GdvInput
                      isBig
                      icon={<IoGolfOutline />}
                      placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
                      onInfo={() => { }}
                      name="address"
                      defaultValue={fakeData.address}
                    ></GdvInput>
                    <span className="text-[11px] text-cgray-400 font-normal">
                      Nơi bạn đang cư trú
                    </span>
                  </div>
                  <div className="col-span-5 lg:col-span-3 flex flex-col gap-2">
                    <h3 className="text-sm text-cgray-600 font-semibold">
                      Số điện thoại
                    </h3>
                    <GdvInput
                      isBig
                      icon={<IoPhonePortraitOutline />}
                      placeholder="0123456789"
                      onInfo={() => { }}
                      name="phone"
                      defaultValue={data.phone || ""}
                    ></GdvInput>
                    <span className="text-[11px] text-cgray-400 font-normal">
                      Cách chúng tôi liên hệ với bạn
                    </span>
                  </div>
                  <div className=" col-span-5 lg:col-span-2 flex flex-col gap-2">
                    <h3 className="text-sm text-cgray-600 font-semibold">
                      Giới tính
                    </h3>
                    <div className="flex flex-row items-center gap-2 p-[10px] text-cgray-500  rounded-lg bg-cgray-100 select-none">
                      <span className="material-symbols-outlined">
                        {gender === "Nam" ? "male" : "female"}
                      </span>
                      <span className="text-[15px]">{gender}</span>
                      <input
                        type="hidden"
                        className="bg-transparent text-[15px] w-fit"
                        value={gender}
                        name="gender"
                      />
                      <span
                        className="material-symbols-outlined ml-auto hover:opacity-70 active:opacity-90"
                        onClick={onGender}
                      >
                        unfold_more
                      </span>
                    </div>
                    <span className="text-[11px] text-cgray-400 font-normal">
                      Giới tính của bạn
                    </span>
                  </div>
                </div>
              </div>
            </form>

            <Account pid={data.uid} username={data.username} />
          </section>

          <section className="col-span-10 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-5">
            <AvatarPicker avatar={data.avatar} pid={data.uid} />
            <Permission
              role={data.role}
              office={data.office[0].name}
              address={data.office[0].address.district.name + ", " + data.office[0].address.province.name} />
          </section>
        </>
      )}
    </main>
  );
};

export default StaffInfo;
