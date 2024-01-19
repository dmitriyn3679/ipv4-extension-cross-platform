import { authTypes } from "../authTypes";

export const moveToLogin = (searchParams, setSearchParams) => {
  searchParams.set("type", authTypes.login);
  setSearchParams(searchParams);
};

export const moveToRegister = (searchParams, setSearchParams) => {
  searchParams.set("type", authTypes.registration);
  setSearchParams(searchParams);
};
