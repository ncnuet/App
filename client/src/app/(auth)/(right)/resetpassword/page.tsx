"use client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import { InputStatus } from "@/components/AuthInput/AuthInput";
import axios, { ResponseData } from "@/utils/axios";

const ForgotPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const user = searchParams.get('user');
  const ttl = Number(searchParams.get('ttl') || "0");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<InputStatus>("normal");
  const [errorText, setErrorText] = useState<ResponseData>();
  const [timer, setTimer] = useState<number>(ttl);

  useEffect(() => {
    const interval = setInterval(() => setTimer(timer => timer - 1), 1000)
    console.log(interval);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (timer <= 0) { router.replace("/") }
  }, [timer])

  async function submitHander(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());

      const res = await axios.put("/auth/reset", body);

      console.log(body, res.data);
      if (res.status !== 200) {
        setStatus("failure");
        setErrorText(res.data);
        toast.error("Không thể cập nhật nhật mật khẩu");
      } else {
        toast.success("Đã đổi mật khẩu thành công");
        router.push('/login')
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server!")
    } finally {
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col mb-[30px]">
        <span className="text-2xl text-cyellow-500 font-bold pb-[2px] ">
          Khôi phục mật khẩu
        </span>
        <span className="text-[12px] text-cgray-400 font-regular ">
          {`Gần xong rồi, `}
          <span className="font-semibold">{user ? user + "," : ""}</span>
          {` hãy hoàn tất quá trình này trong `}
          <span className="text-cred-400 font-bold">{timer}s</span>
        </span>
      </div>

      <form onSubmit={submitHander}>
        <div className="flex flex-col gap-4">
          <AuthInput
            type="password"
            name="password"
            title="Mật khẩu mới"
            placeholder="password"
            status={status}
            error_text={errorText}
          />
          <AuthInput
            type="password"
            name="re_password"
            title="Nhập lại mật khẩu"
            placeholder="password"
            status={status}
            error_text={errorText}
          />
        </div>

        <div className={`flex flex-row items-center select-none mt-3 mb-7`}>
          <Link
            href="/login"
            className="text-[12px] text-cyellow-600 ml-auto cursor-pointer font-medium py-1">
            Vừa nhớ ra mật khẩu, đăng nhập
          </Link>
        </div>

        <AuthButton
          type="submit"
          title="Xác nhận thay đổi"
          isLoading={loading}
        />
      </form>
    </>

  );
};

export default ForgotPage;