let proxyUsername = "";
let proxyPassword = "";

// browser.action.setIcon({
//   'path': {
//     '16': './assets/favicons/favicon-16x16-light-gray.png',
//     '32': './assets/favicons/favicon-32x32-light-gray.png'
//   }
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.action.setIcon({
    'path': {
      '16': './assets/favicons/favicon-16x16-light-gray.png',
      '32': './assets/favicons/favicon-32x32-light-gray.png'
    }
  });
});

browser.webRequest.onAuthRequired.addListener(function (details) {

  return {
    'authCredentials': {
      'username': proxyUsername,
      'password': proxyPassword
    }
  };

}, { 'urls': ['<all_urls>'] }, ['blocking']);

function clearProxy() {
  browser.proxy.settings.clear({});
}

console.log('bg')

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "set_proxy") {
    const { ip, port, username, password, ignoredHosts } = request.proxyDetails;
    proxyUsername = username
    proxyPassword = password;
  
    browser.action.setIcon({
      'path': {
        '16': './assets/favicons/favicon-16x16-light.png',
        '32': './assets/favicons/favicon-32x32-light.png'
      }
    });
  
    chrome.storage.local.set({ isProxyConfigEnabled: true })
  }
  if (request.type === "remove_proxy") {
    console.log('remove')
    browser.action.setIcon({
      'path': {
        '16': './assets/favicons/favicon-16x16-light-gray.png',
        '32': './assets/favicons/favicon-32x32-light-gray.png'
      }
    });
  
    chrome.storage.local.set({ isProxyConfigEnabled: false })
    clearProxy();
  }
});

// timezone

/* global offsets */

// importScripts('/data/offsets.js');


const uo = () => new Promise(resolve => browser.storage.local.get({
  'timezone': Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT'
}, prefs => {
  console.log(prefs)
  let offset = 0;
  try {
    offset = uo.engine(prefs.timezone);
    console.log('in uo', offset)
    browser.storage.local.set({
      offset
    });
    resolve({offset, timezone: prefs.timezone});
  }
  catch (e) {
    prefs.timezone = Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT';
    prefs.offset = 0;
    browser.storage.local.set(prefs);
    console.error(e);
    resolve(prefs);
  }
  browser.action.setTitle({
    title: browser.runtime.getManifest().name + ' (' + prefs.timezone + ')'
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

browser.runtime.onInstalled.addListener(uo);
browser.runtime.onStartup.addListener(uo);

const resetTimezone = () => {
  browser.storage.local.get('userTimezone', ({ userTimezone }) => {
    browser.storage.local.set({
      timezone: userTimezone
    }, () => {
      uo();
    })
  })
};

browser.runtime.onMessage.addListener((request, sender, response) => {
  if (request.method === 'spoof-timezone') {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    browser.storage.local.set({
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
    browser.storage.local.get({
      random: false,
      timezone: Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT',
      offset: 0
    }, prefs => {
      
      if (prefs.random) {
        const key = 'random.' + sender.tab.id;
        browser.storage.session.get({
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

console.log('bg')

// browser.tabs.onRemoved.addListener(tabId => browser.storage.session.remove('random.' + tabId));

const onCommitted = ({url, tabId, frameId}) => {
  console.log('on committed react')
  const send = o => browser.scripting.executeScript({
    target: {
      tabId,
      frameIds: [frameId]
    },
    injectImmediately: true,
    func: o => {
      console.log('o', o)
      self.prefs = o;
      try {
        self.update('committed');
      }
      catch (e) {}
    },
    args: [o]
  }).catch(() => {});
  
  if (url && url.startsWith('http')) {
    browser.storage.local.get({
      random: false,
      timezone: Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT',
      offset: 0
    }, prefs => {
      if (prefs.random) {
        const key = 'random.' + tabId;
        
        browser.storage.session.get({
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
              browser.storage.session.set({
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
browser.webNavigation.onCommitted.addListener(onCommitted);

const server = async (silent = true) => {
  try {
    const r = await fetch('http://ip-api.com/json');
    const {timezone} = await r.json();
    
    if (!timezone) {
      throw Error('cannot resolve timezone for your IP address. Use options page to set manually');
    }
    
    browser.storage.local.get({
      timezone: Intl.DateTimeFormat()?.resolvedOptions().timeZone || 'Etc/GMT'
    }, prefs => {
      if (prefs.timezone !== timezone) {
        browser.storage.local.set({
          timezone
        }, () => {
          uo();
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
