import React from "react";

type Props = {
  isAccepted?: boolean;
  isDelivering?: boolean;
  isReceived?: boolean;
};

const GdvStatus = ({
  isAccepted = false,
  isDelivering = false,
  isReceived = false,
}: Props) => {
  return (
    <button
      className={
        `outline-none h-[26px] px-[10px] py-1 flex flex-row items-center flex-none ` +
        `${
          isAccepted
            ? "bg-cgreen-600"
            : isDelivering
            ? "bg-cyellow-500"
            : "bg-cblue-300"
        } rounded-full text-sm font-bold text-white hover:cursor-default`
      }
    >
      {isAccepted
        ? "Chấp nhận gửi"
        : isDelivering
        ? "Đang vận chuyển"
        : "Đã giao hàng"}
    </button>
  );
};

export default GdvStatus;
