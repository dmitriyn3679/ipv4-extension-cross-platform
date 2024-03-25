import { useEffect } from "react";
import { useSelector } from "react-redux";
import { classNames } from "../../../../../../../../../utils/helpers/classNames";
import "./DropDown.scss";
import { getCountryName } from "../../../../../../../../../utils/helpers/getCountryName";
import { getCountryFlag } from "../../../../../../../../../utils/helpers/getCountryFlag";
import { selectTranslations } from "../../../../../../../../../features/translation";

export const DropDown = ({ countries, setIsOpen, selectedCountry, setSelectedCountry }) => {
  const { lang } = useSelector((state) => state.translation);
  const { proxies: { all } } = useSelector(selectTranslations);
  
  useEffect(() => {
    const closeMenu = ({ target }) => {
      if (!target.closest(".select")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);
  
  const handler = (e, country) => {
    e.stopPropagation();
    setSelectedCountry(country);
    setIsOpen(false);
  };
  
  const options = [null, ...countries]

  return (
    <div className="select-dropdown">
      <ul className="select-dropdown__options">
        { options.map((country, idx) => (
          <li
            key={idx}
          >
            <div
              className={classNames(
                "test-selector select-dropdown__option",
                { "select-dropdown__option--selected": country?.code === selectedCountry?.code }
              )}
              onClick={(e) => handler(e, country)}
            >
              {country ? (
                <>
                  {getCountryFlag(country?.code)}
                  <span>{getCountryName(country, lang)}</span>
                </>
              ) : (
                all
              )}
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
};
