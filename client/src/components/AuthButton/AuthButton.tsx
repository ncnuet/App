"use client";
import { MdMotionPhotosOn } from "react-icons/md";

import { Button, ButtonProps, CustomFlowbiteTheme } from "flowbite-react";
import { memo } from "react";


interface IProps extends ButtonProps {
  title: string;
  isLoading: boolean;
}

const customeTheme: CustomFlowbiteTheme["button"] = {
  color: {
    yellow: "text-black bg-yellow-300 border border-yellow-300 enabled:hover:bg-yellow-200 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600"
  }
}

function AuthButton({ title, isLoading: loading, ...props }: IProps) {
  return (
    <Button
      {...props}
      theme={customeTheme}
      color="yellow"
      size="lg"
      fullSized
      disabled={loading}>

      {loading ? <span className="animate-spin mr-2"><MdMotionPhotosOn /></span> : ""}
      {title}
    </Button >
  );
}

export default memo(AuthButton);
