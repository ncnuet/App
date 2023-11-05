"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
type Props = {
  onSuccessNotify: any;
  onErrorNotify: any;
};
function LoginContent({ onSuccessNotify, onErrorNotify }: Props) {
  const router = useRouter();
  const pendingRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isSuccess, setisSuccess] = useState<boolean | null>(null);
  const [isRememberPass, setIsRememberPass] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onPassword = (password: string) => {
    setPassword(password);
  };

  const onUserName = (username: string) => {
    setUserName(username);
  };
  // Move forgot password
  const onForgot = () => {
    router.push("/reset", {
      scroll: false,
    });
  };

  const onFocus = () => {
    if (isError) {
      setIsError(null);
    }
  };

  const onHome = useCallback(() => {
    setIsPending(true); // call API
  }, []);

  useEffect(() => {
    router.prefetch("/reset");
  }, []);
  // call API
  useEffect(() => {
    if (isPending) {
      if (isError) {
        setIsError(null);
      }
      pendingRef.current = setTimeout(() => {
        setIsError(true);
        setIsPending(false);
      }, 2000);
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
      }
    }
  }, [isSuccess]);

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
          onChangeText={onUserName}
          onFocus={onFocus}
          heading="Tên đăng nhập"
          placeholder="username"
          user
          isError={isError || false}
          isSuccess={isSuccess || false}
        ></AuthInput>
        <AuthInput
          onChangeText={onPassword}
          onFocus={onFocus}
          heading="Mật khẩu"
          placeholder="password"
          lock
          isError={isError || false}
          isSuccess={isSuccess || false}
        ></AuthInput>
      </div>
      {isError && (
        <span className=" text-cred-400 text-[11px] font-semibold">
          Tên đăng nhập hoặc mật khẩu không chính xác
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
            setIsRememberPass((prev) => !prev);
          }}
        >
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={(e) => e.stopPropagation()}
            // checked={isRememberPass}
            defaultChecked
          />
          <div className="w-8 h-4 bg-gray-200 rounded peer peer-checked:after:translate-x-[128%] after:content-[''] after:absolute  after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-gray-400 peer-checked:after:bg-[#FDB813] after:rounded after:h-3 after:w-3 after:transition-all peer-checked:bg-[#FDB81380]"></div>
        </label>
        <span className="text-[12px] text-gray-400 font-medium pl-2">
          Ghi nhớ đăng nhập
        </span>
        <strong
          className="text-[12px] text-[#FFA800] ml-auto cursor-pointer font-medium py-1 hover:opacity-70"
          onClick={onForgot}
        >
          Quên mật khẩu
        </strong>
      </div>
      <AuthButton
        title="Đăng nhập"
        onNavigate={onHome}
        isPending={isPending}
      ></AuthButton>
    </main>
  );
}

export default LoginContent;
