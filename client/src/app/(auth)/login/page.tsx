"use client";
import { FormEvent, useState } from "react";
import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
import { toast } from 'react-toastify'
import { InputStatus } from "@/components/AuthInput/AuthInput";
import axios from "@/utils/axios";
import { useRouter } from 'next/navigation'
import Link from "next/link";

interface ResponseData {
  name: string;
  message: string;
}

const LoginPage = () => {
  const router = useRouter()
  const [isRememberPass, setIsRememberPass] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<InputStatus>("normal")
  const [errorText, setErrorText] = useState<ResponseData>();

  async function onSubmitHander(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());

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

      <form onSubmit={onSubmitHander}>
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
        <div className={`flex flex-row items-center select-none my-3`}>
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
              defaultChecked
            />
            <div className="w-8 h-4 bg-gray-200 rounded peer peer-checked:after:translate-x-[128%] after:content-[''] after:absolute  after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-gray-400 peer-checked:after:bg-[#FDB813] after:rounded after:h-3 after:w-3 after:transition-all peer-checked:bg-cyellow-300"></div>
          </label>
          <span className="text-[12px] text-gray-400 font-medium pl-2">
            Ghi nhớ đăng nhập
          </span>

          <Link
            href="/reset"
            className="font-semibold text-[12px] text-cyellow-500 ml-auto cursor-pointer py-1 hover:opacity-70">
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
