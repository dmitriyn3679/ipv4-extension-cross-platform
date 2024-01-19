import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconSvg } from "../../../../../../utils/iconSvg";
import { getCountryFlag } from "../../../../../../utils/helpers/getCountryFlag";
import "./SelectedProxy.scss";
import { useTranslation } from "../../../../../../hooks/useTranslation";

export const SelectedProxy = () => {
  const { selectedProxy } = useSelector((state) => state.content);
  const { homePage: { chooseProxy } } = useTranslation();
  
  return (
    <div className="selected-proxy">
      <div className="selected-proxy__container">
        {selectedProxy ? (
          <>
            <div className="selected-proxy__country">
              <span>{getCountryFlag(selectedProxy?.countryInfo.code)}</span>
              {selectedProxy?.countryInfo.code}
            </div>
            <div className="selected-proxy__ip">
              <span>IP:</span>
              {selectedProxy?.innerIp}
            </div>
          </>
        ) : (
          <div className="selected-proxy__unselected">{chooseProxy}</div>
        )}
      </div>
      <Link
        to={{ search: "?tab=proxies" }}
        className="selected-proxy__show-more"
      >
        <IconSvg tag="arrow" />
      </Link>
    </div>
  );
};
