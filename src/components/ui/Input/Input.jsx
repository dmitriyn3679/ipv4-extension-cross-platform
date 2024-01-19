import "./Input.scss";
import { useSelector } from "react-redux";
import { emailPattern } from "../../../utils/emailPattern";
import { passwordPattern } from "../../../utils/passwordPattern";
import { selectTranslations } from "../../../features/translation";

export const Input = ({ register = () => {}, type, label, customize = {}, placeholder, errors, name }) => {
  const {
    forms: { invalidEmail, wrongPasswordLength, wrongPasswordChars }
  } = useSelector(selectTranslations);
  
  const getValidation = () => {
    const validations = {
      email: {
        required: {
          value: true,
          message: invalidEmail
        },
        pattern: {
          value: emailPattern,
          message: invalidEmail
        }
      },
      password: {
        required: {
          value: true,
          message: wrongPasswordLength
        },
        pattern: {
          value: passwordPattern,
          message: wrongPasswordChars
        },
        minLength: {
          value: 5,
          message: wrongPasswordLength,
        },
      },
    };
    
    return validations[type] || {};
  };

  return (
    <div className="input" style={customize}>
      <span className="input__label">{label}</span>
      <input
        className="input__field"
        id={type}
        type={type}
        placeholder={placeholder}
        {...register(name || type, getValidation())}
        autoComplete="off"
      />
      {(errors && errors[type]) && (
        <div className="input__hint">{errors[type].message}</div>
      )}
    </div>
  );
}
