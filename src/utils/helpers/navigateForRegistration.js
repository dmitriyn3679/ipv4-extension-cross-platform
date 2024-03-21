export const navigateForRegistration = (lang) => {
  chrome.tabs.create({
    url: `https://proxy-ipv4.com/${lang || "en"}/`
  });
};
