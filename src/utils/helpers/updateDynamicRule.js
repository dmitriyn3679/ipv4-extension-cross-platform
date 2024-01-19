import {createDynamicRule} from "./createDynamicRule";

export const updateDynamicRule = (ruleId, params, ignoredHosts = []) => {
  const rule = createDynamicRule(ruleId, params, ignoredHosts)
  
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [ruleId],
    addRules: [rule]
  });
};
