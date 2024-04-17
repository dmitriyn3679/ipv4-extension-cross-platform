import {countriesParams} from "./countriesParams";

export const getLangHeader = (selectedProxy) => {
  const currentCountry = countriesParams.find(({ code }) => code === selectedProxy?.country);
  if (currentCountry) {
    return currentCountry.lang;
  }
};
