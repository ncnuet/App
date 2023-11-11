"use client";
import AuthContainer from "@/components/AuthContainer";
import ForgotContent from "@/layouts/forgot/ForgotContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPage = () => {
  const succesNotify = () => {
    toast.success("Gửi email reset password thành công tới fake***@gmail.com");
  };
  const errorNotify = () => {
    toast.error("Tên đăng nhập không tồn tại. Vui lòng thử lại");
  };

  return (
    <>
      <ToastContainer
        limit={1}
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        className={"text-[14px]"}
      />
      <AuthContainer left={false}>
        <ForgotContent
          onErrorNotify={errorNotify}
          onSuccessNotify={succesNotify}
        ></ForgotContent>
      </AuthContainer>
    </>
  );
};
export default ForgotPage;