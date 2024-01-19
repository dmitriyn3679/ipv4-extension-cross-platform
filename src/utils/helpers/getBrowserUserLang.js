const availableLanguages = ["en", "ru"];
const cisLangCodes = ["az", "hy", "be", "kk", "ky", "ru", "tg", "uz", "uk"]

export const getBrowserUserLang = () => {
  const { language, languages } = window.navigator;
  
  const userLanguages = [language, ...languages]
    .filter(lang => lang)
    .map(lang => lang.split("-")[0])
  
  for (const userLang of userLanguages) {
    if (availableLanguages.includes(userLang)) {
      return userLang;
    }
    
    if (cisLangCodes.includes(userLang)) {
      return "ru"
    }
  }
};
