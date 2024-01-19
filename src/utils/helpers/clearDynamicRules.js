export const clearDynamicRules = (ids) => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids
  });
};
