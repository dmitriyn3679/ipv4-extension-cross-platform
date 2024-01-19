import { createSlice } from "@reduxjs/toolkit";
import { getBrowserUserLang } from "../utils/helpers/getBrowserUserLang";
import ruTranslations from "../utils/locales/ru.json"
import enTranslations from "../utils/locales/en.json"

const storageLang = localStorage.getItem("lang");

const initialState = {
  lang: storageLang || getBrowserUserLang(),
  translations: {
    en: enTranslations,
    ru: ruTranslations
  }
};

export const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload)
    }
  }
});

export const selectTranslations = (state) => {
  return state.translation.translations[state.translation.lang]
};

export const { changeLang } = translationSlice.actions;

export default translationSlice.reducer;
