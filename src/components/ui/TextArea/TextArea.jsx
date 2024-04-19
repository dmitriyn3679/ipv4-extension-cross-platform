import { useSelector } from "react-redux";
import { selectTranslations } from "../../../features/translation";
import { UrlPattern } from "../../../utils/urlPattern";
import "./TextArea.scss";

export const TextArea = ({ name, cols, rows, placeholder, register, errors, checkUrl }) => {
  const { forms: { invalidMessage }, settings: { hasUrl } } = useSelector(selectTranslations);
  
  const isHasUrl = (value) => {
    if (value.match(UrlPattern)?.length) {
      return hasUrl;
    }
  };
  
  const validation = {
    required: true,
    minLength: {
      value: 10,
      message: invalidMessage,
    },
    ...(checkUrl && { validate: isHasUrl }),
  }
  
  return (
    <div>
      <textarea
        className="textarea"
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {(errors && errors[name]) && (
        <div className="input__hint">{errors[name].message}</div>
      )}
    </div>
  );
};
