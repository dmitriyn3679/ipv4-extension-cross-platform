import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../../../../../../../../../utils/helpers/classNames";
import { setSelectedUserAgent } from "../../../../../../../../../features/settings";
import { updateDynamicRule } from "../../../../../../../../../utils/helpers/updateDynamicRule";
import { USER_AGENT_RULE_ID } from "../../../../../../../../../utils/helpers/ruleIds";
import "./DropDown.scss";
import { useTranslation } from "../../../../../../../../../hooks/useTranslation";

export const DropDown = ({ userAgentParams, setIsOpen, ignoredHosts, setFilterText }) => {
  const dispatch = useDispatch();
  const { selectedUserAgentParams } = useSelector((state) => state.settings);
  const { isProxyEnabled } = useSelector((state) => state.content)
  
  const { settings: { nothingFound } } = useTranslation();
  
  useEffect(() => {
    const closeMenu = ({ target }) => {
      if (!target.closest(".select")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);
  
  const handleSelect = (value) => {
    dispatch(setSelectedUserAgent(value));
    setFilterText(value?.name);
    setIsOpen(false);
    
    if (isProxyEnabled) {
      updateDynamicRule(USER_AGENT_RULE_ID, value?.headers, ignoredHosts);
    }
  };

  return (
    <div className="select-dropdown">
      <ul className="select-dropdown__fingerprint-options">
        { userAgentParams.map((option) => (
          <li
            key={option?.id}
          >
            <div
              className={classNames(
                "select-dropdown__option",
                { "select-dropdown__option--selected": option?.id === selectedUserAgentParams?.id }
              )}
              onClick={() => handleSelect(option)}
            >
              {option?.name}
            </div>
          </li>
        )) }
        {!userAgentParams?.length && (
          <li>
            <div className="select-dropdown__option select-dropdown__not-found">{nothingFound}</div>
          </li>
        )}
      </ul>
    </div>
  );
};
