import { useTranslation } from "../../../../../../hooks/useTranslation";
import { IconSvg } from "../../../../../../utils/iconSvg";
import "./SuccessModal.scss";
import { Button } from "../../../../../../components/ui/Button";

export const SuccessModal = ({ handleClose }) => {
  const { bug: { reportSuccessMessage, backButton } } = useTranslation();
  
  return (
    <div className="success-modal">
      <div className="success-modal__container">
        <div className="success-modal__content">
          <div className="success-modal__picture">
            <span className="success-modal__circle" />
            <div className="success-modal__icon-container">
              <IconSvg tag="plane" className="success-modal__icon" />
            </div>
          </div>
          <div className="success-modal__message">{reportSuccessMessage}</div>
        </div>
        <button onClick={handleClose} className="success-modal__button">
          <IconSvg tag="arrow" className="success-modal__button-icon" />
          <span className="success-modal__button-text">{backButton}</span>
        </button>
      </div>
    </div>
  );
};
