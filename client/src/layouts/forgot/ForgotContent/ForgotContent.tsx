"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
type Props = {
  onSuccessNotify: any;
  onErrorNotify: any;
};
function ForgotContent({ onSuccessNotify, onErrorNotify }: Props) {
  const router = useRouter();
  const pendingRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [userName, setUserName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const onUserName = (username: string) => {
    setUserName(username);
  };

  const onForgot = () => {
    router.push("/login", {
      scroll: false,
    });
  };
  const onFocus = () => {
    if (isError) {
      setIsError(null);
    }
  };
  const onResetPassword = useCallback(() => {
    setIsPending(true); // call API
  }, []);

  useEffect(() => {
    router.prefetch("resetpassword");
  }, []);

  // call API
  useEffect(() => {
    if (isPending) {
      if (isError) {
        setIsError(null);
      }
      pendingRef.current = setTimeout(() => {
        setIsSuccess(true);
        setIsPending(false);
      }, 1000);
    }
    return () => clearTimeout(pendingRef.current as NodeJS.Timeout);
  }, [isPending]);

  useEffect(() => {
    if (isError !== null) {
      if (isError) {
        onErrorNotify();
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess) {
        onSuccessNotify();
        pendingRef.current = setTimeout(() => {
          router.push("/resetpassword", { scroll: false });
        }, 3500);
      }
    }
    return () => clearTimeout(pendingRef.current as NodeJS.Timeout);
  }, [isSuccess]);

  return (
    <main>
      <div className="flex flex-col mb-[30px]">
        <span className="text-2xl text-[#FFA800] font-bold pb-[2px] ">
          Khôi phục mật khẩu
        </span>
        <span className="text-[12px] text-[#838383] font-regular ">
          Đừng lo, chúng tôi sẽ giúp bạn lấy lại mật khẩu nhanh thôi
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <AuthInput
          onChangeText={onUserName}
          onFocus={onFocus}
          heading="Tên đăng nhập"
          placeholder="username"
          user
          isError={isError || false}
          isSuccess={isSuccess || false}
        ></AuthInput>
      </div>
      {/* {isError && (
        <span className=" text-error text-[11px] font-semibold">
          Tên đăng nhập hoặc Mật khẩu không chính xác
        </span>
      )} */}
      <div
        className={`flex flex-row items-center select-none mb-7 ${
          isError ? "pt-1" : "pt-1"
        }`}
      >
        <strong
          className="text-[12px] text-[#FFA800] ml-auto cursor-pointer font-medium py-1"
          onClick={onForgot}
        >
          Vừa nhớ ra mật khẩu, đăng nhập
        </strong>
      </div>

      <AuthButton
        title="Gửi mã đăng nhập"
        onNavigate={onResetPassword}
        isPending={isPending}
      ></AuthButton>
    </main>
  );
}

export default ForgotContent;
