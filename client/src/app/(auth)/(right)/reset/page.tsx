"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { InputStatus } from "@/components/AuthInput/AuthInput";
import axios from "@/utils/axios";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

interface ResponseData {
  name: string;
  message: string;
}

const ForgotPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<InputStatus>("normal")
  const [errorText, setErrorText] = useState<ResponseData>();

  async function submitHander(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());

      const res = await axios.post("/auth/reset", body);

      console.log(body, res.data);
      if (res.status !== 200) {
        setStatus("failure");
        setErrorText(res.data);
        toast.error("Không tồn tại tài khoản");
      } else {
        toast.success("Đã gủi thành công link đổi mật khẩu đển");
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
      {/* Heading */}
      <div className="flex flex-col mb-[30px]">
        <span className="text-2xl text-[#FFA800] font-bold pb-[2px] ">
          Khôi phục mật khẩu
        </span>
        <span className="text-[12px] text-[#838383] font-regular ">
          Đừng lo, chúng tôi sẽ giúp bạn lấy lại mật khẩu nhanh thôi
        </span>
      </div>

      <form onSubmit={submitHander}>
        <div className="flex flex-col gap-4">
          <AuthInput
            title="Tên đăng nhập"
            placeholder="username"
            name="username"
            status={status}
            error_text={errorText}
          />
        </div>

        <div
          className={`flex flex-row items-center select-none mt-3 mb-7`}>
          <Link
            href="/login"
            className="text-[12px] text-cyellow-600 ml-auto cursor-pointer font-medium py-1">
            Vừa nhớ ra mật khẩu, đăng nhập
          </Link>
        </div>

        {/* Submit button */}
        <AuthButton
          type="submit"
          title="Gửi mã đăng nhập"
          isLoading={loading}
        />
      </form >
    </>

  );
};

export default ForgotPage;
