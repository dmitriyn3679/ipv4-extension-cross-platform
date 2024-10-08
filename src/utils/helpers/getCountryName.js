import { capitalize } from "./capitalize";

export const getCountryName = (country, lang) => {
  const countryName = lang === "en"
    ? capitalize(country?.enName)
    : capitalize(country?.name);
  
  return countryName || "";
};
