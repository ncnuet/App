import CheckBox from "@/components/CheckBox";

const ParcelBill = () => {
  return (
    <section className="grid grid-2 border-[1px] border-black">
      <div className="w-1/2 flex flex-col border-r-[1px] border-r-black">
        <div className="p-2 border-b-[1px] border-b-black">
          <h2 className="text-base text-black font-semibold">
            1. Họ tên địa chỉ người gửi
          </h2>
          <div className="px-[18px] flex flex-col mb-4">
            <span className="text-[15px] text-black font-light">Hà Mã Tấu</span>
            <span className="text-[15px] text-black font-light">
              Dịch Vọng Hậu - Cầu Giấy - Hà Nội
            </span>
          </div>
          <div className="px-[18px] flex flex-col">
            <div className="flex flex-row items-center">
              <span className="text-base text-black font-semibold pr-3">
                Mã khách hàng:
              </span>
              <span className="text-[15px] text-black font-light">
                KH125481512345
              </span>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex-1 flex-row items-center">
                <span className="text-base text-black font-semibold pr-3">
                  Điện thoại:
                </span>
                <span className="text-[15px] text-black font-light">
                  0123456789
                </span>
              </div>
              <div className="flex-1 flex-row items-center">
                <span className="text-base text-black font-semibold pr-3">
                  Mã bưu chính:
                </span>
                <span className="text-[15px] text-black font-light">10179</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 border-b border-black">
          <div className="mb-2">
            <h2 className="text-base text-black font-semibold mb-2">
              3. Loại hàng gửi
            </h2>
            <div className="flex flex-row items-center">
              <div className="flex-1 flex flex-row justify-center">
                <CheckBox isChecked={false} content="Tài liệu"></CheckBox>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <CheckBox isChecked={true} content="Hàng hóa"></CheckBox>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base text-black font-semibold mb-2">
              4. Nội dung giá trị bưu gửi
            </h2>
            <div className="border border-black">
              <div className="flex flex-row border-b border-black bg-cgray-100">
                <div className="w-2/5 flex flex-row justify-center items-center text-base text-black font-semibold border-r border-black py-1">
                  Nội dung
                </div>
                <div className="w-1/5 flex flex-row justify-center items-center text-base text-black font-semibold border-r border-black py-1">
                  Giá trị
                </div>
                <div className="w-1/5 flex flex-row justify-center items-center text-base text-black font-semibold border-r border-black py-1">
                  Số lượng
                </div>
                <div className="w-2/5 flex flex-row justify-center items-center text-base text-black font-semibold py-1">
                  Giấy tờ đính kèm
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-2/5 flex flex-row justify-center items-center text-[15px] text-black font-normal border-r border-black py-[2px]">
                  IP promax 15
                </div>
                <div className="w-1/5 flex flex-row justify-center items-center text-[15px] text-black font-normal border-r border-black py-[2px]">
                  300k
                </div>
                <div className="w-1/5 flex flex-row justify-center items-center text-[15px] text-black font-normal border-r border-black py-[2px]">
                  1
                </div>
                <div className="w-2/5 flex flex-row justify-center items-center text-[15px] text-black font-normal py-[2px]">
                  Phiếu bảo hành
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-2/5 flex flex-row justify-center items-center text-[15px] text-black font-normal border-r border-black py-[2px]">
                  Tổng
                </div>
                <div className="w-1/5 flex flex-row justify-center items-center text-[15px] text-black font-normal border-r border-black py-[2px]">
                  300k
                </div>
                <div className="w-1/5 flex flex-row justify-center items-center text-[15px] text-black font-normal border-r border-black py-[2px]">
                  1
                </div>
                <div className="w-2/5 flex flex-row justify-center items-center text-[15px] text-black font-normal py-[2px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 border-b-[1px] border-b-black">
          <h2 className="text-base text-black font-semibold mb-2">
            5. Chỉ dẫn của người gửi khi không phát được bưu gửi
          </h2>
          <div className="flex flex-col">
            <div className="flex flex-row gap-6 mb-3">
              <CheckBox isChecked content="Chuyển hoàn ngay"></CheckBox>
              <CheckBox isChecked content="Gọi điện cho người gửi"></CheckBox>
              <CheckBox isChecked content="Hủy"></CheckBox>
            </div>
            <div className="flex flex-row gap-6 mb-3">
              <CheckBox isChecked content="Chuyển hoàn trước ngày"></CheckBox>
            </div>
            <div className="flex flex-row gap-6">
              <CheckBox
                isChecked
                content="Chuyển hoàn trước khi hết thời gian lưu giữ"
              ></CheckBox>
            </div>
          </div>
        </div>
        <div className="p-2 mb-2 flex flex-col gap-2">
          <div>
            <h2 className="text-base text-black font-semibold">
              6. Cam kết của người gửi
            </h2>
            <p className="pl-2 text-[15px] text-black font-light">
              Tôi chấp nhận các điều khoản tại mặt sau của phiếu gửi và cam đoan
              bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường
              hợp không phát được hãy thực hiện chỉ dẫn tại mục 5, tôi sẽ trả
              cước chuyển hoàn.
            </p>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex flex-col">
              <h2 className="text-base text-black font-semibold ">
                7. Ngày giờ gửi
              </h2>
              <p className="pl-2 text-[15px] text-black font-light">
                07h52p - 18/10/2023
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-base text-black font-semibold ">
                Chữ ký của người gửi
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcelBill;
