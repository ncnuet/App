"use client";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify'
import { InputStatus } from "@/components/AuthInput/AuthInput";
import { useRouter } from 'next/navigation'
import axios from "@/utils/axios";
import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
import Link from "next/link";
import AuthSwitch from "@/components/AuthSwitch";

interface ResponseData {
  name: string;
  message: string;
}

const LoginPage = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<InputStatus>("normal")
  const [errorText, setErrorText] = useState<ResponseData>();

  async function submitHander(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());
      body.remember = !!body.remember as unknown as FormDataEntryValue;

      const res = await axios.post("/auth/login", body);

      console.log(body, res.data);
      if (res.status !== 200) {
        setStatus("failure");
        setErrorText(res.data);
        toast.error("Đăng nhập thất bại");
      } else {
        toast.success("Đăng nhập thành công");
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col mb-[30px]">
        <span className="text-2xl text-[#FFA800] font-bold pb-[2px]">
          Chào mừng trở lại
        </span>
        <span className="text-[12px] text-[#838383] font-regular ">
          Đăng nhập vào hệ thống quản lý chuyển phát MagicPost
        </span>
      </div>

      <form onSubmit={submitHander}>
        <div className="flex flex-col gap-4">
          <AuthInput
            name="username"
            status={status}
            title="Tên đăng nhập"
            placeholder="username"
            error_text={errorText}
          />

          <AuthInput
            name="password"
            status={status}
            type="password"
            title="Mật khẩu"
            placeholder="password"
            error_text={errorText}
          />
        </div>


        {/* forgot password */}
        <div className={`flex flex-row items-center select-none mt-3 mb-7`}>
          <AuthSwitch name="remember" />

          <Link
            href="/reset"
            className="font-semibold text-[12px] text-cyellow-600 ml-auto cursor-pointer py-1 hover:opacity-70 truncate">
            Quên mật khẩu
          </Link>
        </div>

        {/* Submit button */}
        <AuthButton
          title="Đăng nhập"
          isLoading={isLoading}
          type="submit"
        />
      </form>
    </>
  );
};
export default LoginPage;
