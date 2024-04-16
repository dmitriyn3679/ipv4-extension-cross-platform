import {currentBrowser} from "../currentBrowser";

function generatePacScript(ip, port, ignoreHosts, isSocks) {
  let result = "function FindProxyForURL(url, host) {";
  for (let i = 0; i < ignoreHosts.length; i++) {
    result += "if (host == '" + ignoreHosts[i] + "'){";
    result += "return 'DIRECT'; }";
  }
  if (isSocks) {
    result += "return 'SOCKS5 " + ip + ":" + port + "';";
  } else {
    result += "return 'PROXY " + ip + ":" + port + "';";
  }
  result += "}";
  return result;
}

function chromeProxyConfig(ip, port, ignoredHosts, isSocks, callback) {
  const config = {
    mode: "pac_script",
    pacScript: {
      // data: generatePacScript(ip, port, ["stage.proxy-ipv4.com","localhost", "2ip.io"])
      data: generatePacScript(ip, port, ignoredHosts, isSocks)
    }
  };
  chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
    callback();
  });
};

function firefoxProxyConfig(ip, port, ignoredHosts, isSocks, callback) {
  const pacData = generatePacScript(ip, port, ignoredHosts, isSocks);
  
  const blob = new Blob([pacData], {
    type: 'application/x-ns-proxy-autoconfig',
  })
  
  const config = {
    value: {
      proxyType: 'autoConfig',
      autoConfigUrl: URL.createObjectURL(blob),
    }
  }
  
  browser.proxy.settings.set(config).then(() => {
    callback();
  })
}

export function setProxyConfig(ip, port, ignoredHosts, isSocks, callback) {
  switch (currentBrowser) {
    case "chrome":
      chromeProxyConfig(ip, port, ignoredHosts, isSocks, callback);
      break;
      
    case "firefox":
      firefoxProxyConfig(ip, port, ignoredHosts, isSocks, callback);
      break;
      
    default:
      chromeProxyConfig(ip, port, ignoredHosts, isSocks, callback);
  }
}
