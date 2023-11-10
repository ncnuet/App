import Logo from "@/icons/Logo";
import React from "react";
import { MdSos } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io"

type Props = {
  children: React.ReactNode
};

const FormWrapper = ({ children }: Props) => {
  return (
    <div className="h-full flex flex-col select-none">
      <header className="flex flex-col mb-[44px]">
        <div className="flex flex-row items-center">
          <Logo width="60" height="30" className={"text-cyellow-500"} />
          <h2 className="text-[16px] text-cgray-600 ml-2 font-[700]">
            Hệ thống quản lý chuyển phát
          </h2>
        </div>
      </header>

      {children}

      <footer className="mt-auto mb-4 flex flex-row items-center gap-4 justify-center text-[12px] text-gray-400 font-medium select-none flex-wrap gap-y-1">
        <span className="hover:cursor-pointer hover:opacity-60 active:opacity-80">
          @devbygroup6
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer hover:opacity-60 active:opacity-80">
          <span className="text-lg"><IoLogoGithub></IoLogoGithub></span>
          <span className="ml-1">github</span>
        </span>

        <span className="hover:cursor-pointer hover:opacity-60 active:opacity-80 flex items-center">
          <span className="text-2xl"><MdSos></MdSos></span>
          <span className="ml-1">Liên hệ kỹ thuật</span>
        </span>
      </footer>
    </div>
  );
};

export default FormWrapper;
