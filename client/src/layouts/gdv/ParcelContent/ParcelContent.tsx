"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import GdvInput from "@/components/GdvInput";
import ParcelBasisInfor from "./ParcelBasisInfor";
import ParcelGoods from "./ParcelGoods/ParcelGoods.tsx/ParcelGoods";
import ParcelSave from "./ParcelSave";
import ParcelWeight from "./ParcelWeight";
import PreviewLayout from "@/app/gdv/[pid]/preview/layout";
import GdvPage from "@/app/gdv/[pid]/preview/page";

interface IParcelContent {
  isCancel: boolean | null;
  isModal: boolean;
  isPreview: boolean;
  onSave: any;
  onChangeModal: any;
  onChangePreview: any;
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
const ParcelContent = ({
  isCancel,
  isModal,
  isPreview,
  onChangeModal,
  onSave,
  onChangePreview,
}: IParcelContent) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [goods, setGoods] = useState<goods[]>([]);
  const [grossValue, setGrossValue] = useState<goods>();
  const [isDocument, setIsDocument] = useState<boolean>(false);
  const [isGood, setIsGood] = useState<boolean>(false);
  const [senderInfor, setSenderInfor] = useState<Infor>(emptyInfor);
  const [receiverInfor, setReceiverInfor] = useState<Infor>(emptyInfor);
  const [note, setNote] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [covertWeight, setConverWeight] = useState<string>("");

  // remove everything

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

  const onActualWeight = useCallback((result: string) => {
    setActualWeight(result);
  }, []);

  const onConvertWeight = useCallback((result: string) => {
    setConverWeight(result);
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

  const previewProps = {
    goods,
    grossValue,
    isDocument,
    isGood,
    senderInfor,
    receiverInfor,
    note,
    actualWeight,
    covertWeight,
  };

  const onClosePreview = () => {
    previewRef.current?.classList.toggle("gdv-hidden-animation__preview");
    timeoutRef.current = setTimeout(() => {
      previewRef.current?.classList.toggle("gdv-hidden-animation__preview");
      onChangePreview();
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

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
        <ParcelWeight
          actualWeight={actualWeight}
          covertWeight={covertWeight}
          onActualWeight={onActualWeight}
          onConvertWeight={onConvertWeight}
        ></ParcelWeight>
      </section>
      {isModal && (
        <ParcelSave
          isModal={isModal}
          onSave={onSave}
          onChangeModal={onChangeModal}
          onPreview={onChangePreview}
        ></ParcelSave>
      )}
      {isPreview && (
        <div
          ref={previewRef}
          className="absolute top-0 left-0 right-0 bottom-0 gdv-animation__preview"
        >
          <PreviewLayout>
            <button
              onClick={onClosePreview}
              className="absolute top-3 left-4 min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-transparent text-black hover:opacity-60 active:opacity-90"
            >
              <span className="material-symbols-outlined text-[22px]">
                arrow_back_ios
              </span>
              <span className="text-[16px] font-medium">Trở lại</span>
            </button>
            <GdvPage {...previewProps}></GdvPage>
          </PreviewLayout>
        </div>
      )}
    </main>
  );
};

export default ParcelContent;
