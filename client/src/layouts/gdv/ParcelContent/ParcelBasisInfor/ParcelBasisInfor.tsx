import { memo, useMemo } from "react";
import GdvInput from "@/components/GdvInput";
import { Infor } from "../ParcelContent";
import { INewParcel } from "@/redux/services/gdv.view";
import { Address } from "@/redux/services/queries/details.parcel";

export interface recommendAddressItem {
  id: string;
  name: string;
  type: string;
}

interface ParcelBasisInforProps {
  data?: INewParcel | null;
  isDisabled?: boolean;
  senderInfor: Infor | null;
  receiverInfor: Infor | null;
  onSenderInfor: any;
  onReceiverInfor: any;
  senderAddress: string;
  receiverAddress: string;
  onSenderAddressChange: any;
  onReceiverAddressChange: any;
  RecommendSender: recommendAddressItem[];
  RecommendReceiver: recommendAddressItem[];
  onSenderReccomend: any;
  onReceiverReccomend: any;
}
const ParcelBasisInfor = ({
  data = null,
  isDisabled = false,
  senderInfor,
  receiverInfor,
  onSenderInfor,
  onReceiverInfor,
  senderAddress,
  receiverAddress,
  onSenderAddressChange,
  onReceiverAddressChange,
  RecommendReceiver,
  RecommendSender,
  onSenderReccomend,
  onReceiverReccomend,
}: ParcelBasisInforProps) => {
  const covertAddress = (address: Address | undefined) => {
    return `${address?.commune?.name || ""}, ${
      address?.district?.name || ""
    }, ${address?.province?.name || ""}`;
  };
  const senderCompute = useMemo(() => {
    let result = "";
    result = RecommendSender.map((item) => item.name).join(", ");
    return result;
  }, [RecommendSender]);
  const receiverCompute = useMemo(() => {
    let result = "";
    result = RecommendReceiver.map((item) => item.name).join(", ");
    return result;
  }, [RecommendReceiver]);
  return (
    <section className="grid grid-cols-1  md:grid-cols-2 gap-5">
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3">
        <h2 className="text-lg text-cblue-600 font-bold">
          Thông tin người gửi
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Họ tên khách gửi
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="Phạm Thị Thảo"
                icon="account_circle"
                isBig
                value={isDisabled ? data?.sender.name : senderInfor?.name}
                onInfor={(result: string) => {
                  onSenderInfor("name", result);
                }}
                disabled={isDisabled}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Họ và tên đầy đủ của khách gửi
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Số điện thoại
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="0123456789"
                icon="smartphone"
                isBig
                value={isDisabled ? data?.sender.phone : senderInfor?.phone}
                onInfor={(result: string) => {
                  onSenderInfor("phone", result);
                }}
                disabled={isDisabled}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Số điện thoại của khách gửi
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-cblue-600 font-semibold">Địa chỉ</h3>
          <div className="relative w-full">
            <GdvInput
              placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
              icon="pin_drop"
              isBig
              onInfor={(result: string) => {
                onSenderAddressChange(result);
              }}
              value={
                isDisabled ? covertAddress(data?.sending_add) : senderAddress
              }
              disabled={isDisabled}
            ></GdvInput>
            {RecommendSender.length > 0 && (
              <div
                className="absolute left-0 w-full h-full top-full flex flex-row items-center px-3 rounded-lg bg-cyellow-500 cursor-default transition-all hover:opacity-80"
                onClick={() => onSenderReccomend(senderCompute)}
              >
                {senderCompute}
              </div>
            )}
          </div>
          <span className="text-[11px] text-cgray-400 font-normal">
            Địa chỉ của khách gửi
          </span>
        </div>
      </div>
      <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3">
        <h2 className="text-lg text-cblue-600 font-bold">
          Thông tin người nhận
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=" flex-1 flex flex-col gap-2">
            <h3 className="text-sm text-cblue-600 font-semibold">
              Họ tên khách nhận
            </h3>
            <div className="w-full">
              <GdvInput
                placeholder="Đỗ Nam Trung"
                icon="account_circle"
                isBig
                onInfor={(result: string) => {
                  onReceiverInfor("name", result);
                }}
                value={isDisabled ? data?.receiver.name : receiverInfor?.name}
                disabled={isDisabled}
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
                value={isDisabled ? data?.receiver.phone : receiverInfor?.phone}
                onInfor={(result: string) => {
                  onReceiverInfor("phone", result);
                }}
                disabled={isDisabled}
              ></GdvInput>
            </div>
            <span className="text-[11px] text-cgray-400 font-normal">
              Số điện thoại của khách nhận
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-cblue-600 font-semibold">Địa chỉ</h3>
          <div className="relative w-full">
            <GdvInput
              placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
              icon="pin_drop"
              isBig
              value={
                isDisabled
                  ? covertAddress(data?.receiving_add)
                  : receiverAddress
              }
              onInfor={(result: string) => {
                onReceiverAddressChange(result);
              }}
              disabled={isDisabled}
            ></GdvInput>
            {RecommendReceiver.length > 0 && (
              <div
                className="absolute left-0 w-full h-full top-full flex flex-row items-center px-3 rounded-lg bg-cyellow-500 cursor-default transition-all hover:opacity-80"
                onClick={() => onReceiverReccomend(receiverCompute)}
              >
                {receiverCompute}
              </div>
            )}
          </div>
          <span className="text-[11px] text-cgray-400 font-normal">
            Địa chỉ của khách nhận
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(ParcelBasisInfor);
