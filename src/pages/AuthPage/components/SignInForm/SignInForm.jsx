import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../../../../components/ui/Button";
import { SingUpHint } from "../../../../components/ui/SingUpHint/SingUpHint";
import { moveToLogin } from "../../../../utils/helpers/authMoveFuncs";
import { useTranslation } from "../../../../hooks/useTranslation";
import { navigateForRegistration } from "../../../../utils/helpers/navigateForRegistration";
import "./SignInForm.scss";

export function SignInForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { auth } = useTranslation();
  const { lang } = useSelector((state) => state.translation);
  
  return (
    <div className="auth-form-container auth-form-container--sign-in">
      <div className="sing-in-form">
        <div className="sing-in-form__title">
          {auth.extensionSignIn}
        </div>
        <p className="sing-in-form__description">
          {auth.extensionSignInDescription}
        </p>
        <div className="sing-in-form__button-container">
          <Button
            kind="main"
            text={auth.extensionSignInButton}
            handler={() => moveToLogin(searchParams, setSearchParams)}
          />
        </div>
        <div className="sing-in-form__hint">
          <SingUpHint />
          &nbsp;
          <Link
            className="sing-in-form__registration-link"
            to="/"
            onClick={() => navigateForRegistration(lang)}
            // to={{ search: `?type=${authTypes.registration}` }}
          >
            {auth.signUp}
          </Link>
        </div>
      </div>
    </div>
  );
}
