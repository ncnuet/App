"use client";
import ForgotContent from "@/layouts/forgot/ForgotContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPage = () => {
  const succesNotify = () => {
    toast.success("Gửi email reset password thành công tới fake***@gmail.com");
  };
  const errorNotify = () => {
    toast.error("Tên đăng nhập không tồn tại. Vui lòng thử lại");
  };

  return (
    <ForgotContent
      onErrorNotify={errorNotify}
      onSuccessNotify={succesNotify}
    ></ForgotContent>
  );
};
export default ForgotPage;
