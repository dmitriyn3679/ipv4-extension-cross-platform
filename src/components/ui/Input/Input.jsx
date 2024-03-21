import { useState } from "react";
import { useSelector } from "react-redux";
import { emailPattern } from "../../../utils/emailPattern";
import { passwordPattern } from "../../../utils/passwordPattern";
import { selectTranslations } from "../../../features/translation";
import "./Input.scss";
import { IconSvg } from "../../../utils/iconSvg";

export const Input = ({ register = () => {}, type, label, customize = {}, placeholder, errors, name }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
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
  
  const showPasswordHandler = () => {
    setIsPasswordVisible((current) => !current);
  };
  
  const getType = () => {
    if (type !== "password") {
      return type;
    }
    
    if (isPasswordVisible) {
      return "text";
    }
    
    return type;
  };

  return (
    <div className="input" style={customize}>
      <span className="input__label">{label}</span>
      <input
        className="input__field"
        id={type}
        type={getType()}
        placeholder={placeholder}
        {...register(name || type, getValidation())}
        autoComplete="off"
      />
      {(errors && errors[type]) && (
        <div className="input__hint">{errors[type].message}</div>
      )}
      {type === "password" && (
        <div className="input__input-icon" onClick={showPasswordHandler}>
          {isPasswordVisible ? (
            <IconSvg tag="hiddenPas" />
          ) : (
            <IconSvg tag="showPas" />
          )}
        </div>
      )}
    </div>
  );
}
