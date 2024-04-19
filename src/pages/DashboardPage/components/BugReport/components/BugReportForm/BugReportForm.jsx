import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "../../../../../../components/ui/Input";
import { TextArea } from "../../../../../../components/ui/TextArea";
import { Button } from "../../../../../../components/ui/Button";
import { ApiService } from "../../../../../../api/ApiService";
import { errorToast } from "../../../../../../utils/helpers/customToast";
import { useTranslation } from "../../../../../../hooks/useTranslation";
import "./BugReportForm.scss";

export const BugReportForm = ({ openModalHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const {
    bug: { buttonSend, reportSuccessMessage },
    forms: { emailPlaceholder, subjectPlaceholder, textAreaProblemText }
  } = useTranslation();

  const onSubmit = async (formData) => {
    const { email, description, text: problem } = formData;
    
    setIsLoading(true);
    try {
      const { status } = await ApiService.sendReport({
        email, description, problem
      });

      if (status !== 200) {
        throw new Error();
      }
      
      // successToast(reportSuccessMessage)
      openModalHandler();
      reset();
    } catch (e) {
      errorToast("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bug-form"
      noValidate={true}
    >
      <div className="bug-form__container">
        <Input
          type="email"
          placeholder={emailPlaceholder}
          errors={errors}
          register={register}
          checkUrl={true}
        />
        <Input
          type="text"
          placeholder={subjectPlaceholder}
          errors={errors}
          register={register}
          checkUrl={true}
        />
      </div>
      <div className="bug-form__textarea">
        <TextArea
          name="description"
          register={register}
          placeholder={textAreaProblemText}
          rows={4}
          errors={errors}
          checkUrl={true}
        />
      </div>
      <div className="bug-form__button">
        <Button
          type="submit"
          kind="main"
          text={buttonSend}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};
