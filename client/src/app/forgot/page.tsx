import AuthContainer from "@/components/AuthContainer";
import ForgotContent from "@/components/pagecoms/forgot/ForgotContent";

const ForgotPage = () => {
  return (
    <AuthContainer left={false}>
      <ForgotContent></ForgotContent>
    </AuthContainer>
  );
};
export default ForgotPage;
