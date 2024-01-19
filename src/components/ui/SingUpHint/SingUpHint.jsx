import { useTranslation } from "../../../hooks/useTranslation";
import "./SingUpHint.scss";

export function SingUpHint({ customize = {} }) {
  const { auth } = useTranslation();
  
  return (
    <div className="sigh-up-hint" style={customize}>{auth.signUpHint}</div>
  );
}
