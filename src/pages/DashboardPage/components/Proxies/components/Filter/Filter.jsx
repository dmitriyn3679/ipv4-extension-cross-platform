import { useState } from "react";
import { IconSvg } from "../../../../../../utils/iconSvg";
import { DropDown } from "./components/DropDown";
import "./Filter.scss";

export const Filter = ({ setSelectedTypes, selectedTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterHandler = () => {
    setIsOpen((current) => !current);
  };
  
  return (
    <div className="filter">
      <button className="filter__button" onClick={filterHandler}>
        <IconSvg tag="filter" />
      </button>
      {isOpen && (
        <DropDown
          setIsOpen={setIsOpen}
          setSelectedTypes={setSelectedTypes}
          selectedTypes={selectedTypes}
        />
      )}
    </div>
  );
};
