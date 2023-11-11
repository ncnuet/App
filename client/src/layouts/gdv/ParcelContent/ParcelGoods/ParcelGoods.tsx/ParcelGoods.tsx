import { memo } from "react";
import { goods } from "../../ParcelContent";

interface IParcelGoods {
  isDocument: boolean;
  isGood: boolean;
  onDocument: any;
  onGoods: any;
  onChangeGoods: any;
  onNewGoods: any;
  onGrossValue: any;
  grossValue: goods | undefined;
  goods: goods[];
  note: string;
  onNote: any;
}

const ParcelGoods = ({ ...props }: IParcelGoods) => {
  const formatNumber = (amount: string) => {
    let number = parseFloat(amount);

    if (isNaN(number)) {
      // If the input is not a valid number, return the input as is
      return amount;
    }

    if (number >= 1000000) {
      return (number / 1000000).toFixed(2).toString() + "m";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2).toString() + "k";
    } else {
      return number.toString();
    }
  };
  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-1">
        <h2 className="text-lg text-cblue-600 font-bold">Hàng gửi</h2>
        {/* category */}
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row gap-[6px]">
            <div
              onClick={props.onDocument}
              className={
                "w-5 h-5 flex flex-row justify-center items-center rounded-md select-none " +
                `${
                  props.isDocument
                    ? "bg-cyellow-500"
                    : "bg-cyellow-100 border border-cyellow-500"
                }`
              }
            >
              {props.isDocument && (
                <span className="material-symbols-outlined text-lg text-white">
                  check
                </span>
              )}
            </div>
            <span className=" text-sm text-black font-semibold">Tài liệu</span>
          </div>
          <div className="flex flex-row gap-[6px]">
            <div
              onClick={props.onGoods}
              className={
                "w-5 h-5 flex flex-row justify-center items-center rounded-md select-none " +
                `${
                  props.isGood
                    ? "bg-cyellow-500"
                    : "bg-cyellow-100 border border-cyellow-500"
                }`
              }
            >
              {props.isGood && (
                <span className="material-symbols-outlined text-lg text-white">
                  check
                </span>
              )}
            </div>
            <span className=" text-sm  text-black font-semibold">Hàng hóa</span>
          </div>
          <button
            className="ml-auto outline-none py-[2px] px-[10px] rounded-[8px] flex flex-row items-center bg-cyellow-500 hover:opacity-80 hover:cursor-pointer"
            onClick={props.onNewGoods}
          >
            <span className="material-symbols-outlined">add</span>
            <span className="text-[15px] font-normal flex-none">Đơn mới</span>
          </button>
        </div>
        {/* table */}
        <div className="flex flex-col rounded-lg border border-[#CCD7E2] overflow-hidden mt-3">
          <div className="flex flex-row w-full bg-cgray-100">
            <span className="w-2/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold text-center py-[6px] border-r border-dashed border-[#CCD7E2]">
              Nội dung
            </span>
            <span className="w-1/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold text-center py-[6px] border-r border-dashed border-[#CCD7E2]">
              Giá trị
            </span>
            <span className="w-1/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold text-center py-[6px] border-r border-dashed border-[#CCD7E2]">
              Số lượng
            </span>
            <span className="w-2/5 flex flex-row justify-center items-center text-sm text-cgray-500 font-semibold text-center py-[6px] ">
              Giấy tờ đính kèm
            </span>
          </div>

          {props.goods.map((good, index) => (
            <div className="flex flex-row w-full bg-white" key={index}>
              <input
                spellCheck={false}
                className="w-2/5 flex flex-row justify-center items-center text-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2] outline-[#CCD7E2]"
                placeholder="Nội dung"
                onChange={(e) =>
                  props.onChangeGoods(e.target.value, "content", index)
                }
              ></input>
              <input
                spellCheck={false}
                className="w-1/5 flex flex-row justify-center items-center text-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2] outline-[#CCD7E2]"
                placeholder="Giá trị"
                defaultValue={good.value}
                onChange={(e) =>
                  props.onChangeGoods(e.target.value, "value", index)
                }
                onBlur={(e) => {
                  e.target.value = formatNumber(e.target.value);
                  props.onGrossValue();
                }}
              ></input>
              <input
                spellCheck={false}
                className="w-1/5 flex flex-row justify-center items-center text-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2] outline-[#CCD7E2]"
                placeholder="Số lượng"
                defaultValue={good.amount}
                onChange={(e) =>
                  props.onChangeGoods(e.target.value, "amount", index)
                }
                onBlur={props.onGrossValue}
              ></input>
              <input
                spellCheck={false}
                className="w-2/5 flex flex-row justify-center items-center text-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2] outline-[#CCD7E2]"
                placeholder="Giấy tờ"
                onChange={(e) =>
                  props.onChangeGoods(e.target.value, "document", index)
                }
              ></input>
            </div>
          ))}

          <div className="flex flex-row w-full bg-white">
            <span className="w-2/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
              Tổng
            </span>
            <span className="w-1/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
              {props.grossValue?.value || 0}
            </span>
            <span className="w-1/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] border-r border-dashed border-[#CCD7E2]">
              {props.grossValue?.amount || 0}
            </span>
            <span className="w-2/5 flex flex-row justify-center items-center text-[15px] text-cgray-500 font-normal py-[6px] "></span>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3">
        <h2 className="text-lg text-cblue-600 font-bold">Chú dẫn nghiệp vụ</h2>
        <textarea
          onChange={(e) => props.onNote(e.target.value)}
          value={props.note}
          spellCheck={false}
          placeholder="Chú thích cho chuyển phát"
          className="p-2 rounded-lg bg-cgray-100 h-[124px] text-[15px] text-gray-500 resize-none outline-none border border-[#CCD7E2]"
        ></textarea>
        <span className="text-[11px] text-cgray-400">Ghi chú chuyển phát</span>
      </div>
    </div>
  );
};

export default memo(ParcelGoods);
