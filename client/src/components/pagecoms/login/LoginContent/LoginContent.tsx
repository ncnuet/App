"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
function LoginContent() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isRememberPass, setIsRememberPass] = useState(false);
  const onForgot = () => {
    router.push("/forgot", {
      scroll: false,
    });
  };
  return (
    <main>
      <div className="flex flex-col mb-[30px]">
        <span className="text-[20px] text-[#FFA800] font-bold pb-[2px]">
          Chào mừng trở lại
        </span>
        <span className="text-[12px] text-[#838383] font-regular ">
          Đăng nhập vào hệ thống quản lý chuyển phát MagicPost
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <AuthInput
          heading="Tên đăng nhập"
          placeholder="username"
          user
          isError={isError}
        ></AuthInput>
        <AuthInput
          heading="Mật khẩu"
          placeholder="password"
          lock
          isError={isError}
        ></AuthInput>
      </div>
      {isError && (
        <span className=" text-error text-[11px] font-semibold">
          Tên đăng nhập hoặc Mật khẩu không chính xác
        </span>
      )}
      {/* forgot password */}
      <div
        className={`flex flex-row items-center select-none mb-7 ${
          isError ? "pt-0" : "pt-3"
        }`}
      >
        <label
          className="relative inline-flex items-center cursor-pointer"
          onClick={() => {
            setIsError(!isError);
            setIsRememberPass((prev) => !prev);
          }}
        >
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={(e) => e.stopPropagation()}
            checked={isRememberPass}
          />
          <div className="w-8 h-4 bg-gray-200 rounded peer peer-checked:after:translate-x-[120%] after:content-[''] after:absolute  after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-gray-400 peer-checked:after:bg-[#FDB813] after:rounded after:h-3 after:w-3 after:transition-all peer-checked:bg-[#FDB81380]"></div>
        </label>
        <span className="text-[12px] text-gray-400 font-medium pl-2">
          Ghi nhớ đăng nhập
        </span>
        <strong
          className="text-[12px] text-[#FFA800] ml-auto cursor-pointer font-medium py-1"
          onClick={onForgot}
        >
          Quên mật khẩu
        </strong>
      </div>
      <AuthButton title="Đăng nhập"></AuthButton>
    </main>
  );
}

export default LoginContent;
