"use client";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
import { useRouter } from "next/navigation";

function ForgotContent() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const onForgot = () => {
    router.push("/login", {
      scroll: false,
    });
  };
  return (
    <main>
      <div className="flex flex-col mb-[30px]">
        <span className="text-[20px] text-[#FFA800] font-bold pb-[2px] ">
          Khôi phục mật khẩu
        </span>
        <span className="text-[12px] text-[#838383] font-regular ">
          Đừng lo, chúng tôi sẽ giúp bạn lấy lại mật khẩu nhanh thôi
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <AuthInput
          heading="Tên đăng nhập"
          placeholder="username"
          user
          isError={isError}
          isSuccess={isSuccess}
        ></AuthInput>
      </div>
      {isError && (
        <span className=" text-error text-[11px] font-semibold">
          Tên đăng nhập hoặc Mật khẩu không chính xác
        </span>
      )}
      <div
        className={`flex flex-row items-center select-none mb-7 ${
          isError ? "pt-0" : "pt-3"
        }`}
      >
        <strong
          className="text-[12px] text-[#FFA800] ml-auto cursor-pointer font-medium py-1"
          onClick={onForgot}
        >
          Vừa nhớ ra mật khẩu, đăng nhập
        </strong>
      </div>

      <AuthButton title="Gửi mã đăng nhập"></AuthButton>
    </main>
  );
}

export default ForgotContent;
