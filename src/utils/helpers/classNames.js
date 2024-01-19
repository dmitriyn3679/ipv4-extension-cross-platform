export const classNames = (...args) => {
  let res = "";

  for (const cls of args) {
    if (typeof cls === "object") {
      for (const value in cls) {
        if (cls[value] === true) {
          res += `${value} `;
        }
      }

      continue;
    }

    res += `${cls} `;
  }

  return res;
};
