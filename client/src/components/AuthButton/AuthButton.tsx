"use client";
import { memo } from "react";
import Spinner from "@/icons/Spinner";

type Props = {
  title: string;
  isPending: boolean;
  onNavigate: any;
};

function AuthButton({ title, onNavigate, isPending }: Props) {
  console.log("hello");
  const handleClick = () => {
    onNavigate();
  };
  return (
    <button
      className={`w-full outline-none px-auto py-3 bg-[#FDB813] rounded font-semibold text-black flex items-center justify-center ${
        isPending
          ? "opacity-60 cursor-default"
          : "hover:opacity-80 active:opacity-90"
      } `}
      onClick={handleClick}
    >
      {isPending && (
        <Spinner
          width="24"
          height="24"
          className={"mr-2 animate-spin"}
        ></Spinner>
      )}
      {title}
    </button>
  );
}

export default memo(AuthButton);
