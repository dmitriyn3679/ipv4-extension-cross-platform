export const resetUserAgent = () => {
  chrome.storage.local.set({ selectedUserAgentParams: null })
};
