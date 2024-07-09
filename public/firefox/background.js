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
var offsets = {"Pacific/Niue":{"offset":-660,"msg":{"standard":"Niue Time"}},"Pacific/Pago_Pago":{"offset":-660},"Pacific/Honolulu":{"offset":-600},"Pacific/Rarotonga":{"offset":-600},"Pacific/Tahiti":{"offset":-600,"msg":{"standard":"Tahiti Time"}},"Pacific/Marquesas":{"offset":-510,"msg":{"standard":"Marquesas Time"}},"America/Anchorage":{"offset":-540},"Pacific/Gambier":{"offset":-540,"msg":{"standard":"Gambier Time"}},"America/Los_Angeles":{"offset":-480},"America/Tijuana":{"offset":-480},"America/Vancouver":{"offset":-480},"America/Whitehorse":{"offset":-480},"Pacific/Pitcairn":{"offset":-480,"msg":{"standard":"Pitcairn Time"}},"America/Dawson_Creek":{"offset":-420},"America/Denver":{"offset":-420},"America/Edmonton":{"offset":-420},"America/Hermosillo":{"offset":-420},"America/Mazatlan":{"offset":-420},"America/Phoenix":{"offset":-420},"America/Yellowknife":{"offset":-420},"America/Belize":{"offset":-360},"America/Chicago":{"offset":-360},"America/Costa_Rica":{"offset":-360},"America/El_Salvador":{"offset":-360},"America/Guatemala":{"offset":-360},"America/Managua":{"offset":-360},"America/Mexico_City":{"offset":-360},"America/Regina":{"offset":-360},"America/Tegucigalpa":{"offset":-360},"America/Winnipeg":{"offset":-360},"Pacific/Galapagos":{"offset":-360,"msg":{"standard":"Galapagos Time"}},"America/Bogota":{"offset":-300},"America/Cancun":{"offset":-300},"America/Cayman":{"offset":-300},"America/Guayaquil":{"offset":-300},"America/Havana":{"offset":-300},"America/Iqaluit":{"offset":-300},"America/Jamaica":{"offset":-300},"America/Lima":{"offset":-300},"America/Nassau":{"offset":-300},"America/New_York":{"offset":-300},"America/Panama":{"offset":-300},"America/Port-au-Prince":{"offset":-300},"America/Rio_Branco":{"offset":-300},"America/Toronto":{"offset":-300},"Pacific/Easter":{"offset":-300,"msg":{"generic":"Easter Island Time","standard":"Easter Island Standard Time","daylight":"Easter Island Summer Time"}},"America/Caracas":{"offset":-210},"America/Asuncion":{"offset":-180},"America/Barbados":{"offset":-240},"America/Boa_Vista":{"offset":-240},"America/Campo_Grande":{"offset":-180},"America/Cuiaba":{"offset":-180},"America/Curacao":{"offset":-240},"America/Grand_Turk":{"offset":-240},"America/Guyana":{"offset":-240,"msg":{"standard":"Guyana Time"}},"America/Halifax":{"offset":-240},"America/La_Paz":{"offset":-240},"America/Manaus":{"offset":-240},"America/Martinique":{"offset":-240},"America/Port_of_Spain":{"offset":-240},"America/Porto_Velho":{"offset":-240},"America/Puerto_Rico":{"offset":-240},"America/Santo_Domingo":{"offset":-240},"America/Thule":{"offset":-240},"Atlantic/Bermuda":{"offset":-240},"America/St_Johns":{"offset":-150},"America/Araguaina":{"offset":-180},"America/Argentina/Buenos_Aires":{"offset":-180,"msg":{"generic":"Argentina Time","standard":"Argentina Standard Time","daylight":"Argentina Summer Time"}},"America/Bahia":{"offset":-180},"America/Belem":{"offset":-180},"America/Cayenne":{"offset":-180},"America/Fortaleza":{"offset":-180},"America/Godthab":{"offset":-180},"America/Maceio":{"offset":-180},"America/Miquelon":{"offset":-180},"America/Montevideo":{"offset":-180},"America/Paramaribo":{"offset":-180},"America/Recife":{"offset":-180},"America/Santiago":{"offset":-180},"America/Sao_Paulo":{"offset":-120},"Antarctica/Palmer":{"offset":-180},"Antarctica/Rothera":{"offset":-180,"msg":{"standard":"Rothera Time"}},"Atlantic/Stanley":{"offset":-180},"America/Noronha":{"offset":-120,"msg":{"generic":"Fernando de Noronha Time","standard":"Fernando de Noronha Standard Time","daylight":"Fernando de Noronha Summer Time"}},"Atlantic/South_Georgia":{"offset":-120,"msg":{"standard":"South Georgia Time"}},"America/Scoresbysund":{"offset":-60},"Atlantic/Azores":{"offset":-60,"msg":{"generic":"Azores Time","standard":"Azores Standard Time","daylight":"Azores Summer Time"}},"Atlantic/Cape_Verde":{"offset":-60,"msg":{"generic":"Cape Verde Time","standard":"Cape Verde Standard Time","daylight":"Cape Verde Summer Time"}},"Africa/Abidjan":{"offset":0},"Africa/Accra":{"offset":0},"Africa/Bissau":{"offset":0},"Africa/Casablanca":{"offset":0},"Africa/El_Aaiun":{"offset":0},"Africa/Monrovia":{"offset":0},"America/Danmarkshavn":{"offset":0},"Atlantic/Canary":{"offset":0},"Atlantic/Faroe":{"offset":0},"Atlantic/Reykjavik":{"offset":0},"Etc/GMT":{"offset":0,"msg":{"standard":"Greenwich Mean Time"}},"Europe/Dublin":{"offset":0},"Europe/Lisbon":{"offset":0},"Europe/London":{"offset":0},"Africa/Algiers":{"offset":60},"Africa/Ceuta":{"offset":60},"Africa/Lagos":{"offset":60},"Africa/Ndjamena":{"offset":60},"Africa/Tunis":{"offset":60},"Africa/Windhoek":{"offset":120},"Europe/Amsterdam":{"offset":60},"Europe/Andorra":{"offset":60},"Europe/Belgrade":{"offset":60},"Europe/Berlin":{"offset":60},"Europe/Brussels":{"offset":60},"Europe/Budapest":{"offset":60},"Europe/Copenhagen":{"offset":60},"Europe/Gibraltar":{"offset":60},"Europe/Luxembourg":{"offset":60},"Europe/Madrid":{"offset":60},"Europe/Malta":{"offset":60},"Europe/Monaco":{"offset":60},"Europe/Oslo":{"offset":60},"Europe/Paris":{"offset":60},"Europe/Prague":{"offset":60},"Europe/Rome":{"offset":60},"Europe/Stockholm":{"offset":60},"Europe/Tirane":{"offset":60},"Europe/Vienna":{"offset":60},"Europe/Warsaw":{"offset":60},"Europe/Zurich":{"offset":60},"Africa/Cairo":{"offset":120},"Africa/Johannesburg":{"offset":120},"Africa/Maputo":{"offset":120},"Africa/Tripoli":{"offset":120},"Asia/Amman":{"offset":120},"Asia/Beirut":{"offset":120},"Asia/Damascus":{"offset":120},"Asia/Gaza":{"offset":120},"Asia/Jerusalem":{"offset":120},"Asia/Nicosia":{"offset":120},"Europe/Athens":{"offset":120},"Europe/Bucharest":{"offset":120},"Europe/Chisinau":{"offset":120},"Europe/Helsinki":{"offset":120},"Europe/Istanbul":{"offset":120},"Europe/Kaliningrad":{"offset":120},"Europe/Kiev":{"offset":120},"Europe/Riga":{"offset":120},"Europe/Sofia":{"offset":120},"Europe/Tallinn":{"offset":120},"Europe/Vilnius":{"offset":120},"Africa/Khartoum":{"offset":180},"Africa/Nairobi":{"offset":180},"Antarctica/Syowa":{"offset":180,"msg":{"standard":"Syowa Time"}},"Asia/Baghdad":{"offset":180},"Asia/Qatar":{"offset":180},"Asia/Riyadh":{"offset":180},"Europe/Minsk":{"offset":180},"Europe/Moscow":{"offset":180,"msg":{"generic":"Moscow Time","standard":"Moscow Standard Time","daylight":"Moscow Summer Time"}},"Asia/Tehran":{"offset":210},"Asia/Baku":{"offset":240},"Asia/Dubai":{"offset":240},"Asia/Tbilisi":{"offset":240},"Asia/Yerevan":{"offset":240},"Europe/Samara":{"offset":240,"msg":{"generic":"Samara Time","standard":"Samara Standard Time","daylight":"Samara Summer Time"}},"Indian/Mahe":{"offset":240},"Indian/Mauritius":{"offset":240,"msg":{"generic":"Mauritius Time","standard":"Mauritius Standard Time","daylight":"Mauritius Summer Time"}},"Indian/Reunion":{"offset":240,"msg":{"standard":"Réunion Time"}},"Asia/Kabul":{"offset":270},"Antarctica/Mawson":{"offset":300,"msg":{"standard":"Mawson Time"}},"Asia/Aqtau":{"offset":300,"msg":{"generic":"Aqtau Time","standard":"Aqtau Standard Time","daylight":"Aqtau Summer Time"}},"Asia/Aqtobe":{"offset":300,"msg":{"generic":"Aqtobe Time","standard":"Aqtobe Standard Time","daylight":"Aqtobe Summer Time"}},"Asia/Ashgabat":{"offset":300},"Asia/Dushanbe":{"offset":300},"Asia/Karachi":{"offset":300},"Asia/Tashkent":{"offset":300},"Asia/Yekaterinburg":{"offset":300,"msg":{"generic":"Yekaterinburg Time","standard":"Yekaterinburg Standard Time","daylight":"Yekaterinburg Summer Time"}},"Indian/Kerguelen":{"offset":300},"Indian/Maldives":{"offset":300,"msg":{"standard":"Maldives Time"}},"Asia/Calcutta":{"offset":330},"Asia/Colombo":{"offset":330},"Asia/Katmandu":{"offset":345},"Antarctica/Vostok":{"offset":360,"msg":{"standard":"Vostok Time"}},"Asia/Almaty":{"offset":360,"msg":{"generic":"Almaty Time","standard":"Almaty Standard Time","daylight":"Almaty Summer Time"}},"Asia/Bishkek":{"offset":360},"Asia/Dhaka":{"offset":360},"Asia/Omsk":{"offset":360,"msg":{"generic":"Omsk Time","standard":"Omsk Standard Time","daylight":"Omsk Summer Time"}},"Asia/Thimphu":{"offset":360},"Indian/Chagos":{"offset":360},"Asia/Rangoon":{"offset":390},"Indian/Cocos":{"offset":390,"msg":{"standard":"Cocos Islands Time"}},"Antarctica/Davis":{"offset":420,"msg":{"standard":"Davis Time"}},"Asia/Bangkok":{"offset":420},"Asia/Hovd":{"offset":420,"msg":{"generic":"Hovd Time","standard":"Hovd Standard Time","daylight":"Hovd Summer Time"}},"Asia/Jakarta":{"offset":420},"Asia/Krasnoyarsk":{"offset":420,"msg":{"generic":"Krasnoyarsk Time","standard":"Krasnoyarsk Standard Time","daylight":"Krasnoyarsk Summer Time"}},"Asia/Saigon":{"offset":420},"Indian/Christmas":{"offset":420,"msg":{"standard":"Christmas Island Time"}},"Antarctica/Casey":{"offset":480,"msg":{"standard":"Casey Time"}},"Asia/Brunei":{"offset":480,"msg":{"standard":"Brunei Darussalam Time"}},"Asia/Choibalsan":{"offset":480,"msg":{"generic":"Choibalsan Time","standard":"Choibalsan Standard Time","daylight":"Choibalsan Summer Time"}},"Asia/Hong_Kong":{"offset":480,"msg":{"generic":"Hong Kong Time","standard":"Hong Kong Standard Time","daylight":"Hong Kong Summer Time"}},"Asia/Irkutsk":{"offset":480,"msg":{"generic":"Irkutsk Time","standard":"Irkutsk Standard Time","daylight":"Irkutsk Summer Time"}},"Asia/Kuala_Lumpur":{"offset":480},"Asia/Macau":{"offset":480,"msg":{"generic":"Macau Time","standard":"Macau Standard Time","daylight":"Macau Summer Time"}},"Asia/Makassar":{"offset":480},"Asia/Manila":{"offset":480},"Asia/Shanghai":{"offset":480},"Asia/Singapore":{"offset":480,"msg":{"standard":"Singapore Standard Time"}},"Asia/Taipei":{"offset":480,"msg":{"generic":"Taipei Time","standard":"Taipei Standard Time","daylight":"Taipei Daylight Time"}},"Asia/Ulaanbaatar":{"offset":480},"Australia/Perth":{"offset":480},"Asia/Pyongyang":{"offset":510,"msg":{"standard":"Pyongyang Time"}},"Asia/Dili":{"offset":540},"Asia/Jayapura":{"offset":540},"Asia/Seoul":{"offset":540},"Asia/Tokyo":{"offset":540},"Asia/Yakutsk":{"offset":540,"msg":{"generic":"Yakutsk Time","standard":"Yakutsk Standard Time","daylight":"Yakutsk Summer Time"}},"Pacific/Palau":{"offset":540,"msg":{"standard":"Palau Time"}},"Australia/Adelaide":{"offset":630},"Australia/Darwin":{"offset":570},"Antarctica/DumontDUrville":{"offset":600,"msg":{"standard":"Dumont-d’Urville Time"}},"Asia/Magadan":{"offset":600,"msg":{"generic":"Magadan Time","standard":"Magadan Standard Time","daylight":"Magadan Summer Time"}},"Asia/Vladivostok":{"offset":600,"msg":{"generic":"Vladivostok Time","standard":"Vladivostok Standard Time","daylight":"Vladivostok Summer Time"}},"Australia/Brisbane":{"offset":600},"Australia/Hobart":{"offset":660},"Australia/Sydney":{"offset":660},"Pacific/Chuuk":{"offset":600},"Pacific/Guam":{"offset":600,"msg":{"standard":"Guam Standard Time"}},"Pacific/Port_Moresby":{"offset":600},"Pacific/Efate":{"offset":660},"Pacific/Guadalcanal":{"offset":660},"Pacific/Kosrae":{"offset":660,"msg":{"standard":"Kosrae Time"}},"Pacific/Norfolk":{"offset":660,"msg":{"standard":"Norfolk Island Time"}},"Pacific/Noumea":{"offset":660},"Pacific/Pohnpei":{"offset":660},"Asia/Kamchatka":{"offset":720,"msg":{"generic":"Petropavlovsk-Kamchatski Time","standard":"Petropavlovsk-Kamchatski Standard Time","daylight":"Petropavlovsk-Kamchatski Summer Time"}},"Pacific/Auckland":{"offset":780},"Pacific/Fiji":{"offset":780,"msg":{"generic":"Fiji Time","standard":"Fiji Standard Time","daylight":"Fiji Summer Time"}},"Pacific/Funafuti":{"offset":720},"Pacific/Kwajalein":{"offset":720},"Pacific/Majuro":{"offset":720},"Pacific/Nauru":{"offset":720,"msg":{"standard":"Nauru Time"}},"Pacific/Tarawa":{"offset":720},"Pacific/Wake":{"offset":720,"msg":{"standard":"Wake Island Time"}},"Pacific/Wallis":{"offset":720,"msg":{"standard":"Wallis & Futuna Time"}},"Pacific/Apia":{"offset":840,"msg":{"generic":"Apia Time","standard":"Apia Standard Time","daylight":"Apia Daylight Time"}},"Pacific/Enderbury":{"offset":780},"Pacific/Fakaofo":{"offset":780},"Pacific/Tongatapu":{"offset":780},"Pacific/Kiritimati":{"offset":840}}

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
