"use client";
import ResetContent from "@/layouts/forgot/ResetContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPage = () => {
  const succesNotify = () => {
    toast.success(
      "Thay đổi mật khẩu thành công, chuyển hướng về trang đăng nhập"
    );
  };
  const errorNotify = () => {
    toast.error("Mật khẩu không hợp lệ. Vui lòng thử lại");
  };
  return (
    <ResetContent
      onErrorNotify={errorNotify}
      onSuccessNotify={succesNotify}
    ></ResetContent>
  );
};
export default ForgotPage;
