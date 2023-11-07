import CheckBox from "@/components/CheckBox";

const ParcelBill = () => {
  return (
    <section className="flex flex-col border border-black">
      <div className="flex flex-col sm:flex-row border border-b border-b-black">
        <div className="sm:w-1/2 p-2 border-b border-b-black sm:border-b-[0px]  sm:border-r-[1px] sm:border-r-black">
          <h2 className="parcel-bill__heading">1. Họ tên địa chỉ người gửi</h2>
          <div className="px-[18px] flex flex-col mb-4">
            <span className="parcel-bill__content">Hà Mã Tấu</span>
            <span className="parcel-bill__content">
              Dịch Vọng Hậu - Cầu Giấy - Hà Nội
            </span>
          </div>
          <div className="px-[18px] flex flex-col">
            <div className="flex flex-row items-center">
              <span className="parcel-bill__heading pr-3">Mã khách hàng:</span>
              <span className="parcel-bill__content">KH125481512345</span>
            </div>
            <div className="flex flex-col justify-start  lg:flex-row lg:items-center">
              <div className="flex-1 flex-row items-center">
                <span className="parcel-bill__heading pr-3">Điện thoại:</span>
                <span className="parcel-bill__content">0123456789</span>
              </div>
              <div className="flex-1 flex-row items-center">
                <span className="parcel-bill__heading pr-3">Mã bưu chính:</span>
                <span className="parcel-bill__content">10179</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 p-2">
          <h2 className="parcel-bill__heading">2. Họ tên địa chỉ người nhận</h2>
          <div className="px-[18px] flex flex-col mb-4">
            <span className="parcel-bill__content">Hà Mã Tấu</span>
            <span className="parcel-bill__content">
              Dịch Vọng Hậu - Cầu Giấy - Hà Nội
            </span>
          </div>
          <div className="px-[18px] flex flex-col">
            <div className="flex flex-row items-center">
              <span className="parcel-bill__heading pr-3">Mã khách hàng:</span>
              <span className="parcel-bill__content">KH125481512345</span>
            </div>
            <div className="flex flex-col justify-start  lg:flex-row lg:items-center">
              <div className="flex-1 flex-row items-center">
                <span className="parcel-bill__heading pr-3">Điện thoại:</span>
                <span className="parcel-bill__content">0123456789</span>
              </div>
              <div className="flex-1 flex-row items-center">
                <span className="parcel-bill__heading pr-3">Mã bưu chính:</span>
                <span className="parcel-bill__content">10179</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col md:border-r-[1px] md:border-r-black">
          <div className="p-2 border-b border-black">
            <div className="mb-2">
              <h2 className="parcel-bill__heading mb-2">3. Loại hàng gửi</h2>
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
              <h2 className="parcel-bill__heading mb-2">
                4. Nội dung giá trị bưu gửi
              </h2>
              <div className="border border-black">
                <div className="flex flex-row border-b border-black bg-cgray-100">
                  <div className="w-2/5 flex flex-row justify-center items-center parcel-bill__heading border-r border-black py-1">
                    Nội dung
                  </div>
                  <div className="w-1/5 flex flex-row justify-center items-center parcel-bill__heading border-r border-black py-1">
                    Giá trị
                  </div>
                  <div className="w-1/5 flex flex-row justify-center items-center parcel-bill__heading border-r border-black py-1">
                    Số lượng
                  </div>
                  <div className="w-2/5 flex flex-row justify-center items-center parcel-bill__heading py-1">
                    Giấy tờ đính kèm
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-2/5 flex flex-row justify-center items-center parcel-bill__content border-r border-black py-[2px]">
                    IP promax 15
                  </div>
                  <div className="w-1/5 flex flex-row justify-center items-center parcel-bill__content border-r border-black py-[2px]">
                    300k
                  </div>
                  <div className="w-1/5 flex flex-row justify-center items-center parcel-bill__content border-r border-black py-[2px]">
                    1
                  </div>
                  <div className="w-2/5 flex flex-row justify-center items-center parcel-bill__content py-[2px]">
                    Phiếu bảo hành
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-2/5 flex flex-row justify-center items-center parcel-bill__content border-r border-black py-[2px]">
                    Tổng
                  </div>
                  <div className="w-1/5 flex flex-row justify-center items-center parcel-bill__content border-r border-black py-[2px]">
                    300k
                  </div>
                  <div className="w-1/5 flex flex-row justify-center items-center parcel-bill__content border-r border-black py-[2px]">
                    1
                  </div>
                  <div className="w-2/5 flex flex-row justify-center items-center parcel-bill__content py-[2px]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 border-b-[1px] border-b-black">
            <h2 className="parcel-bill__heading mb-2">
              5. Chỉ dẫn của người gửi khi không phát được bưu gửi
            </h2>
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row gap-6 mb-3">
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
              <h2 className="parcel-bill__heading">6. Cam kết của người gửi</h2>
              <p className="pl-2 parcel-bill__content">
                Tôi chấp nhận các điều khoản tại mặt sau của phiếu gửi và cam
                đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi.
                Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 5, tôi
                sẽ trả cước chuyển hoàn.
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <div className="flex-1 flex flex-col">
                <h2 className="parcel-bill__heading ">7. Ngày giờ gửi</h2>
                <p className="pl-2 parcel-bill__content">07h52p - 18/10/2023</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <h2 className="parcel-bill__heading ">Chữ ký của người gửi</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t border-t-black  md:border-none">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col border-r border-transparent sm:border-r-black">
              <div className="p-2 border-b border-black">
                <h2 className="parcel-bill__heading mb-1">9. Cước phí</h2>
                <div className="grid grid-cols-3 border border-black">
                  <div className="col-span-2 grid-rows-6 border-r border-black flex flex-col">
                    <span className="p-1 border-b border-black  parcel-bill__content">
                      Cước chính
                    </span>
                    <span className="p-1 border-b border-black parcel-bill__content">
                      Phụ phí
                    </span>
                    <span className="p-1 border-b border-black parcel-bill__content">
                      GTGT
                    </span>
                    <span className="p-1 border-b border-black parcel-bill__content">
                      Tổng cước
                    </span>
                    <span className="p-1 border-b border-black parcel-bill__content">
                      Thu khác
                    </span>
                    <span className="p-1 bg-cgray-100 font-semibold">
                      Tổng thu
                    </span>
                  </div>
                  <div className="grid-rows-6 border-r flex flex-col">
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      9.500
                    </span>
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      1.900
                    </span>
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      0
                    </span>
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      12.312
                    </span>
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      0
                    </span>
                    <span className="p-1 text-right bg-cgray-100 font-semibold">
                      12.312
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h2 className="parcel-bill__heading mb-1">
                  10. Thu của người nhận
                </h2>
                <div className="grid grid-cols-3 border border-black">
                  <div className="col-span-2 grid-rows-3 border-r border-black flex flex-col">
                    <span className="p-1 border-b border-black  parcel-bill__content">
                      COD
                    </span>
                    <span className="p-1 border-b border-black parcel-bill__content">
                      Thu khác
                    </span>
                    <span className="p-1 bg-cgray-100 font-semibold">
                      Tổng thu
                    </span>
                  </div>
                  <div className="grid-rows-6 border-r flex flex-col">
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      0
                    </span>
                    <span className="p-1 border-b border-black text-right parcel-bill__content">
                      0
                    </span>
                    <span className="p-1 text-right bg-cgray-100 font-semibold">
                      12.312
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-2">
                <h2 className="parcel-bill__heading  mb-1">11. Khối lượng</h2>
                <div className="border border-black">
                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="col-span-3 parcel-bill__content p-1">
                      Khối lượng thực thế
                    </div>
                    <div className="col-span-1 text-right parcel-bill__content border-l border-black p-1">
                      30
                    </div>
                  </div>
                  <div className="grid grid-cols-4 bg-cgray-100">
                    <div className="col-span-3 parcel-bill__heading p-1">
                      Khối lượng quy đổi
                    </div>
                    <div className="col-span-1 text-right parcel-bill__heading border-l border-black p-1">
                      0
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h2 className="parcel-bill__heading pb-12 sm:mb-1">
                  12. Chú dẫn nghiệp vụ
                </h2>
              </div>
            </div>
          </div>
          <div className="flex-1 border-t border-black flex flex-col xs:flex-row">
            <div className="xs:w-1/2 p-2 flex flex-col items-center border-r border-transparent border-b border-b-black xs:border-b-transparent xs:border-r-black">
              <h2 className="parcel-bill__heading ">13. Thu của người nhận</h2>
              <span className="parcel-bill__content pb-6 xs:pb-0 text-center">
                Chữ ký vủa giao dịch viên
              </span>
              <div className="mt-auto parcel-bill__content">
                GDV. Trần Thị Thu Hà
              </div>
            </div>
            <div className="xs:w-1/2 p-2 flex flex-col border-r">
              <h2 className="parcel-bill__heading self-center xs:self-start">
                14. Ngày giờ nhận
              </h2>
              <span className="parcel-bill__content self-center xs:self-start">
                ....h..../....../....../20.....
              </span>
              <span className="parcel-bill__content self-center text-center">
                Người nhận/được ủy quyền
              </span>
              <span className="parcel-bill__content self-center pb-4 sm:pb-0">
                (Ký rõ họ tên)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcelBill;
