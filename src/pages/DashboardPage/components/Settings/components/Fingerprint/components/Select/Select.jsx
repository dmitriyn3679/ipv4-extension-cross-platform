import { useEffect, useState } from "react";
import { IconSvg } from "../../../../../../../../utils/iconSvg";
import { DropDown } from "./DropDown";
import { classNames } from "../../../../../../../../utils/helpers/classNames";
import { ApiService } from "../../../../../../../../api/ApiService";
import { errorToast } from "../../../../../../../../utils/helpers/customToast";
import { useTranslation } from "../../../../../../../../hooks/useTranslation";
import "./Select.scss";

export const Select = ({ ignoredHosts, filterText, setFilterText }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { settings: { defaultLabel } } = useTranslation();
  
  const [userAgentParams, setUserAgentParams] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await ApiService.getUserAgentParams();
        
        if (status !== 200) {
          throw new Error();
        }
        
        setUserAgentParams(data);
      } catch {
        errorToast("Something went wrong")
      }
    })()
  }, []);

  const selectHandler = () => {
    setIsOpen((current) => !current);
  };
  
  const filteredUserAgentParams = userAgentParams
    .filter((userAgent) => userAgent.name.toLowerCase().includes(filterText.toLowerCase()))
  
  return (
    <div className="select">
      {/*<div className="select__container" onClick={selectHandler}>*/}
      <div className="select__container">
        <input
          className="select__value"
          placeholder={defaultLabel}
          onChange={(e) => setFilterText(e.target.value)}
          onFocus={() => setIsOpen(true)}
          value={filterText}
        />
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
          ignoredHosts={ignoredHosts}
          userAgentParams={filteredUserAgentParams}
          setIsOpen={setIsOpen}
          setFilterText={setFilterText}
        />
      )}
    </div>
  );
};
