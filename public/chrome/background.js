let proxyUsername = "";
let proxyPassword = "";

chrome.action.setIcon({
  'path': {
    '16': './assets/favicons/favicon-16x16-light-gray.png',
    '32': './assets/favicons/favicon-32x32-light-gray.png'
  }
});

// function setProxy(ip, port, ignoredHosts) {
//   const config = {
//     mode: "pac_script",
//     pacScript: {
//       // data: generatePacScript(ip, port, ["stage.proxy-ipv4.com","localhost", "2ip.io"])
//       data: generatePacScript(ip, port, ignoredHosts)
//     }
//   };
//   chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
//   });
// }

chrome.webRequest.onAuthRequired.addListener(function (details, callbackFn) {
  callbackFn({
    authCredentials: {
      username: proxyUsername,
      password: proxyPassword
    }
  });
}, {urls: ["<all_urls>"]}, ['asyncBlocking']);


function clearProxy() {
  chrome.proxy.settings.clear({scope: "regular"}, function () {
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "set_proxy") {
    const { ip, port, username, password, ignoredHosts } = request.proxyDetails;
    proxyUsername = username
    proxyPassword = password;
    // setProxy(ip, port, ignoredHosts);
  
    chrome.action.setIcon({
      'path': {
        '16': './assets/favicons/favicon-16x16-light.png',
        '32': './assets/favicons/favicon-32x32-light.png'
      }
    });
  }
  if (request.type === "remove_proxy") {
    chrome.action.setIcon({
      'path': {
        '16': './assets/favicons/favicon-16x16-light-gray.png',
        '32': './assets/favicons/favicon-32x32-light-gray.png'
      }
    });
    clearProxy();
  }
});


// function generatePacScript(ip, port, ignoreHosts) {
//   let result = "function FindProxyForURL(url, host) {";
//   for (let i = 0; i < ignoreHosts.length; i++) {
//     result += "if (host == '" + ignoreHosts[i] + "'){";
//     result += "return 'DIRECT'; }";
//   }
//   result += "return 'PROXY " + ip + ":" + port + "';";
//   result += "}";
//   return result;
// }


// timezone

/* global offsets */

self.importScripts('/data/offsets.js');

const uo = () => new Promise(resolve => chrome.storage.local.get({
  'timezone': Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT'
}, prefs => {
  console.log(prefs)
  let offset = 0;
  try {
    offset = uo.engine(prefs.timezone);
    console.log('in uo', offset)
    chrome.storage.local.set({
      offset
    });
    resolve({offset, timezone: prefs.timezone});
  }
  catch (e) {
    prefs.timezone = Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT';
    prefs.offset = 0;
    chrome.storage.local.set(prefs);
    console.error(e);
    resolve(prefs);
  }
  chrome.action.setTitle({
    title: chrome.runtime.getManifest().name + ' (' + prefs.timezone + ')'
  });
}));
uo.engine = timeZone => {
  const value = 'GMT' + uo.date.toLocaleString('en', {
    timeZone,
    timeZoneName: 'longOffset'
  }).split('GMT')[1];
  
  
  if (value === 'GMT') {
    return 0;
  }
  const o = /(?<hh>[-+]\d{2}):(?<mm>\d{2})/.exec(value);
  return Number(o.groups.hh) * 60 + Number(o.groups.mm);
};
uo.date = new Date();

chrome.runtime.onInstalled.addListener(uo);
chrome.runtime.onStartup.addListener(uo);

const resetTimezone = () => {
  chrome.storage.local.get('userTimezone', ({ userTimezone }) => {
    chrome.storage.local.set({
      timezone: userTimezone
    }, () => {
      uo();
    })
  })
};

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.method === 'spoof-timezone') {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(userTimezone)
    chrome.storage.local.set({
      userTimezone
    }, () => {
      server();
    })
  }
  
  if (request.method === 'reset-timezone') {
    resetTimezone();
  }
  
  if (request.method === 'update-offset') {
    uo();
  }
  else if (request.method === 'get-offset') {
    response(uo.engine(request.value));
  }
  else if (request.method === 'get-prefs') {
    chrome.storage.local.get({
      random: false,
      timezone: Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT',
      offset: 0
    }, prefs => {
      console.log(prefs);
      
      if (prefs.random) {
        const key = 'random.' + sender.tab.id;
        chrome.storage.session.get({
          [key]: false
        }, ps => {
          if (ps[key]) {
            response(ps[key]);
          }
          else {
            response(prefs);
          }
        });
      }
      else {
        response(prefs);
      }
    });
    return true;
  }
});

// chrome.tabs.onRemoved.addListener(tabId => chrome.storage.session.remove('random.' + tabId));

const onCommitted = ({url, tabId, frameId}) => {
  console.log('on committed react')
  const send = o => chrome.scripting.executeScript({
    target: {
      tabId,
      frameIds: [frameId]
    },
    injectImmediately: true,
    func: o => {
      self.prefs = o;
      try {
        self.update('committed');
      }
      catch (e) {}
    },
    args: [o]
  }).catch(() => {});
  
  if (url && url.startsWith('http')) {
    chrome.storage.local.get({
      random: false,
      timezone: Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT',
      offset: 0
    }, prefs => {
      if (prefs.random) {
        const key = 'random.' + tabId;
        
        chrome.storage.session.get({
          [key]: false
        }, ps => {
          if (frameId === 0 || !ps[key]) {
            const ofs = Object.keys(offsets);
            const n = ofs[Math.floor(Math.random() * ofs.length)];
            
            try {
              ps[key] = {
                offset: uo.engine(n),
                timezone: n
              };
              chrome.storage.session.set({
                [key]: ps[key]
              });
            }
            catch (e) {}
          }
          send(ps[key] || prefs);
        });
      }
      else {
        send(prefs);
      }
    });
  }
};
chrome.webNavigation.onCommitted.addListener(onCommitted);

// chrome.action.onClicked.addListener(() => {
//   onClicked({
//     menuItemId: 'check-timezone'
//   });
//   chrome.storage.local.get({
//     msg: true
//   }, prefs => {
//     if (prefs.msg) {
//       chrome.storage.local.set({
//         msg: false
//       });
//     }
//   });
// });

const server = async (silent = true) => {
  try {
    const r = await fetch('http://ip-api.com/json');
    const {timezone} = await r.json();
    
    if (!timezone) {
      throw Error('cannot resolve timezone for your IP address. Use options page to set manually');
    }
    
    chrome.storage.local.get({
      timezone: Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT'
    }, prefs => {
      if (prefs.timezone !== timezone) {
        chrome.storage.local.set({
          timezone
        }, () => {
        });
      }
      else if (silent === false) {
      }
    });
  }
  catch (e) {
    if (silent === false) {
      console.warn(e);
    }
  }
};

// /* update on startup */
// {
//   const once = () => chrome.storage.local.get({
//     update: false
//   }, prefs => {
//     if (prefs.update) {
//       server();
//     }
//   });
//   chrome.runtime.onInstalled.addListener(once);
//   chrome.runtime.onStartup.addListener(once);
// }

// const onClicked = ({menuItemId}) => {
//   if (menuItemId === 'update-timezone') {
//     server(false);
//   }
//   else if (menuItemId === 'check-timezone') {
//     chrome.tabs.create({
//       url: 'https://webbrowsertools.com/timezone/'
//     });
//   }
// };
// chrome.contextMenus.onClicked.addListener(onClicked);
