import { useLocation } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import "./Auth.css";

export default function Auth() {
  const { pathname } = useLocation();

  const onFinish = (values) => {
    console.log("onFinish: ", values);
  };

  return (
    <div className="auth-page-container">
      <AuthForm onFinish={onFinish} isSignUp={pathname === "/signup"} />
    </div>
  );
}
