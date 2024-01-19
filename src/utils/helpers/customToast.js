import { toast } from "react-toastify";

let enableErrorToast = true;
let enableWarningToast = true;
let enableSuccessToast = true;

export const errorToast = (body, lang = "en") => {
  if (enableErrorToast) {
    enableErrorToast = false;

    setTimeout(() => {
      enableErrorToast = true
    }, 1500);
  
    return toast(
      <div className="custom-toast__box">
        <div className="custom-toast__head">
          <svg width="26" height="22" viewBox="0 0 26 22">
            <path
              d="M13 15.875C12.3438 15.875 11.875 16.3906 11.875 17C11.875 17.6562 12.3906 18.125 13 18.125C13.6094 18.125 14.0781 17.6562 14.0781 17C14.125 16.3906 13.6094 15.875 13 15.875ZM13 14C13.375 14 13.7031 13.6719 13.7031 13.25V6.5C13.7031 6.125 13.3281 5.75 13 5.75C12.625 5.75 12.25 6.125 12.25 6.5V13.25C12.25 13.6719 12.5781 14 13 14ZM24.625 17.6562L15.25 1.8125C14.7812 1.01562 13.9375 0.546875 13 0.5C12.0156 0.5 11.1719 1.01562 10.7031 1.8125L1.32812 17.6562C0.859375 18.4531 0.859375 19.3906 1.32812 20.1875C1.79688 21.0312 2.64062 21.5 3.625 21.5H22.375C23.3125 21.5 24.1562 21.0312 24.625 20.1875C25.0938 19.3906 25.0938 18.4531 24.625 17.6562ZM23.3125 19.4375C23.125 19.8125 22.75 20 22.3281 20H3.625C3.20312 20 2.82812 19.8125 2.64062 19.4375C2.40625 19.1094 2.45312 18.7344 2.64062 18.4062L12.0156 2.5625C12.2031 2.23438 12.5781 2 13 2C12.9531 2 13 2 13 2C13.375 2.04688 13.75 2.23438 13.9375 2.5625L23.3125 18.4062C23.5 18.7344 23.5469 19.1094 23.3125 19.4375Z"
              fill="#CF3D4B"
            />
          </svg>
          {lang === "ru" ? "Ошибка" : "Error"}
        </div>
        <div className="custom-toast__body">{body}</div>
      </div>
    );
  }
};
export const warningToast = (body, lang = "en") => {
  if (enableWarningToast) {
    enableWarningToast = false;
  
    setTimeout(() => {
      enableWarningToast = true
    }, 1500);
    
    return toast(
      <div className="custom-toast__box">
        <div className="custom-toast__head">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 0C5.34375 0 0 5.39062 0 12C0 18.6562 5.34375 24 12 24C18.6094 24 24 18.6562 24 12C24 5.39062 18.6094 0 12 0ZM12 22.5C6.1875 22.5 1.5 17.8125 1.5 12C1.5 6.23438 6.1875 1.5 12 1.5C17.7656 1.5 22.5 6.23438 22.5 12C22.5 17.8125 17.7656 22.5 12 22.5ZM12 14.25C12.375 14.25 12.75 13.9219 12.75 13.5V6C12.75 5.625 12.375 5.25 12 5.25C11.5781 5.25 11.25 5.625 11.25 6V13.5C11.25 13.9219 11.5781 14.25 12 14.25ZM12 16.125C11.3438 16.125 10.875 16.6406 10.875 17.25C10.875 17.9062 11.3438 18.375 12 18.375C12.6094 18.375 13.125 17.9062 13.125 17.25C13.125 16.6406 12.6094 16.125 12 16.125Z"
              fill="#FFA800"
            />
          </svg>
          {lang === "ru" ? "Предупреждение" : "Warning"}
        </div>
        <div className="custom-toast__body">{body}</div>
      </div>
    );
  }
}

export const successToast = (body, lang = "en") => {
  if (enableSuccessToast) {
    enableSuccessToast = false;
  
    setTimeout(() => {
      enableSuccessToast = true
    }, 1500);
    
    return toast(
      <div className="custom-toast__box">
        <div className="custom-toast__head">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M11.0156 15.5625C10.7344 15.8438 10.2188 15.8438 9.9375 15.5625L6.9375 12.5625C6.65625 12.2812 6.65625 11.7656 6.9375 11.4844C7.21875 11.2031 7.73438 11.2031 8.01562 11.4844L10.5 13.9688L15.9375 8.48438C16.2188 8.20312 16.7344 8.20312 17.0156 8.48438C17.2969 8.76562 17.2969 9.28125 17.0156 9.5625L11.0156 15.5625ZM24 12C24 18.6562 18.6094 24 12 24C5.34375 24 0 18.6562 0 12C0 5.39062 5.34375 0 12 0C18.6094 0 24 5.39062 24 12ZM12 1.5C6.1875 1.5 1.5 6.23438 1.5 12C1.5 17.8125 6.1875 22.5 12 22.5C17.7656 22.5 22.5 17.8125 22.5 12C22.5 6.23438 17.7656 1.5 12 1.5Z"
              fill="#25C660"
            />
          </svg>
          {lang === "ru" ? "Успех" : "Success"}
        </div>
        <div className="custom-toast__body">{body}</div>
      </div>,
      {position: toast.POSITION.TOP_RIGHT}
    );
  }
}

