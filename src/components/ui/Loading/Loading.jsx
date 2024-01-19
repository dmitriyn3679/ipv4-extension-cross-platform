import "./Loading.scss";

export const Loading = (props) => {
  // **Props
  const { transparent, fixed, absolute, white, roller, scale, tableRow, mainLoader, inputLoader, orderForm, ...rest } = props;

  const getClassNames = () => {
    let str = "loader";

    if (fixed) {
      str += " loader__fixed";
    }

    if (absolute) {
      str += " loader__absolute";
    }

    if (white) {
      str += " loader__bg--white";
    }

    if (transparent) {
      str += " loader__bg--transparent";
    }

    if (orderForm) {
      str += " loader__bg--order-form";
    }

    if (tableRow) {
      str += " loader__table-row";
    }

    if (mainLoader) {
      str += " loader__main";
    }

    if (inputLoader) {
      str += " loader__input";
    }

    return str;
  };

  return (
    <div className={getClassNames()} style={{ transform: `scale(${scale})` }} {...rest}>
      <div className="lds-roller" style={roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
