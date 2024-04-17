import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconSvg } from "../../../../../../../../utils/iconSvg";
import { DropDown } from "./DropDown";
import { classNames } from "../../../../../../../../utils/helpers/classNames";
import "./Select.scss";
import { ApiService } from "../../../../../../../../api/ApiService";
import { errorToast } from "../../../../../../../../utils/helpers/customToast";

export const Select = ({ ignoredHosts }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [userAgentParams, setUserAgentParams] = useState();
  const { selectedUserAgentParams } = useSelector((state) => state.settings);
  
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

  return (
    <div className="select">
      <div className="select__container" onClick={selectHandler}>
        <span className="select__value">{selectedUserAgentParams?.name || "Default"}</span>
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
          userAgentParams={userAgentParams}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
