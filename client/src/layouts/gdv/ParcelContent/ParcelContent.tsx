"use client";
import { useState, useEffect, useCallback } from "react";
import GdvInput from "@/components/GdvInput";
import ParcelBasisInfor from "./ParcelBasisInfor";
import ParcelGoods from "./ParcelGoods/ParcelGoods.tsx/ParcelGoods";

interface IParcelContent {
  isCancel: boolean | null;
}

export interface goods {
  content: string;
  value: string;
  amount: string;
  document: string;
}

export interface Infor {
  name: string;
  phone: string;
  address: string;
}

const emptyGood: goods = { content: "", value: "0", amount: "0", document: "" };
const emptyInfor: Infor = { name: "", phone: "", address: "" };
const ParcelContent = ({ isCancel }: IParcelContent) => {
  const [goods, setGoods] = useState<goods[]>([]);
  const [grossValue, setGrossValue] = useState<goods>();
  const [isDocument, setIsDocument] = useState<boolean>(false);
  const [isGood, setIsGood] = useState<boolean>(false);
  const [senderInfor, setSenderInfor] = useState<Infor>(emptyInfor);
  const [receiverInfor, setReceiverInfor] = useState<Infor>(emptyInfor);
  const [note, setNote] = useState("");
  const [actualWeight, setActualWeight] = useState("");
  const [covertWeight, setConverWeight] = useState("");
  // remove everything
  useEffect(() => {
    if (isCancel) {
      setSenderInfor(emptyInfor);
      setReceiverInfor(emptyInfor);
      setGoods([]);
      setGrossValue(undefined);
      setIsGood(false);
      setIsDocument(false);
      setNote("");
      setActualWeight("");
      setConverWeight("");
    }
  }, [isCancel]);

  const onNote = useCallback((result: string) => {
    setNote(result);
  }, []);

  const onSenderInfor = useCallback(
    (type: string, result: string) => {
      switch (type) {
        case "name":
          setSenderInfor({ ...senderInfor, name: result });
          break;
        case "phone":
          setSenderInfor({ ...senderInfor, phone: result });
          break;
        case "address":
          setSenderInfor({ ...senderInfor, address: result });
          break;
      }
    },
    [senderInfor]
  );

  const onReceiverInfor = useCallback(
    (type: string, result: string) => {
      switch (type) {
        case "name":
          setReceiverInfor({ ...receiverInfor, name: result });
          break;
        case "phone":
          setReceiverInfor({ ...receiverInfor, phone: result });
          break;
        case "address":
          setReceiverInfor({ ...receiverInfor, address: result });
          break;
      }
    },
    [receiverInfor]
  );

  const onNewGoods = useCallback(() => {
    setGoods((preGoods) => [...preGoods, emptyGood]);
  }, []);

  const onChangeGoods = useCallback(
    (result: string, type: string, pos: number) => {
      switch (type) {
        case "content":
          goods.splice(pos, 1, {
            ...goods[pos],
            content: result,
          });
          break;
        case "value":
          goods.splice(pos, 1, {
            ...goods[pos],
            value: result === "" ? "0" : result,
          });
          break;
        case "amount":
          goods.splice(pos, 1, {
            ...goods[pos],
            amount: result === "" ? "0" : result,
          });
          break;
        case "document":
          goods.splice(pos, 1, {
            ...goods[pos],
            document: result,
          });
          break;
      }
      setGoods(goods);
    },
    [goods]
  );

  const onGrossValue = useCallback(() => {
    let gross = goods.reduce((prev, cur) => {
      return {
        ...cur,
        amount: (parseFloat(prev.amount) + parseFloat(cur.amount)).toString(),
        value: (parseFloat(prev.value) + parseFloat(cur.value)).toString(),
      };
    });
    setGrossValue(gross);
  }, [goods]);

  const onDocument = useCallback(() => {
    setIsDocument((prev) => !prev);
  }, []);

  const onGoods = useCallback(() => {
    setIsGood((prev) => !prev);
  }, []);

  const parcelGoodProps = {
    isDocument,
    isGood,
    grossValue,
    goods,
    note,
    onDocument,
    onGoods,
    onChangeGoods,
    onNewGoods,
    onGrossValue,
    onNote,
  };

  return (
    <main className="xs:pl-0 pl-1 overflow-y-scroll flex-grow w-full flex flex-col gap-5 gdv-parcel pr-1">
      <ParcelBasisInfor
        senderInfor={senderInfor}
        receiverInfor={receiverInfor}
        onSenderInfor={onSenderInfor}
        onReceiverInfor={onReceiverInfor}
      ></ParcelBasisInfor>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ParcelGoods {...parcelGoodProps}></ParcelGoods>
        <div className="flex-1 flex flex-col gap-5">
          <div className="p-6 rounded-[15px] bg-white flex flex-col gap-3">
            <h2 className="text-lg text-cblue-600 font-bold">
              Khối lượng thực tế
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" flex-1 flex flex-col gap-2">
                <h3 className="text-sm text-cblue-600 font-semibold">
                  Họ tên khách gửi
                </h3>
                <div className="w-full">
                  <GdvInput
                    placeholder="20 gam"
                    icon="scale"
                    isBig
                    onInfor={(result: string) => setActualWeight(result)}
                    value={actualWeight}
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
                    onInfor={(result: string) => setConverWeight(result)}
                    value={covertWeight}
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
                <div className="w-5 h-5 flex flex-row justify-center items-center rounded-md border-cblue-600 bg-cyellow-500">
                  <span className="material-symbols-outlined text-lg text-white">
                    check
                  </span>
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
                  9.500
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-cblue-600 font-semibold">
                  Phụ phí
                </span>
                <span className="text-[15px] text-cgray-500 font-semibold">
                  1.900
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-cblue-600 font-semibold">
                  Phí thu hộ (COD)
                </span>
                <span className="text-[15px] text-cgray-500 font-semibold">
                  0
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-cblue-600 font-semibold">
                  Cước GTGT
                </span>
                <span className="text-[15px] text-cgray-500 font-semibold">
                  0
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-cblue-600 font-semibold">
                  Tổng cước (gồm VAT)
                </span>
                <span className="text-[15px] text-cgray-500 font-semibold">
                  12.312
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-cblue-600 font-semibold">
                  Thu khác
                </span>
                <span className="text-[15px] text-cgray-500 font-semibold">
                  0
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-cblue-600 font-semibold">
                  Tổng thu
                </span>
                <span className="text-[15px] text-cgray-500 font-semibold rounded-full px-[10px] py-[1px] bg-cyellow-500">
                  13.312
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ParcelContent;
