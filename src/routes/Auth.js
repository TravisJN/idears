import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import "./Auth.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export default function Auth() {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const isSignUp = pathname === "/signup";

  const onFinish = (values) => {
    const { email, password } = values;
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Account created
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`A ${errorCode} error has occurred: ${errorMessage}`);
          setErrorMessage(
            "An error occurred while creating your account. Please try again."
          );
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`A ${errorCode} error has occurred: ${errorMessage}`);
          setErrorMessage(
            "An error occurred while signing you in. Please try again."
          );
        });
      // log in
    }
  };

  return (
    <div className="auth-page-container">
      <AuthForm
        onFinish={onFinish}
        isSignUp={isSignUp}
        errorMessage={errorMessage}
      />
    </div>
  );
}
