import { useSelector } from "react-redux";
import { Config } from "./components/Config";
import { BugReportForm } from "./components/BugReportForm/BugReportForm";
import "./BugReport.scss";
import { selectTranslations } from "../../../../features/translation";

export const BugReport = () => {
  const { bug: { label } } = useSelector(selectTranslations);

  return (
    <div className="bug">
      <div className="bug__title">{label}</div>
      <div className="bug__content dashboard-content-container">
        <div className="bug__config">
          <Config />
        </div>
        <BugReportForm />
      </div>
    </div>
  );
};
