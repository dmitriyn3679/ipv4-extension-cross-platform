import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { SingUpHint } from "../../../../components/ui/SingUpHint/SingUpHint";
import { moveToRegister } from "../../../../utils/helpers/authMoveFuncs";
import { ApiService } from "../../../../api/ApiService";
import { errorToast, successToast } from "../../../../utils/helpers/customToast";
import { useTranslation } from "../../../../hooks/useTranslation";
import "./RecoveryForm.scss";

export function RecoveryForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { notifications, auth, forms } = useTranslation();

  const onSubmit = async (formData) => {
    const { email } = formData;
    
    try {
      const { data, status } = await ApiService.recoveryPassword({ email })
      if (status !== 200) {
        throw new Error();
      }
      
      successToast(notifications.checkEmail);
    } catch (e) {
      errorToast(notifications.error)
    }
  };

  return (
    <div className="auth-form-container auth-form-container--recovery">
      <div className="recovery">
        <div className="recovery__title">{auth.recovery}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label={forms.emailLabel}
            placeholder={forms.emailPlaceholder}
            register={register}
            customize={{ marginBottom: 16 }}
            errors={errors}
          />
          <p className="recovery__info">
            {auth.recoveryInfo}
          </p>
          <Button
            type="submit"
            kind="main"
            text={auth.restore}
            customize={{ marginBottom: 78 }}
          />
          <SingUpHint customize={{ marginBottom: 12, textAlign: "center" }} />
          <Button
            kind="secondary"
            text={auth.signUp}
            handler={() => moveToRegister(searchParams, setSearchParams)}
          />
        </form>
      </div>
    </div>
  );
}
