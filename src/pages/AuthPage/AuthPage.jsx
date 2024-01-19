import { useSearchParams } from "react-router-dom";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { RecoveryForm } from "./components/RecoveryForm/RecoveryForm";
import "./AuthPage.scss";

export function AuthPage({ setIsAuth }) {
  const [searchParams] = useSearchParams();
  const authType = searchParams.get("type");

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        { !authType && <SignInForm /> }
        { authType === "login" && <LoginForm /> }
        { authType === "registration" && <RegistrationForm /> }
        { authType === "recovery" && <RecoveryForm /> }
      </div>
    </section>
  );
}
