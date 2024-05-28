import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "./components/Select";
import { selectTranslations } from "../../../../../../features/translation";
import "./Fingerprint.scss";
import { USER_AGENT_RULE_ID } from "../../../../../../utils/helpers/ruleIds";
import { setSelectedUserAgent } from "../../../../../../features/settings";
import { clearDynamicRules } from "../../../../../../utils/helpers/clearDynamicRules";

export const Fingerprint = ({ ignoredHosts }) => {
  const {
    settings: {
      fingerprintTitle,
      fingerprintLink,
    }
  } = useSelector(selectTranslations);

  const { selectedUserAgentParams } = useSelector((state) => state.settings);
  const [filterText, setFilterText] = useState(selectedUserAgentParams?.name || "");
  
  const dispatch = useDispatch();
  
  const resetUserAgent = () => {
    setFilterText("");
    dispatch(setSelectedUserAgent(null));
    clearDynamicRules([USER_AGENT_RULE_ID]);
  };

  return (
    <div className="fingerprint">
      <div className="fingerprint__header">
        <span className="fingerprint__title">{fingerprintTitle}</span>
        <span className="fingerprint__link" onClick={resetUserAgent}>{fingerprintLink}</span>
      </div>
      <Select
        ignoredHosts={ignoredHosts}
        filterText={filterText}
        setFilterText={setFilterText}
      />
    </div>
  );
};
