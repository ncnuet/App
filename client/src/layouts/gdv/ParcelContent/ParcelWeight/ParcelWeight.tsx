import { memo } from "react";
import GdvInput from "@/components/GdvInput";
import { ECostType, INewParcel } from "@/redux/services/gdv.view";

interface IParcelWeight {
  actualWeight: string;
  covertWeight: string;
  onActualWeight: any;
  onConvertWeight: any;
  isDisabled?: boolean;
  data?: INewParcel | null;
  costType?: ECostType;
  onChangeCostType?: any;
}
const ParcelWeight = ({
  actualWeight,
  covertWeight,
  onActualWeight,
  onConvertWeight,
  isDisabled = false,
  data = null,
  costType,
  onChangeCostType,
}: IParcelWeight) => {
  const totalWeight = () => {
    let result = 0;
    data?.goods.forEach((good) => {
      result += good.weight;
    });
    return result;
  };

  const mainCost = (weight: number) => {
    if (weight <= 100) {
      return 15000;
    } else if (weight > 100 && weight <= 200) {
      return 25000;
    } else if (weight > 200 && weight <= 500) {
      return 30000;
    } else {
      return 45000;
    }
  };
  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3">
        <h2 className="text-lg text-cblue-600 font-bold">
          Khối lượng hàng gửi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" flex-1 flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Khối lượng thực tế
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="20 gam"
                icon="scale"
                isBig
                onInfor={(result: string) => onActualWeight(result)}
                value={
                  isDisabled
                    ? totalWeight().toString() + " gam" || "0 gam"
                    : actualWeight
                }
                disabled={isDisabled}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Khối lượng hàng thực tế
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Khối lượng quy dổi
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="0 gam"
                icon="scale"
                isBig
                onInfor={(result: string) => onConvertWeight(result)}
                value={
                  isDisabled
                    ? totalWeight().toString() + " gam" || "0 gam"
                    : covertWeight
                }
                disabled={isDisabled}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Khối lượng hàng quy đổi
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg text-cblue-600 font-bold">Cước phí</h2>
          <div className="flex flex-row gap-[6px]">
            <div
              onClick={onChangeCostType}
              className={
                "w-5 h-5 flex flex-row justify-center items-center rounded-md cursor-default " +
                `${
                  (!isDisabled && costType === ECostType.RECEIVER_PAY) ||
                  (isDisabled &&
                    data?.cost_type ===
                      ECostType.RECEIVER_PAY.toUpperCase().split(" ").join("_"))
                    ? "bg-cyellow-500 "
                    : "bg-cyellow-100 border border-cyellow-500 "
                }` +
                `${isDisabled ? "pointer-events-none" : "pointer-events-auto"}`
              }
            >
              {((isDisabled &&
                data?.cost_type ===
                  ECostType.RECEIVER_PAY.toUpperCase().split(" ").join("_")) ||
                (!isDisabled && costType === ECostType.RECEIVER_PAY)) && (
                <span className="material-symbols-outlined text-lg text-white">
                  check
                </span>
              )}
            </div>
            <span className=" text-sm  text-black font-semibold">
              Người nhận thanh toán
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Cước chính
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              {!isDisabled
                ? mainCost(parseInt(covertWeight ? covertWeight : "0"))
                : data?.cost !== undefined
                ? (((data.cost - 900) * 10) / 11).toFixed(0).toString()
                : ""}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Phụ phí
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              900
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Phí thu hộ (COD)
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">0</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Cước GTGT
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              {!isDisabled
                ? mainCost(parseInt(covertWeight ? covertWeight : "0")) * 0.1
                : data?.cost !== undefined
                ? ((data.cost - 900) / 11).toFixed(0).toString()
                : ""}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Tổng cước (gồm VAT)
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">
              {isDisabled
                ? data?.cost !== undefined
                  ? data?.cost - 900
                  : ""
                : (
                    mainCost(parseInt(covertWeight ? covertWeight : "0")) * 1.1
                  ).toFixed(0)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Thu khác
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold">0</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-cblue-600 font-semibold">
              Tổng thu
            </span>
            <span className="text-[15px] text-cgray-500 font-semibold rounded-full px-[10px] py-[1px] bg-cyellow-500">
              {isDisabled
                ? data?.cost
                : (
                    mainCost(parseInt(covertWeight ? covertWeight : "0")) *
                      1.1 +
                    900
                  ).toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ParcelWeight);
