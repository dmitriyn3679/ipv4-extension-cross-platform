import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MenuItem } from "../MenuItem";
import { selectTranslations } from "../../../features/translation";
import { ApiService } from "../../../api/ApiService";
import { errorToast } from "../../../utils/helpers/customToast";
import "./MenuList.scss";

export const MenuList = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "";
  const { homePage, proxies, settings, bug } = useSelector(selectTranslations);
  
  const [selectedAgent, setSelectedAgent] = useState("");
  const { selectedProxy } = useSelector((state) => state.content);
  
  const userAgents = {
    Default: "",
    Chrome: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    Firefox: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55.0",
    Safari: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5"
  };
  
  const fetchTest = async () => {
    const res = await fetch("https://036c-159-224-64-227.ngrok-free.app/browser-addon/v1/test/test");
    console.log(res);
  };
  
  const getStorage = () => {
    chrome.storage.local.get((storage) => {
      console.log(storage)
    })
  };
  
  const clearStorage = () => {
    chrome.storage.local.clear();
  };
  
  const updateTimezone = () => {
    chrome.runtime.sendMessage({
      method: 'spoof-timezone'
    });
  };
  
  const resetTimezone = () => {
    chrome.runtime.sendMessage({
      method: 'reset-timezone'
    })
  };
  
  const getUserTimezone = () => {
    chrome.storage.local.get("userTimezone", (storage) => {
      chrome.storage.local.set({
        timezone: storage.userTimezone,
        update: false
      }, () => {
        chrome.runtime.sendMessage({
          method: 'update-offset'
        });
      })
    })
  }
  
  const clearHeaders = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
    });
  };
  
  const clearAgent = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [2]
    });
  };
  
  const getRules = () => {
    chrome.declarativeNetRequest.getDynamicRules({}, (r) => console.log(r));
  }
  
  const clearLang = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1]
    });
  };
  
  const setUserAgent = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules
    });
  };
  
  // function clearUserAgent() {
  //   console.log("clear")
  //   chrome.declarativeNetRequest.getDynamicRules((previousRules) => {
  //     const previousRuleIds = previousRules.map((rule) => rule.id);
  //     chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: previousRuleIds });
  //   });
  // }
  
  // function setUserAgent() {
  //   if (!selectedAgent) {
  //     alert("default");
  //     clearUserAgent();
  //     return;
  //   }
  //
  //   clearUserAgent()
  //   const newRules = [];
  //   alert(selectedAgent)
  //   newRules.push({
  //     id: 1,
  //     priority: 1,
  //     action: {
  //       type: "modifyHeaders",
  //       requestHeaders: [
  //         { header: "User-Agent", operation: "set", value: selectedAgent }
  //       ]
  //     },
  //     condition: { urlFilter: "*", resourceTypes: ["main_frame"] }
  //   });
  //   chrome.declarativeNetRequest.updateDynamicRules({ addRules: newRules });
  // }

  const menuItems = [
    {
      title: homePage.label,
      icon: "home",
      link: ""
    },
    {
      title: proxies.label,
      icon: "list",
      link: "proxies"
    },
    {
      title: settings.label,
      icon: "settings",
      link: "settings"
    },
    {
      title: bug.label,
      icon: "bug",
      link: "bugs"
    },
  ];
  
  const checkIp = async () => {
    try {
      const res = await ApiService.checkProxy({ ipAddressId: selectedProxy?.id });
      console.log(res)
    } catch {
      errorToast("Something went wrong")
    }
  };

  return (
    <ul className="menu-list">
      {menuItems.map(({ title, icon, link }) => (
        <MenuItem
          key={title}
          title={title}
          icon={icon}
          link={link}
          isActive={link === currentTab}
        />
      ))}
      {/*<Link to="auth">Auth</Link>*/}
      {/*<button onClick={() => setLang("en")}>en</button>*/}
      {/*<button onClick={() => setLang("ru")}>ru</button>*/}
      {/*<button onClick={setUserAgent}>set headers</button>*/}
      {/*<button onClick={setUserAgent}>set headers2</button>*/}
      {/*<button onClick={getRules}>get rules</button>*/}
      {/*<button onClick={clearHeaders}>clear headers</button>*/}
      {/*<button onClick={clearAgent}>clear agent</button>*/}
      {/*<button onClick={clearLang}>clear lang</button>*/}
      {/*/!*<button onClick={send}>send</button>*!/*/}
      {/*<button onClick={getStorage}>get storage</button>*/}
      {/*<button onClick={clearStorage}>clear storage</button>*/}
      {/*<button onClick={updateTimezone}>update</button>*/}
      {/*<button onClick={resetTimezone}>reset</button>*/}
      {/*<button onClick={getUserTimezone}>get user timezone</button>*/}
      {/*<button onClick={fetchTest}>fetch test</button>*/}
      {/*<button onClick={checkIp}>check ip</button>*/}
    </ul>
  );
};
