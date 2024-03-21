import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../Toggle";
import { changeLang } from "../../../features/translation";
import "./Language.scss";

export const Language = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.translation);
  
  const setLang = (code) => {
    dispatch(changeLang(code))
  };
  
  const handleLang = () => {
    if (lang === "en") {
      setLang("ru");
      
      return;
    }
    setLang("en");
  };
  
  return (
    <div className="lang">
      <Toggle checked={lang === "en"} handleSwitch={handleLang} />
      <span className="lang__label">{lang}</span>
    </div>
  );
};
