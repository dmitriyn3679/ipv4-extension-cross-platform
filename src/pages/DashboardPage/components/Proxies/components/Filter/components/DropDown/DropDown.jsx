import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "../../../../../../../../components/ui/Checkbox";
// eslint-disable-next-line max-len
import { selectTranslations } from "../../../../../../../../features/translation";
import "./DropDown.scss";
import { Select } from "../Select";

export const DropDown = (
  {
    setIsOpen,
    setSelectedTypes,
    selectedTypes,
    countries,
    selectedCountry,
    setSelectedCountry
  }
) => {
  const { proxies: { proxyType, country } } = useSelector(selectTranslations);
  
  const proxyTypes = [
    { value: "IPv4", code: "IPv4" },
    { value: "IPv6", code: "IPv6" },
    { value: "ISP", code: "ISP" },
    { value: "Mobile", code: "MOBILE" }
  ];

  useEffect(() => {
    const closeMenu = ({ target }) => {
      const filterEl = document.querySelector(".filter");
      // if (!target.closest(".filter")) {
      if (!filterEl.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);
  
  const handleFilter = ({ target: { checked } }, selectedProxyType) => {
    if (!checked) {
      setSelectedTypes((current) => current.filter((type) => selectedProxyType !== type))
      // setIsOpen(false);
      return;
    }
    setSelectedTypes((current) => [...current, selectedProxyType]);
    // setIsOpen(false);
  };

  return (
    <div className="filter-dropdown dashboard-content-container">
      <div className="filter-dropdown__title">
        {proxyType}
      </div>
      <div className="filter-dropdown__params">
        <ul className="filter-dropdown__ip-types">
          {proxyTypes.map((type) => (
            <li key={type.code} className="filter-dropdown__param">
              <div className="filter-dropdown__param-container">
                <Checkbox
                  checked={selectedTypes.includes(type.code)}
                  onChange={(e) => handleFilter(e, type.code)}
                />
                {type.value}
              </div>
            </li>
          ))}
        </ul>
        <div className="filter-dropdown__title">
          {country}
        </div>
        <Select
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
    </div>
  );
};
