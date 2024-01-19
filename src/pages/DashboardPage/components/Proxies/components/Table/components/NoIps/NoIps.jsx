import { IconSvg } from "../../../../../../../../utils/iconSvg";
import { useTranslation } from "../../../../../../../../hooks/useTranslation";
import "./NoIps.scss";

export const NoIps = () => {
  const { proxies: { noIps: { title, description } } } = useTranslation();
  
  return (
    <div className="no-ips">
      <IconSvg tag="noIps" className="no-ips__icon" />
      <div className="no-ips__title">
        {title}
      </div>
      <p className="no-ips__description">
        {description}
      </p>
    </div>
  );
};
