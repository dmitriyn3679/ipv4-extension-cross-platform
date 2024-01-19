export const resetTimezone = () => {
  chrome.runtime.sendMessage({
    method: 'reset-timezone'
  })
};
