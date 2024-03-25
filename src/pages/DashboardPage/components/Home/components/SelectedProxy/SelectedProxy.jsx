import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconSvg } from "../../../../../../utils/iconSvg";
import { getCountryFlag } from "../../../../../../utils/helpers/getCountryFlag";
import "./SelectedProxy.scss";
import { useTranslation } from "../../../../../../hooks/useTranslation";
import { getCountryName } from "../../../../../../utils/helpers/getCountryName";

export const SelectedProxy = () => {
  const { selectedProxy } = useSelector((state) => state.content);
  const { homePage: { chooseProxy } } = useTranslation();
  const { lang } = useSelector((state) => state.translation);
  
  return (
    <div className="selected-proxy">
      <div className="selected-proxy__container">
        {selectedProxy ? (
          <>
            <div className="selected-proxy__country">
              <span className="selected-proxy__country-label">
                <>
                  {getCountryFlag(selectedProxy?.countryInfo?.code)}
                  <span>
                    {getCountryName(selectedProxy?.countryInfo, lang) || selectedProxy?.countryInfo?.code}
                  </span>
                </>
              </span>
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
