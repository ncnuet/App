"use client";
import AuthContainer from "@/components/AuthContainer";
import LoginContent from "@/layouts/login/LoginContent";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  return (
    <>

      <AuthContainer>
        <LoginContent />
      </AuthContainer>
    </>
  );
};
export default LoginPage;
