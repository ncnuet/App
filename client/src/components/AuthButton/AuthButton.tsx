"use client";
import { ButtonProps } from "flowbite-react";
import { memo } from "react";

interface IProps extends ButtonProps {
  title: string;
  isLoading: boolean;
}

function AuthButton({ title, onClick, isLoading }: IProps) {
  return (
    <button
      onClick={onClick}
      className={"w-full outline-none px-auto py-3 bg-cyellow-500 rounded font-semibold text-black " +
        "flex items-center justify-center " +
        (isLoading
          ? "opacity-60 cursor-default"
          : "hover:opacity-80 active:opacity-90"
        )}>
      {isLoading && (
        <span className="material-symbols-outlined mr-2 animate-spin">
          progress_activity
        </span>
      )}
      {title}
    </button >
  );
}

export default memo(AuthButton);
