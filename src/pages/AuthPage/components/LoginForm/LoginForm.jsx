import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Input } from "../../../../components/ui/Input";
import { Checkbox } from "../../../../components/ui/Checkbox";
import { Button } from "../../../../components/ui/Button";
import { SingUpHint } from "../../../../components/ui/SingUpHint/SingUpHint";
import { ApiService } from "../../../../api/ApiService";
import { setIsAuthUser } from "../../../../features/auth";
import { errorToast } from "../../../../utils/helpers/customToast";
import { useTranslation } from "../../../../hooks/useTranslation";
import { navigateForRegistration } from "../../../../utils/helpers/navigateForRegistration";
import { CfCaptcha } from "../../../../components/common/CfCaptcha/CfCaptcha";
import "./LoginForm.scss";

export function LoginForm() {
  const { lang } = useSelector((state) => state.translation);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications, forms, auth } = useTranslation();
  
  const cfCaptchaRef = useRef();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (formData) => {
    const { email: username, password, remember: rememberMe } = formData;
  
    let token = "";
  
    if (cfCaptchaRef?.current) {
      token = await cfCaptchaRef.current?.getResponsePromise();
    }
    
    try {
      const { status } = await ApiService.login({
        username,
        password,
        rememberMe,
        captchaToken: token
      });

      if (status !== 200) {
        throw notifications.loginError
      }

      dispatch(setIsAuthUser({
        isAuth: true,
        isLoaded: true
      }));
      
      localStorage.setItem("client_info", username);

      navigate("/");
    } catch (e) {
      errorToast(e)
    }
  };

  return (
    <div className="auth-form-container auth-form-container--login">
      <div className="login">
        <div className="login__title">
          {auth.authorization}
        </div>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            register={register}
            label={forms.emailLabel}
            customize={{ marginBottom: 16 }}
            placeholder={forms.emailPlaceholder}
            errors={errors}
          />
          <Input
            type="password"
            register={register}
            label={forms.passwordLabel}
            customize={{ marginBottom: 20 }}
            placeholder={forms.passwordPlaceholder}
            errors={errors}
          />
          <div className="login__form-options">
            <Checkbox
              name="remember"
              register={register}
              label={forms.rememberLabel}
            />
            <Link
              className="login__recovery-link"
              to={{ search: "?type=recovery" }}
            >
              {forms.forgotPass}
            </Link>
          </div>
          <CfCaptcha ref={cfCaptchaRef} setCfToken={() => {}} />
          <Button
            type="submit"
            kind="main"
            text={auth.signIn}
            customize={{ marginBottom: 16 }}
          />
          <SingUpHint
            customize={{ textAlign: "center", marginBottom: 12 }}
          />
          <Button
            kind="secondary"
            text={auth.signUp}
            // handler={() => moveToRegister(searchParams, setSearchParams)}
            handler={() => navigateForRegistration(lang)}
          />
        </form>
      </div>
    </div>
  );
}
