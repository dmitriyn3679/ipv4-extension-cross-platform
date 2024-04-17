import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../../../../../../../../../utils/helpers/classNames";
import { setSelectedUserAgent } from "../../../../../../../../../features/settings";
import { updateDynamicRule } from "../../../../../../../../../utils/helpers/updateDynamicRule";
import { USER_AGENT_RULE_ID } from "../../../../../../../../../utils/helpers/ruleIds";
import "./DropDown.scss";

export const DropDown = ({ userAgentParams, setIsOpen, ignoredHosts }) => {
  const dispatch = useDispatch();
  const { selectedUserAgentParams } = useSelector((state) => state.settings);
  const { isProxyEnabled } = useSelector((state) => state.content)
  
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
    setIsOpen(false);
    
    if (isProxyEnabled) {
      updateDynamicRule(USER_AGENT_RULE_ID, value?.headers, ignoredHosts);
    }
  };

  return (
    <div className="select-dropdown">
      <ul className="select-dropdown__options">
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
      </ul>
    </div>
  );
};
