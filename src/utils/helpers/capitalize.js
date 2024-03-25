export const capitalize = (str) => {
  if (typeof str !== "string") {
    return ""
  };
  
  if (str === "USA" || str === "США") {
    return str;
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
