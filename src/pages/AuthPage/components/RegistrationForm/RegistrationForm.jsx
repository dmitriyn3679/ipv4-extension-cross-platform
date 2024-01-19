import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { SingUpHint } from "../../../../components/ui/SingUpHint/SingUpHint";
import { moveToLogin } from "../../../../utils/helpers/authMoveFuncs";
import { useTranslation } from "../../../../hooks/useTranslation";
import "./RegistrationForm.scss";

export function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { auth, forms } = useTranslation();

  const onSubmit = () => {

  };

  return (
    <div className="auth-form-container auth-form-container--registration">
      <div className="registration">
        <div className="registration__title">
          {auth.registration}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder={forms.emailPlaceholder}
            label={forms.emailLabel}
            customize={{ marginBottom: 16 }}
            register={register}
            errors={errors}
          />
          <Input
            type="password"
            placeholder={forms.passwordPlaceholder}
            label={forms.passwordLabel}
            customize={{ marginBottom: 36 }}
            register={register}
            errors={errors}
          />
          <Button
            type="submit"
            kind="main"
            customize={{ marginBottom: 56 }}
            text={auth.createAcc}
          />
          <SingUpHint customize={{ textAlign: "center", marginBottom: 12 }} />
          <Button
            kind="secondary"
            text={auth.signIn}
            handler={() => moveToLogin(searchParams, setSearchParams)}
          />
        </form>
      </div>
    </div>
  );
}
