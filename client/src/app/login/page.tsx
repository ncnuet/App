"use client";
import AuthContainer from "@/components/AuthContainer";
import LoginContent from "@/layouts/login/LoginContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const succesNotify = () => {
    toast.success("Đăng nhập thành công");
  };
  const errorNotify = () => {
    toast.error("Đăng nhập thất bại. Vui lòng thử lại");
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
      <AuthContainer>
        <LoginContent
          onSuccessNotify={succesNotify}
          onErrorNotify={errorNotify}
        ></LoginContent>
      </AuthContainer>
    </>
  );
};
export default LoginPage;
