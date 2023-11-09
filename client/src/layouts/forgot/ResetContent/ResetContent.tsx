"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
type Props = {
  onSuccessNotify: any;
  onErrorNotify: any;
};
function ResetContent({ onSuccessNotify, onErrorNotify }: Props) {
  const router = useRouter();
  const pendingRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const onPassword = (password: string) => {
    setPassword(password);
  };

  const onConfirmPassword = (confirmPass: string) => {
    setConfirmPassword(confirmPass);
  };

  const onLogin = () => {
    router.push("/login", {
      scroll: false,
    });
  };

  const onFocus = () => {
    if (isError) {
      setIsError(null);
    }
  };

  const onValidatePassword = useCallback(() => {
    setIsPending(true); // call API
  }, []);

  useEffect(() => {
    console.log({ password, confirmPassword });
  }, [password, confirmPassword]);

  // call API
  useEffect(() => {
    if (isPending) {
      if (isError) {
        setIsError(null);
      }
      pendingRef.current = setTimeout(() => {
        // setIsError(true);
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
          onLogin();
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
          onChangeText={onPassword}
          heading="Mật khẩu mới"
          placeholder="password"
          lock
          isError={isError || false}
          isSuccess={isSuccess || false}
          onFocus={onFocus}
        ></AuthInput>
        <AuthInput
          onChangeText={onConfirmPassword}
          heading="Nhập lại mật khẩu"
          placeholder="password"
          lock
          isError={isError || false}
          isSuccess={isSuccess || false}
          onFocus={onFocus}
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
          onClick={onLogin}
        >
          Vừa nhớ ra mật khẩu, đăng nhập
        </strong>
      </div>

      <AuthButton
        title="Xác nhận thay đổi"
        onNavigate={onValidatePassword}
        isPending={isPending}
      ></AuthButton>
    </main>
  );
}

export default ResetContent;
