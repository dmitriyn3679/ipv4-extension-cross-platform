import { useSelector } from "react-redux";
import { selectTranslations } from "../../../features/translation";
import "./TextArea.scss";

export const TextArea = ({ name, cols, rows, placeholder, register, errors }) => {
  const { forms: { invalidMessage } } = useSelector(selectTranslations);
  
  const validation = {
    required: true,
    minLength: {
      value: 10,
      message: invalidMessage,
    },
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
