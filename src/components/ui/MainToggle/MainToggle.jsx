import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../../../utils/helpers/classNames";
import { IconSvg } from "../../../utils/iconSvg";
import { setProxyStatus } from "../../../features/content";
import { resetProxyParams } from "../../../utils/helpers/resetProxyParams";
import { enableProxy } from "../../../utils/helpers/enableProxy";
import { updateTimezone } from "../../../utils/helpers/updateTimezone";
import { getLangHeader } from "../../../utils/helpers/getLangHeader";
import { LANG_RULE_ID, USER_AGENT_RULE_ID } from "../../../utils/helpers/ruleIds";
import { updateDynamicRule } from "../../../utils/helpers/updateDynamicRule";
import "./MainToggle.scss";

export const MainToggle = ({ isUnavailableType }) => {
  const dispatch = useDispatch();
  const { isProxyEnabled } = useSelector((state) => state.content)
  const { selectedProxy } = useSelector((state) => state.content);
  const {
    isSpoofTimezoneActive,
    isSpoofLangActive,
    selectedUserAgentParams,
    ignoredHosts
  } = useSelector((state) => state.settings);
  
  useEffect(() => {
    if (!selectedProxy) {
      resetProxyParams();
      dispatch(setProxyStatus(false))
    }
  }, [selectedProxy]);
  
  const hosts = ["stage.proxy-ipv4.com", "proxy-ipv4.com", ...ignoredHosts];
  const isSocks = selectedProxy?.protocol === "SOCKS";
  
  const setProxySettings = () => {
    dispatch(setProxyStatus(true))
  
    if (isSpoofTimezoneActive) {
      updateTimezone();
    }
    
    if (isSpoofLangActive) {
      const langHeader = getLangHeader(selectedProxy);
      updateDynamicRule(LANG_RULE_ID, {
        "Accept-Language": langHeader || "en;q=1.0"
      }, hosts)
    }
    
    if (selectedUserAgentParams) {
      updateDynamicRule(USER_AGENT_RULE_ID, selectedUserAgentParams.headers, hosts);
    }
  };
  
  const toggleHandler = async () => {
    if (!selectedProxy || isUnavailableType) {
      return;
    }

    if (!isProxyEnabled) {
      enableProxy(
        selectedProxy?.innerIp,
        selectedProxy?.proxyType === "IPv6" ? selectedProxy?.port : selectedProxy?.proxyPort,
        selectedProxy?.authLogin,
        selectedProxy?.authPassword,
        hosts,
        isSocks,
        setProxySettings
      )
    } else {
      dispatch(setProxyStatus(false))
      resetProxyParams();
    }
  };
  
  return (
    <div
      className={classNames(
        "main-toggle",
        {
          "main-toggle--on": isProxyEnabled,
          "main-toggle--disabled": !selectedProxy || isUnavailableType
        }
      )}
      onClick={toggleHandler}
    >
      <div className={classNames(
        "main-toggle__container",
        "main-toggle__container-on",
        { "main-toggle__container-on--hidden": !isProxyEnabled }
      )}
      />
      <div className={classNames(
        "main-toggle__container",
        "main-toggle__container-off",
        { "main-toggle__container-off--hidden": isProxyEnabled }
      )}
      />
      <div className={classNames(
        "main-toggle__background",
        "main-toggle__background--on",
        { "main-toggle__background--on-hidden": isProxyEnabled }
      )}
      >
        <IconSvg tag="toggleArrows" />
        <span>on</span>
      </div>
      <div className={classNames(
        "main-toggle__background",
        "main-toggle__background--off",
        { "main-toggle__background--off-hidden": !isProxyEnabled }
      )}
      >
        <span>off</span>
        <IconSvg tag="toggleArrows" />
      </div>
      <div className={classNames(
        "main-toggle__button",
        { "main-toggle__button--active": isProxyEnabled }
      )}
      >
        <div className={classNames(
          "main-toggle__icon-container",
          { "main-toggle__icon-container--active": isProxyEnabled }
        )}
        >
          <IconSvg
            tag="toggleIcon"
            className={classNames(
              "main-toggle__toggle-icon",
              { "main-toggle__toggle-icon--active": isProxyEnabled }
            )}
          />
        </div>
        <div className={classNames(
          "main-toggle__button-background",
          "main-toggle__button-background--on",
          { "main-toggle__button-background--on-hidden": !isProxyEnabled }
        )}
        />
        <div className={classNames(
          "main-toggle__button-background",
          "main-toggle__button-background--off",
          { "main-toggle__button-background--off-hidden": isProxyEnabled }
        )}
        />
      </div>
    </div>
  );
};
