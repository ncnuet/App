"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import GdvInput from "@/components/GdvInput";
import ParcelBasisInfor from "./ParcelBasisInfor";
import ParcelGoods from "./ParcelGoods/ParcelGoods.tsx/ParcelGoods";
import ParcelSave from "./ParcelSave";
import ParcelWeight from "./ParcelWeight";
import PreviewLayout from "@/app/(gdv)/[pid]/preview/layout";
import GdvPage from "@/app/(gdv)/[pid]/preview/page";
import axios from "axios";
import useDebounce from "./ParcelHooks/useDebounce";
import { recommendAddressItem } from "./ParcelBasisInfor/ParcelBasisInfor";
import {
  Address,
  EStatusParcel,
} from "@/redux/services/queries/details.parcel";
import {
  ECostType,
  EGoodsType,
  EReturnType,
  INewParcel,
  sendNewParcel,
} from "@/redux/services/gdv.view";

interface IParcelContent {
  isCancel: boolean | null;
  isModal: boolean;
  isPreview: boolean;
  isDisabled: boolean;
  data: INewParcel | null;
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
}

const emptyGood: goods = { content: "", value: "0", amount: "0", document: "" };
const emptyInfor: Infor = { name: "", phone: "" };
const ParcelContent = ({
  data,
  isDisabled = false,
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
  const [senderAddress, setSenderAddress] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [isSenderSelected, setIsSenderSelected] = useState<boolean>(false);
  const [isReceiverSelected, setIsReceiverSelected] = useState<boolean>(false);
  const [senderRecommend, setSenderRecommend] = useState<
    recommendAddressItem[]
  >([]);
  const [receiverRecommend, setReceiverRecommend] = useState<
    recommendAddressItem[]
  >([]);
  const [officialSenderAddress, setOfficialSenderAddress] = useState<Address>(
    {}
  );
  const [officialReceiverAddress, setOfficialReceiverAddress] =
    useState<Address>({});
  const [note, setNote] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [covertWeight, setConverWeight] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [costType, setCostType] = useState<ECostType>(ECostType.RECEIVER_PAY);
  // remove everything
  const debounceSender = useDebounce(senderAddress, 500);
  const debounceReceiver = useDebounce(receiverAddress, 500);

  const onChangeCostType = () => {
    setCostType((prev) => {
      if (prev === ECostType.RECEIVER_PAY) {
        return ECostType.SENDER_PAY;
      }
      return ECostType.RECEIVER_PAY;
    });
  };

  const mainCost = (weight: number) => {
    let money: number;
    if (weight <= 100) {
      return 15000;
    } else if (weight > 100 && weight <= 200) {
      return 25000;
    } else if (weight > 200 && weight <= 500) {
      money = 30000;
    } else {
      money = 45000;
    }
    setCost(parseInt((money * 1.1).toFixed(0)) + 900);
  };

  const onSenderReccomend = useCallback(
    (result: string) => {
      setSenderAddress(result);
      setSenderRecommend([]);
      onSaveFormSender(senderRecommend, "sender");
      setIsSenderSelected(true);
    },
    [senderRecommend]
  );

  const onReceiverReccomend = useCallback(
    (result: string) => {
      setReceiverAddress(result);
      setReceiverRecommend([]);
      onSaveFormSender(receiverRecommend, "receiver");
      setIsReceiverSelected(true);
    },
    [receiverRecommend]
  );

  const onSaveFormSender = (data: recommendAddressItem[], type: string) => {
    var senderForm: Address = {};
    data.forEach((item) => {
      switch (item.type) {
        case "Xã":
          senderForm = {
            ...senderForm,
            commune: { name: item.name, id: item.id },
          };
          break;
        case "Thị trấn":
          senderForm = {
            ...senderForm,
            commune: { name: item.name, id: item.id },
          };
          break;
        case "Huyện":
          senderForm = {
            ...senderForm,
            district: { name: item.name, id: item.id },
          };
          break;
        case "Tỉnh":
          senderForm = {
            ...senderForm,
            province: { name: item.name, id: item.id },
          };
          break;
        case "Thành phố":
          senderForm = {
            ...senderForm,
            province: { name: item.name, id: item.id },
          };
          break;
      }
    });
    if (type === "sender") {
      setOfficialSenderAddress(senderForm);
    } else {
      setOfficialReceiverAddress(senderForm);
    }
  };

  const onSenderAddressChange = useCallback(
    (result: string) => {
      setSenderAddress(result);
    },
    [senderAddress]
  );

  const onReceiverAddressChange = useCallback(
    (result: string) => {
      setReceiverAddress(result);
    },
    [receiverAddress]
  );

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
  }, [isDocument]);

  const onGoods = useCallback(() => {
    setIsGood((prev) => !prev);
  }, [isGood]);

  const onActualWeight = useCallback((result: string) => {
    setActualWeight(result);
  }, []);

  const onConvertWeight = useCallback((result: string) => {
    setConverWeight(result);
    mainCost(parseInt(result));
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
    data,
    isDisabled,
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
    senderAddress,
    receiverAddress,
    cost,
  };

  const onClosePreview = () => {
    previewRef.current?.classList.toggle("gdv-hidden-animation__preview");
    timeoutRef.current = setTimeout(() => {
      previewRef.current?.classList.toggle("gdv-hidden-animation__preview");
      onChangePreview();
    }, 200);
  };

  const getSenderAddress = async () => {
    try {
      const response = await fetch(`/api/address?keyword=${debounceSender}`, {
        method: "POST",
      });
      const data = await response.json();
      setSenderRecommend(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    const newParcel: INewParcel = {
      cost: cost,
      cost_type: ECostType.SENDER_PAY,
      notes: note,
      goods_type:
        isGood && !isDocument
          ? EGoodsType.GOODS
          : !isGood && isDocument
          ? EGoodsType.DOCUMENT
          : "goods",
      return_type: EReturnType.RETURN_NOW,
      status: EStatusParcel.DELIVERING.toLowerCase(),
      sender: senderInfor,
      receiver: receiverInfor,
      sending_add: {
        ...officialSenderAddress,
        country: {
          name: "Việt Nam",
          id: "vi",
        },
      },
      receiving_add: {
        ...officialReceiverAddress,
        country: {
          name: "Việt Nam",
          id: "vi",
        },
      },
      goods: goods.map((good) => ({
        category: "electronic devices",
        name: good.content,
        quantity: parseInt(good.amount),
        weight: 200,
        value: parseInt(good.value),
      })),
    };
    try {
      const response = await sendNewParcel(newParcel);
      return response;
    } catch (error) {
      return error;
    }
  };

  const getReiverAddress = async () => {
    try {
      const response = await fetch(`/api/address?keyword=${debounceReceiver}`, {
        method: "POST",
      });
      const data = await response.json();
      setReceiverRecommend(data);
    } catch (error) {
      console.log(error);
    }
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
      setSenderAddress("");
      setReceiverAddress("");
    }
  }, [isCancel]);

  useEffect(() => {
    if (isSenderSelected) {
      setIsSenderSelected(false);
    } else {
      getSenderAddress();
    }
  }, [debounceSender]);

  useEffect(() => {
    if (isReceiverSelected) {
      setIsReceiverSelected(false);
    } else {
      getReiverAddress();
    }
  }, [debounceReceiver]);

  return (
    <main className="xs:pl-0 pl-1 overflow-y-scroll flex-grow w-full flex flex-col gap-5 gdv-parcel pr-1">
      <ParcelBasisInfor
        data={data}
        isDisabled={isDisabled}
        senderInfor={senderInfor}
        receiverInfor={receiverInfor}
        onSenderInfor={onSenderInfor}
        onReceiverInfor={onReceiverInfor}
        senderAddress={senderAddress}
        receiverAddress={receiverAddress}
        onSenderAddressChange={onSenderAddressChange}
        onReceiverAddressChange={onReceiverAddressChange}
        RecommendReceiver={receiverRecommend}
        RecommendSender={senderRecommend}
        onReceiverReccomend={onReceiverReccomend}
        onSenderReccomend={onSenderReccomend}
      ></ParcelBasisInfor>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ParcelGoods {...parcelGoodProps}></ParcelGoods>
        <ParcelWeight
          onChangeCostType={onChangeCostType}
          costType={costType}
          actualWeight={actualWeight}
          covertWeight={covertWeight}
          onActualWeight={onActualWeight}
          onConvertWeight={onConvertWeight}
          data={data}
          isDisabled={isDisabled}
        ></ParcelWeight>
      </section>
      {isModal && (
        <ParcelSave
          isModal={isModal}
          onSave={onSave}
          onChangeModal={onChangeModal}
          onPreview={onChangePreview}
          onCreating={submitHandler}
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
