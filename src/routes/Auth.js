import { AuthForm } from "../components/AuthForm";
import "./Auth.css";

export default function Auth() {
  const onFinish = (values) => {
    console.log("onFinish: ", values);
  };

  return (
    <div className="auth-page-container">
      <AuthForm onFinish={onFinish} />
    </div>
  );
}
