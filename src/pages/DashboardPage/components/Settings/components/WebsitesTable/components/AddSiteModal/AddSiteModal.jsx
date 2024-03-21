import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "../../../../../../../../components/ui/Input";
import { Button } from "../../../../../../../../components/ui/Button";
import "./AddSiteModal.scss";
import { errorToast } from "../../../../../../../../utils/helpers/customToast";
import { ApiService } from "../../../../../../../../api/ApiService";
import { addWebsite } from "../../../../../../../../features/content";
import { useTranslation } from "../../../../../../../../hooks/useTranslation";

export const AddSiteModal = ({ setModalIsOpen }) => {
  const { settings: { addSite } } = useTranslation();
  
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  });
  const dispatch = useDispatch();
  const handleClose = ({ target }) => {
    if (target.classList.contains("add-site-modal")) {
      setModalIsOpen(false);
    }
  };
  
  const onSubmit = async (formData) => {
    const { site } = formData;
    
    if (!site.replaceAll(' ', '').length) {
      setModalIsOpen(false);
      return;
    }
    
    try {
      const { data, status } = await ApiService.addWebsite({ site });
      
      if (status !== 200) {
        throw new Error();
      }
      dispatch(addWebsite(data))
      setModalIsOpen(false);
    } catch (e) {
      errorToast("Something went wrong")
    }
  };
  
  return (
    <div className="add-site-modal" onClick={handleClose}>
      <div className="add-site-modal__content">
        <div className="add-site-modal__title">{addSite}</div>
        <form className="add-site-modal__container" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="site"
            type="text"
            placeholder="Enter URL"
            customize={{ marginBottom: 16 }}
            register={register}
          />
          <Button type="submit" kind="main" text="Add site" />
        </form>
      </div>
    </div>
  );
};
