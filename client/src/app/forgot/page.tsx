import AuthContainer from "@/components/AuthContainer";
import ForgotContent from "@/layouts/forgot/ForgotContent";
import LoginContent from "@/layouts/login/LoginContent";
const ForgotPage = () => {
  return (
    <AuthContainer left={false}>
      <ForgotContent></ForgotContent>
    </AuthContainer>
  );
};
export default ForgotPage;
