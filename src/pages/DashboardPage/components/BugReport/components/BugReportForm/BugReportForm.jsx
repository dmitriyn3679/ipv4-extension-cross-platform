import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "../../../../../../components/ui/Input";
import { TextArea } from "../../../../../../components/ui/TextArea";
import { Button } from "../../../../../../components/ui/Button";
import { selectTranslations } from "../../../../../../features/translation";
import { ApiService } from "../../../../../../api/ApiService";
import "./BugReportForm.scss";
import { errorToast, successToast } from "../../../../../../utils/helpers/customToast";
import { useTranslation } from "../../../../../../hooks/useTranslation";

export const BugReportForm = ({ openModalHandler }) => {
  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const {
    bug: { buttonSend, reportSuccessMessage },
    forms: { emailPlaceholder, subjectPlaceholder, textAreaProblemText }
  } = useTranslation();

  const onSubmit = async (formData) => {
    const { email, description, text: problem } = formData;
    
    try {
      // const { status } = await ApiService.sendReport({
      //   email, description, problem
      // });
      //
      // if (status !== 200) {
      //   throw new Error();
      // }
      
      // successToast(reportSuccessMessage)
      openModalHandler();
      reset();
    } catch (e) {
      errorToast("Something went wrong")
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bug-form"
    >
      <div className="bug-form__container">
        <Input
          type="email"
          placeholder={emailPlaceholder}
          errors={errors}
          register={register}
        />
        <Input
          type="text"
          placeholder={subjectPlaceholder}
          register={register}
        />
      </div>
      <div className="bug-form__textarea">
        <TextArea
          name="description"
          register={register}
          placeholder={textAreaProblemText}
          rows={4}
          errors={errors}
        />
      </div>
      <div className="bug-form__button">
        <Button type="submit" kind="main" text={buttonSend} />
      </div>
    </form>
  );
};
