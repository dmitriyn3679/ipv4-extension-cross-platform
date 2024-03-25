import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../../features/translation";
import "./Language.scss";
import { classNames } from "../../../utils/helpers/classNames";
import { IconSvg } from "../../../utils/iconSvg";

export const Language = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.translation);
  
  const languages = [
    { label: "EN", value: "en" },
    { label: "RU", value: "ru" },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  
  const setLang = (code) => {
    if (code !== lang) {
      dispatch(changeLang(code))
    }
    
    setIsOpen(false);
  };
  
  return (
    <div
      className="language"
      onTouchStart={() => setIsOpen((current) => !current)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="language__select">
        <div className="language__title">
          {lang.toUpperCase()}
        </div>
        <IconSvg
          tag="selectIndicator"
          className={classNames(
            "language__dropdown-indicator",
            { "language__dropdown-indicator--active": isOpen }
          )}
        />
      </div>
      {
        isOpen && (
          <div className="language__dropdown-container">
            <div className="language__dropdown">
              <ul className="language__list">
                {languages.map(({ label, value }) => (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    className={classNames(
                      "language__item",
                      { "language__item--is-active": value === lang }
                    )}
                    key={value}
                    onClick={() => setLang(value)}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      }
    </div>
  )
};
