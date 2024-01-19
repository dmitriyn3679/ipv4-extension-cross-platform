export function clearProxy() {
  chrome.runtime.sendMessage({ type: "remove_proxy" });
}
