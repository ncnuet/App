"use client";
import { memo } from "react";

type Props = {
  title: string;
  isPending: boolean;
  onNavigate: any;
};

function AuthButton({ title, onNavigate, isPending }: Props) {
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
        <span className="material-symbols-outlined mr-2 animate-spin">
          progress_activity
        </span>
      )}
      {title}
    </button>
  );
}

export default memo(AuthButton);
