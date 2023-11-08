import CheckBox from "@/components/CheckBox";
import GdvInput from "@/components/GdvInput";

const ParcelContent = () => {
  return (
    <main className="flex-1 flex flex-col gap-5">
      {/* Infor client and receiver */}
      <section className="flex flex-row gap-10">
        <div className="flex-1 p-6 rounded-[15px] bg-white flex flex-col gap-3">
          <h2 className="text-lg text-cblue-600 font-bold">
            Thông tin người gửi
          </h2>
          <div className="flex flex-row gap-6">
            <div className=" flex-1 flex flex-col gap-2">
              <h3 className="text-sm text-cblue-600 font-semibold">
                Họ tên khách gửi
              </h3>
              <div className="w-full">
                <GdvInput
                  placeholder="Phạm Thị Thảo"
                  icon="account_circle"
                  isBig
                ></GdvInput>
              </div>
              <span className="text-[11px] text-cgray-400 font-normal">
                Họ và tên đầy đủ của khách gửi
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-sm text-cblue-600 font-semibold">
                Số điện thoại
              </h3>
              <div className="w-full">
                <GdvInput
                  placeholder="0123456789"
                  icon="smartphone"
                  isBig
                ></GdvInput>
              </div>
              <span className="text-[11px] text-cgray-400 font-normal">
                Số điện thoại của khách gửi
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">Địa chỉ</h3>
            <div className="w-full">
              <GdvInput
                placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
                icon="pin_drop"
                isBig
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Địa chỉ của khách gửi
            </span>
          </div>
        </div>
        <div className="flex-1 p-6 rounded-[15px] bg-white flex flex-col gap-3">
          <h2 className="text-lg text-cblue-600 font-bold">
            Thông tin người nhận
          </h2>
          <div className="flex flex-row gap-6">
            <div className=" flex-1 flex flex-col gap-2">
              <h3 className="text-sm text-cblue-600 font-semibold">
                Họ tên khách nhận
              </h3>
              <div className="w-full">
                <GdvInput
                  placeholder="Đỗ Nam Trung"
                  icon="account_circle"
                  isBig
                ></GdvInput>
              </div>
              <span className="text-[11px] text-cgray-400 font-normal">
                Họ và tên đầy đủ của khách nhận
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-sm text-cblue-600 font-semibold">
                Số điện thoại
              </h3>
              <div className="w-full">
                <GdvInput
                  placeholder="0123456789"
                  icon="smartphone"
                  isBig
                ></GdvInput>
              </div>
              <span className="text-[11px] text-cgray-400 font-normal">
                Số điện thoại của khách nhận
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">Địa chỉ</h3>
            <div className="w-full">
              <GdvInput
                placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
                icon="pin_drop"
                isBig
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Địa chỉ của khách nhận
            </span>
          </div>
        </div>
      </section>
      <section className="flex-1 flex flex-row gap-10">
        <div className="flex-1 flex flex-col gap-5">
          <div className="p-6 rounded-[15px] bg-white flex flex-col gap-1">
            <h2 className="text-lg text-cblue-600 font-bold">Hàng gửi</h2>
            {/* category */}
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row gap-[6px]">
                <div className="w-5 h-5 flex flex-row justify-center items-center rounded-md border-cblue-600 bg-cyellow-500">
                  <span className="material-symbols-outlined text-lg text-white">
                    check
                  </span>
                </div>
                <span className=" text-sm  text-black font-semibold">
                  Tài liệu
                </span>
              </div>
              <div className="flex flex-row gap-[6px]">
                <div className="w-5 h-5 flex flex-row justify-center items-center rounded-md border-cblue-600 bg-cyellow-500">
                  <span className="material-symbols-outlined text-lg text-white">
                    check
                  </span>
                </div>
                <span className=" text-sm  text-black font-semibold">
                  Hàng hóa
                </span>
              </div>
              <button className="ml-auto outline-none py-[2px] px-[10px] rounded-[8px] flex flex-row items-center bg-cyellow-500 hover:opacity-80 hover:cursor-pointer">
                <span className="material-symbols-outlined">add</span>
                <span className="text-[15px] font-normal">Đơn mới</span>
              </button>
            </div>
            {/* table */}
            <div className="flex flex-col rounded-lg border border-[#CCD7E2] overflow-hidden mt-3">
              <div className="flex flex-row w-full bg-cgray-100">
                <span className="w-2/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold py-[6px] border-r border-dashed border-[#CCD7E2]">
                  Nội dung
                </span>
                <span className="w-1/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold py-[6px] border-r border-dashed border-[#CCD7E2]">
                  Giá trị
                </span>
                <span className="w-1/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold py-[6px] border-r border-dashed border-[#CCD7E2]">
                  Số lượng
                </span>
                <span className="w-2/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold py-[6px] ">
                  Giấy tờ đính kèm
                </span>
              </div>
              <div className="flex flex-row w-full bg-white">
                <span className="w-2/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
                  Iphone Promax 15
                </span>
                <span className="w-1/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
                  1
                </span>
                <span className="w-1/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
                  37.000.000
                </span>
                <span className="w-2/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] ">
                  Giấy bảo hành
                </span>
              </div>
              <div className="flex flex-row w-full bg-white">
                <span className="w-2/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
                  Tổng
                </span>
                <span className="w-1/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
                  1
                </span>
                <span className="w-1/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
                  37.000.000
                </span>
                <span className="w-2/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] "></span>
              </div>
            </div>
          </div>
        </div>
        {/* separate */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3"></div>
        </div>
      </section>
    </main>
  );
};

export default ParcelContent;
