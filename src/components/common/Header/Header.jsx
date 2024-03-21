import { useSelector } from "react-redux";
import { Logo } from "../../ui/Logo/Logo";
import { Logout } from "../Logout";
import "./Header.scss";
import { Language } from "../../ui/Language/Language";

export function Header() {
  const { isAuth } = useSelector((state) => state.auth);
  
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__actions">
          <Logo />
          <div className="header__lang-container">
            <Language />
            { isAuth && <Logout /> }
          </div>
        </div>
      </div>
    </header>
  );
}
