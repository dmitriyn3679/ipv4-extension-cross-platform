import {currentBrowser} from "../currentBrowser";

function generatePacScript(ip, port, ignoreHosts) {
  let result = "function FindProxyForURL(url, host) {";
  for (let i = 0; i < ignoreHosts.length; i++) {
    result += "if (host == '" + ignoreHosts[i] + "'){";
    result += "return 'DIRECT'; }";
  }
  result += "return 'PROXY " + ip + ":" + port + "';";
  result += "}";
  return result;
}

function chromeProxyConfig(ip, port, ignoredHosts, callback) {
  const config = {
    mode: "pac_script",
    pacScript: {
      // data: generatePacScript(ip, port, ["stage.proxy-ipv4.com","localhost", "2ip.io"])
      data: generatePacScript(ip, port, ignoredHosts)
    }
  };
  chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
    callback();
  });
};

function firefoxProxyConfig(ip, port, ignoredHosts, callback) {
  const pacData = generatePacScript(ip, port, ignoredHosts);
  
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

export function setProxyConfig(ip, port, ignoredHosts, callback) {
  switch (currentBrowser) {
    case "chrome":
      chromeProxyConfig(ip, port, ignoredHosts, callback);
      break;
      
    case "firefox":
      firefoxProxyConfig(ip, port, ignoredHosts, callback);
      break;
      
    default:
      chromeProxyConfig(ip, port, ignoredHosts, callback);
  }
}
