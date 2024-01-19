import {countriesParams} from "./countriesParams";

export const getLangHeader = (selectedProxy) => {
  const currentCountry = countriesParams[selectedProxy?.code];
  if (currentCountry) {
    return currentCountry.lang;
  }
};
