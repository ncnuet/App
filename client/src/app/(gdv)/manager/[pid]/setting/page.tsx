"use client";
import Image from "next/image";
import GdvInput from "@/components/GdvInput";
import prettyGirl from "@/assets/images/girl.png";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  editStaffAccount,
  editStaffInfor,
  getDetailStaff,
} from "@/redux/services/manager.staff";

interface StaffInforProps {
  searchParams: { pid: string };
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
  position: "Giám đốc điều hành",
  office: "Trụ sở điều hành Magic Post",
  location: "Trần Duy Hưng, Cầu Giấy, Hà Nội",
};
const StaffInfor = ({ searchParams }: StaffInforProps) => {
  const [pid, setPid] = useState<string | null>(searchParams?.pid || null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>("Nam");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDetailStaff([searchParams.pid]);
        alert(JSON.stringify(response.data));
      } catch (error) {
        alert(JSON.stringify(error));
      }
    };
    if (pid !== null) {
      getData();
    }
  }, [pid]);

  const onBrowsering = () => {
    fileInputRef.current?.click();
  };

  const onFileSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]?.type?.split("/")[0] === "image") {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setAvatar(base64.toString());
        }
      };
    }
  };

  const onResetAvatar = () => {
    setAvatar(null);
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files;
    if (file && file[0]?.type?.split("/")[0] === "image") {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setAvatar(base64.toString());
        }
      };
    }
  };

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

  const onAccountSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const body = Object.fromEntries(formData.entries());
    const data = {
      username: body.username,
      password: body.password,
    };
    if (pid !== null) {
      try {
        const response = await editStaffAccount(pid, data);
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
      onDrop={(e) => e.preventDefault()}
    >
      <section className="col-span-10 xl:col-span-7 flex flex-col gap-5">
        <form
          onSubmit={onInforSubmitHandler}
          className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2"
        >
          <div className="px-[20px] py-[10.75px] flex flex-row justify-between items-center border-b border-b-[#CCD7E2]">
            <h2 className="text-base text-cyellow-600 font-semibold">
              Thông tin cá nhân
            </h2>
            <button className="flex-none flex h-fit p-[10px] rounded-[7px] bg-cyellow-500 text-[15px] text-black font-normal">
              Lưu thông tin
            </button>
          </div>
          <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Tên đầy đủ
                </h3>
                <GdvInput
                  isBig
                  icon="account_circle"
                  placeholder="Phạm Thị Thảo"
                  defaulValue={fakeData.name}
                  onInfor={() => {}}
                  name="name"
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Tên này sẽ đại diện cho bạn và hiện thị ở những nơi bạn đến
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">Email</h3>
                <GdvInput
                  isBig
                  icon="alternate_email"
                  placeholder="cogiaothao96@gmail.com"
                  onInfor={() => {}}
                  name="email"
                  defaulValue={fakeData.email}
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Địa chỉ liên hệ của bạn là cách để khôi phục mật khẩu nếu bạn
                  quên
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
                  icon="pin_drop"
                  placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
                  onInfor={() => {}}
                  name="address"
                  defaulValue={fakeData.address}
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
                  icon="smartphone"
                  placeholder="0123456789"
                  onInfor={() => {}}
                  name="phone"
                  defaulValue={fakeData.phoneNumber}
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
        <form
          onSubmit={onAccountSubmitHandler}
          className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2"
        >
          <div className="px-[20px] py-[12px] flex flex-row justify-between items-center border-b border-b-[#CCD7E2]">
            <h2 className="text-base text-cyellow-600 font-semibold">
              Tài khoản đăng nhập
            </h2>
            <button className="flex-none flex h-fit p-[10px] rounded-[7px] bg-cyellow-500 text-[15px] text-black font-normal">
              Đổi mật khẩu
            </button>
          </div>
          <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Tên đăng nhập
                </h3>
                <GdvInput
                  isBig
                  icon="account_circle"
                  placeholder="Phạm Thị Thảo"
                  onInfor={() => {}}
                  disabled={true}
                  defaulValue={fakeData.userName}
                  name="username"
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Tên để đăng nhập vào tài khoản
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Mật khẩu
                </h3>
                <GdvInput
                  isBig
                  icon="password"
                  placeholder="********"
                  onInfor={() => {}}
                  name="password"
                  defaulValue={fakeData.password}
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Mật khẩu để đăng nhập vào tài khoản
                </span>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section className="col-span-10 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-5">
        <div className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2">
          <h2 className="p-[20px] text-base text-cyellow-600 font-semibold border-b border-b-[#CCD7E2]">
            Ảnh đại diện
          </h2>
          <div className="flex flex-col gap-3 pb-[30px] px-[30px]">
            <div className="flex flex-row gap-3 items-center select-none">
              <Image
                src={avatar ? avatar : prettyGirl}
                alt="good-girl"
                width={avatar ? 48 : undefined}
                height={avatar ? 48 : undefined}
                className="flex-none w-12 h-12 rounded-[24px] outline outline-cyellow-500 object-cover"
              ></Image>
              <div className="flex flex-col">
                <span className="text-[15px] text-cgray-600 font-normal">
                  Chỉnh sửa ảnh đại diện
                </span>
                <div className="flex flex-row gap-3 items-center">
                  <span
                    className="text-[15px] text-cgray-500 font-medium cursor-pointer hover:opacity-80"
                    onClick={onResetAvatar}
                  >
                    Đặt về mặc định
                  </span>
                  <span className="text-[15px] text-cblue-300 font-medium cursor-pointer hover:opacity-80">
                    Cập nhật
                  </span>
                </div>
              </div>
            </div>
            <div
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={onBrowsering}
              className={
                "relative flex flex-col gap-3 items-center p-5 outline-dashed outline-[1px] rounded-[10px] select-none cursor-pointer hover:opacity-70 active:opacity-90 " +
                `${isDragging ? "outline-cblue-300" : "outline-[#CCD7E2]"}`
              }
            >
              <span
                className={
                  "flex flex-row justify-center items-center w-[44px] h-[44px] rounded-[22px] " +
                  `${isDragging ? "bg-cblue-300" : "bg-cgray-100"}`
                }
              >
                <span
                  className={
                    "material-symbols-outlined " +
                    `${isDragging ? "text-white" : "text-cgray-400"}`
                  }
                >
                  cloud_upload
                </span>
              </span>
              <div className="flex flex-row items-end gap-1">
                <span className="text-[15px] text-cblue-300 font-medium cursor-pointer hover:opacity-80">
                  {isDragging ? "Thả tại đây" : "Click để tải ảnh lên"}
                </span>
                {!isDragging && (
                  <span className="text-[14px] text-cgray-400 font-normal">
                    hoặc kéo thả
                  </span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={onFileSelectedHandler}
                ></input>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-cgray-400 font-normal">
                  SVG, PNG hoặc JPG
                </span>
                <span className="text-[11px] text-cgray-400 font-normal">
                  (tối đa 800 x 800px)
                </span>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2">
          <h2 className="p-[20px] text-base text-cyellow-600 font-semibold border-b border-b-[#CCD7E2]">
            Quyền tài khoản
          </h2>
          <div className="flex flex-col gap-5 pb-[30px] px-[20px]">
            <div className="flex flex-row justify-between items-center">
              <div className="flex-none flex flex-row gap-2 items-center mr-2">
                <span className="material-symbols-outlined">work</span>
                <span className="text-sm text-cgray-600 font-semibold">
                  Chức vụ
                </span>
              </div>
              <span className="py-1 px-5 bg-cyellow-500 rounded-full text-[15px] text-black font-normal line-clamp-1">
                {fakeData.position}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex-none flex flex-row gap-2 items-center mr-2">
                <span className="material-symbols-outlined">apartment</span>
                <span className="text-sm text-cgray-600 font-semibold">
                  Cơ quan
                </span>
              </div>
              <span className="py-1 px-5 bg-cblue-300 rounded-full text-[15px] text-black font-normal line-clamp-1">
                {fakeData.office}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex-none flex flex-row gap-2 items-center mr-2">
                <span className="material-symbols-outlined">pin_drop</span>
                <span className="text-sm text-cgray-600 font-semibold">
                  Địa chỉ
                </span>
              </div>
              <span className="py-1 px-5 bg-cgreen-400 rounded-full text-[15px] text-black font-normal line-clamp-1">
                {fakeData.location}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StaffInfor;
