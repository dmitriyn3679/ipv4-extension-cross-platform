import { useSelector } from "react-redux";
import { Logo } from "../../ui/Logo/Logo";
import { Logout } from "../Logout";
import "./Header.scss";

export function Header() {
  const { isAuth } = useSelector((state) => state.auth);
  
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__actions">
          <Logo />
          { isAuth && <Logout /> }
        </div>
      </div>
    </header>
  );
}
