import "./ButtonLoader.scss";

export const ButtonLoader = ({ width = "36px", height = "36px" }) => {
  const styles = {
    width,
    height
  };

  return (
    <span className="button-loader" style={styles}></span>
  );
};
