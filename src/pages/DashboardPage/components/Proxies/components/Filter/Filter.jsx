import { useEffect, useState } from "react";
import { IconSvg } from "../../../../../../utils/iconSvg";
import { DropDown } from "./components/DropDown";
import "./Filter.scss";
import { ApiService } from "../../../../../../api/ApiService";
import { errorToast } from "../../../../../../utils/helpers/customToast";
import { classNames } from "../../../../../../utils/helpers/classNames";

export const Filter = (
  { setSelectedTypes, selectedTypes, selectedCountry, setSelectedCountry }
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const filterHandler = () => {
    if (isLoading) {
      return;
    }
    setIsOpen((current) => !current);
  };
  
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const { data, status } = await ApiService.getFilterCountries();
        
        if (status !== 200) {
          throw new Error();
        }
  
        setCountries(data?.countries || []);
      } catch {
        errorToast("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    })()
  }, []);

  return (
    <div className={classNames("filter")}>
      <button
        className={classNames(
          "filter__button",
          { "filter__button--disabled": isLoading }
        )}
        onClick={filterHandler}
      >
        <IconSvg tag="filter" />
      </button>
      {isOpen && (
        <DropDown
          countries={countries}
          setIsOpen={setIsOpen}
          setSelectedTypes={setSelectedTypes}
          selectedTypes={selectedTypes}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </div>
  );
};
