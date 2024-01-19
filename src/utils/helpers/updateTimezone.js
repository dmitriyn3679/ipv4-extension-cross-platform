export const updateTimezone = () => {
  chrome.runtime.sendMessage({
    method: 'spoof-timezone'
  });
};
