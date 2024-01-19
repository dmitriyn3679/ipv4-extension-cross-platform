import { IconSvg } from "../../../utils/iconSvg";
import { classNames } from "../../../utils/helpers/classNames";
import "./RoundButton.scss";

export function RoundButton({ isActive }) {
  return (
    <button
      className={classNames(
        "round-button",
        { "round-button--active": isActive }
      )}
    >
      <IconSvg tag="arrow" />
    </button>
  );
}
