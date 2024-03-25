import { useState } from "react";
import { useSelector } from "react-redux";
import { IconSvg } from "../../../../../../../../utils/iconSvg";
import { DropDown } from "./DropDown";
import { classNames } from "../../../../../../../../utils/helpers/classNames";
import { getCountryName } from "../../../../../../../../utils/helpers/getCountryName";
import { getCountryFlag } from "../../../../../../../../utils/helpers/getCountryFlag";
import "./Select.scss";
import { selectTranslations } from "../../../../../../../../features/translation";

export const Select = ({ countries, selectedCountry, setSelectedCountry }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { lang } = useSelector((state) => state.translation);
  const { proxies: { all } } = useSelector(selectTranslations);
  
  const selectHandler = () => {
    setIsOpen((current) => !current);
  };

  return (
    <div className="select">
      <div className="select__container" onClick={selectHandler}>
        <span className="select__value">
          {selectedCountry?.code ? (
            <>
              {getCountryFlag(selectedCountry?.code)}
              <span>{getCountryName(selectedCountry, lang)}</span>
            </>
          ) : (
            all
          )}
        </span>
        <IconSvg
          tag="selectIndicator"
          className={classNames(
            "select__indicator",
            { "select__indicator--active": isOpen }
          )}
        />
      </div>
      { isOpen && (
        <DropDown
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
