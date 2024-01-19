import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Checkbox } from "../../../../../../../../components/ui/Checkbox";
import { getSlicedText } from "../../../../../../../../utils/helpers/getSlicedText";
import { Toggle } from "../../../../../../../../components/ui/Toggle";
import { ApiService } from "../../../../../../../../api/ApiService";
import { setWebsites } from "../../../../../../../../features/content";
import { errorToast } from "../../../../../../../../utils/helpers/customToast";
import { Loading } from "../../../../../../../../components/ui/Loading/Loading";
import { resetProxyParams } from "../../../../../../../../utils/helpers/resetProxyParams";
import { enableProxy } from "../../../../../../../../utils/helpers/enableProxy";
import { updateTimezone } from "../../../../../../../../utils/helpers/updateTimezone";
import { getLangHeader } from "../../../../../../../../utils/helpers/getLangHeader";
import { updateDynamicRule } from "../../../../../../../../utils/helpers/updateDynamicRule";
import { LANG_RULE_ID, USER_AGENT_RULE_ID } from "../../../../../../../../utils/helpers/ruleIds";

export const TableRow = ({ id, site, enabled, selectedSites, selectHandler }) => {
  const {
    websites: { data: websites, dataCount },
    selectedProxy,
    isProxyEnabled
  } = useSelector((state) => state.content)
  const {
    isSpoofTimezoneActive,
    isSpoofLangActive,
    selectedUserAgentParams,
    ignoredHosts
  } = useSelector((state) => state.settings);
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const updateSites = (data) => {
    dispatch(setWebsites((websites.map((website) => {
      if (website.id === data.id) {
        return { ...website, enabled: data.enabled }
      }
      return website
    }))))
  };
  
  const setProxySettings = (hosts) => {
    if (isSpoofTimezoneActive) {
      updateTimezone();
    }
    
    if (isSpoofLangActive) {
      const langHeader = getLangHeader(selectedProxy);
      updateDynamicRule(LANG_RULE_ID, {
        "Accept-Language": langHeader || "en;q=1.0"
      }, hosts)
    }
    
    if (selectedUserAgentParams) {
      updateDynamicRule(USER_AGENT_RULE_ID, selectedUserAgentParams.headers, hosts);
    }
  };
  
  const restartConfig = (rowEnabled, siteUrl) => {
    if (!isProxyEnabled) {
      return;
    }
    
    let hosts = ["stage.proxy-ipv4.com", ...ignoredHosts];
    const currentDomain = siteUrl.split('/')[2]
    
    if (rowEnabled) {
      hosts = hosts.filter((domain) => domain !== currentDomain);
    } else {
      hosts.push(currentDomain);
    }
    
    enableProxy(
      selectedProxy?.innerIp,
      selectedProxy?.proxyPort,
      selectedProxy?.authLogin,
      selectedProxy?.authPassword,
      hosts,
      () => setProxySettings(hosts)
    )
  };
  
  const handleWebsiteToggle = async (rowId, rowEnabled, siteUrl) => {
    setIsLoading(true);
    try {
      const { data, status } = await ApiService
        .editWebsite({ id: rowId, enabled: !rowEnabled, site: siteUrl })
      
      if (status !== 200) {
        throw new Error();
      }
  
      updateSites(data);
      restartConfig(rowEnabled, siteUrl);
    } catch (e) {
      errorToast("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <tr className="websites-table__row">
      <td className="websites-table__data">
        <Checkbox
          checked={selectedSites.includes(id)}
          onChange={() => selectHandler(id)}
        />
      </td>
      <td className="websites-table__data websites-table__url">
        {getSlicedText(30, site)}
      </td>
      <td className="websites-table__data websites-table__toggle">
        <Toggle checked={enabled} handleSwitch={() => handleWebsiteToggle(id, enabled, site)} />
      </td>
      {isLoading && (
        <Loading tableRow absolute roller={{ transform: "scale(0.4) translateY(-42px)" }} />
      )}
    </tr>
  );
};
