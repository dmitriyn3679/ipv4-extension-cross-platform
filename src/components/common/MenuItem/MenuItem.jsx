import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconSvg } from "../../../utils/iconSvg";
import { RoundButton } from "../../ui/RoundButton";
import { classNames } from "../../../utils/helpers/classNames";
import "./MenuItem.scss";

export const MenuItem = ({ title, icon, link, isActive }) => {
  const searchLink = link ? `?tab=${link}` : "";
  const { isLoaded: isAuthDataLoaded } = useSelector((state) => state.auth)
  
  return (
    <li className={classNames(
      "menu-item",
      { "menu-item--active": isActive }
    )}
    >
      <Link
        onClick={isAuthDataLoaded ? () => {} : (e) => e.preventDefault()}
        to={{ search: searchLink }}
        className="menu-item__link"
      >
        <div className="menu-item__container">
          <IconSvg
            tag={icon}
            className={`menu-item__icon menu-item__icon--${icon}`}
          />
          <span className="menu-item__title">{title}</span>
        </div>
        <div>
          <RoundButton isActive={isActive} />
        </div>
      </Link>
    </li>
  );
};
