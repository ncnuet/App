"use client";
import GdvInput from "@/components/GdvInput";

interface StaffInforProps {
  params: { pid: string };
}

const StaffInfor = ({ params }: StaffInforProps) => {
  return (
    <main className="grid grid-cols-10 gap-3">
      <section className="col-span-7 flex flex-col gap-5">
        <div className="flex flex-col gap-3 bg-white rounded-[15px]">
          <h2 className="p-[20px] text-base text-cyellow-600 font-semibold border-b border-b-[#CCD7E2]">
            Thông tin cá nhân
          </h2>
          <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Tên đầy đủ
                </h3>
                <GdvInput
                  isBig
                  icon="account_circle"
                  placeholder="Phạm Thị Thảo"
                  onInfor={() => {}}
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
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Địa chỉ liên hệ của bạn là cách để khôi phục mật khẩu nếu bạn
                  quên
                </span>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-5">
              <div className="col-span-5 flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Địa chỉ
                </h3>
                <GdvInput
                  isBig
                  icon="pin_drop"
                  placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
                  onInfor={() => {}}
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Nơi bạn đang cư trú
                </span>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Số điện thoại
                </h3>
                <GdvInput
                  isBig
                  icon="smartphone"
                  placeholder="0123456789"
                  onInfor={() => {}}
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Cách chúng tôi liên hệ với bạn
                </span>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Giới tính
                </h3>
                <div className="flex flex-row items-center gap-2 p-[10px] text-cgray-500  rounded-lg bg-cgray-100 select-none">
                  <span className="material-symbols-outlined">male</span>
                  <span className="text-[15px]">Nam</span>
                  <span className="material-symbols-outlined ml-auto hover:opacity-70 active:opacity-90">
                    unfold_more
                  </span>
                </div>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Giới tính của bạn
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-[15px]">
          <h2 className="p-[20px] text-base text-cyellow-600 font-semibold border-b border-b-[#CCD7E2]">
            Thông tin cá nhân
          </h2>
          <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm text-cgray-600 font-semibold">
                  Tên đăng nhập
                </h3>
                <GdvInput
                  isBig
                  icon="account_circle"
                  placeholder="Phạm Thị Thảo"
                  onInfor={() => {}}
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
                ></GdvInput>
                <span className="text-[11px] text-cgray-400 font-normal">
                  Mật khẩu để đăng nhập vào tài khoản
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="col-span-3"></section>
    </main>
  );
};

export default StaffInfor;
