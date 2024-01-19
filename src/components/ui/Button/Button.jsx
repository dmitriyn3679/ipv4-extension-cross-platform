import "./Button.scss";

export function Button({
  type = "button",
  kind,
  text,
  handler = () => {},
  customize = {},
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
      style={customize}
    >
      {text}
    </button>

  );
}
