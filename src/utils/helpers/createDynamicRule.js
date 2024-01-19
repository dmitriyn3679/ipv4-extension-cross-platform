export const createDynamicRule = (ruleId, params = null, ignoredHosts) => {
  if (!params) {
    return;
  }
  
  const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);
  
  const headers = Object.entries(params).map(([header, value]) => {
    return {
      operation: chrome.declarativeNetRequest?.HeaderOperation?.SET || "set",
      header,
      value
    }
  });
  
  return {
    id: ruleId,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest?.RuleActionType?.MODIFY_HEADERS || "modifyHeaders",
      requestHeaders: headers
    },
    condition: {
      urlFilter: "*",
      resourceTypes: allResourceTypes,
      excludedRequestDomains: ignoredHosts
    }
  }
};
