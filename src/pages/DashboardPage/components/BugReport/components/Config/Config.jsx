import { useSelector } from "react-redux";
import { UAParser } from "ua-parser-js";
import { selectTranslations } from "../../../../../../features/translation";
import "./Config.scss";

export const Config = () => {
  const { isProxyEnabled } = useSelector((state) => state.content)
  const { bug: { config } } = useSelector(selectTranslations);
  
  const getConfig = () => {
    const uaData = new UAParser(window.navigator.userAgent);
    const clientInfo = localStorage.getItem("client_info")
    
    const { browser: { name: browserName }, os: { name: osName } } = uaData.getResult();
    
    return {
      version: "1.0",
      mode: isProxyEnabled ? "enabled" : "disabled",
      platform: osName,
      browser: browserName,
      account: clientInfo || "undefined",
      site: "proxy-ipv4.com"
    }
  };

  const confEntries = Object.entries(getConfig());

  return (
    <div className="config">
      {confEntries.map(([label, value]) => (
        <div className="config__container">
          <span className="config__label">{config[label]}</span>
          <span className="config__value">{value}</span>
        </div>
      ))}
    </div>
  );
};
