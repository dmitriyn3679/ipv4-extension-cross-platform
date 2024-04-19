import { useState } from "react";
import { useSelector } from "react-redux";
import { emailPattern } from "../../../utils/emailPattern";
import { passwordPattern } from "../../../utils/passwordPattern";
import { selectTranslations } from "../../../features/translation";
import { IconSvg } from "../../../utils/iconSvg";
import { UrlPattern } from "../../../utils/urlPattern";
import "./Input.scss";

export const Input = ({ register = () => {}, type, label, customize = {}, placeholder, errors, name, checkUrl }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const {
    forms: { invalidEmail, wrongPasswordLength, wrongPasswordChars },
    settings: { hasUrl }
  } = useSelector(selectTranslations);
  
  const isHasUrl = (value) => {
    if (value.match(emailPattern)?.length) {
      return;
    }
    
    if (value.match(UrlPattern)?.length) {
      return hasUrl;
    }
  };

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
        },
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
        {...register(name
          || type, { ...(checkUrl && { validate: isHasUrl }), ...getValidation() })}
        autoComplete="off"
      />
      {(errors && errors[type]?.message) && (
        <div className="input__hint">{errors[type]?.message}</div>
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
