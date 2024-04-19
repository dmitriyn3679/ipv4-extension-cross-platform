import { IconSvg } from "../../../utils/iconSvg";
import { classNames } from "../../../utils/helpers/classNames";
import "./Checkbox.scss";

export function Checkbox({
  name,
  label,
  checked,
  onChange,
  disabled,
  register = () => {},
  partly,
  isLoading = false
}) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          type="checkbox"
          // defaultChecked={Boolean(defaultValue)}
          checked={checked}
          onChange={onChange}
          disabled={isLoading}
          // disabled={disabled}
          {...register(name)}
        />
        <div className={classNames("checkbox__checked", { "checkbox__checked-partly": partly })}>
          <IconSvg tag="checked" />
        </div>
        {label && label}
      </label>
    </div>
  );
}
// ${partly ? "checked-partly" : ""}
