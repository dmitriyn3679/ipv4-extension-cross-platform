import "./Button.scss";
import { ButtonLoader } from "../ButtonLoader";

export function Button({
  type = "button",
  kind,
  text,
  handler = () => {},
  customize = {},
  isLoading = false
}) {
  const baseClass = "button";

  return (
    <button
      type={type}
      className={{
        main: `${baseClass} button--main`,
        secondary: `${baseClass} button--secondary`,
      }[kind]}
      onClick={handler}
      style={{
        ...(isLoading && {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          height: "50px"
        }),
        ...customize
      }}
      disabled={isLoading}
    >
      {isLoading ? <ButtonLoader /> : text}
    </button>

  );
}
