import { useSelector } from "react-redux";
import { useState } from "react";
import { Config } from "./components/Config";
import { BugReportForm } from "./components/BugReportForm/BugReportForm";
import { selectTranslations } from "../../../../features/translation";
import { SuccessModal } from "./components/SuccessModal/SuccessModal";
import "./BugReport.scss";

export const BugReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bug: { label } } = useSelector(selectTranslations);
  
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bug">
      <div className="bug__title">{label}</div>
      <div className="bug__content dashboard-content-container">
        <div className="bug__config">
          <Config />
        </div>
        <BugReportForm openModalHandler={openModalHandler} />
      </div>
      {isModalOpen && <SuccessModal handleClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
