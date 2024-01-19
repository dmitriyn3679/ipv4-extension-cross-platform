import {setProxyConfig} from "./setProxyConfig";

export function enableProxy(ip, port, username, password, ignoredHosts, callback) {
  const detail = {
    ip,
    port,
    username,
    password,
    ignoredHosts,
  }
  
  
  // eslint-disable-next-line no-undef
  setProxyConfig(ip, port, ignoredHosts, callback)
  chrome.runtime.sendMessage({ type: "set_proxy", proxyDetails: detail });
}
