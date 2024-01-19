import {clearProxy} from "./clearProxy";
import {resetTimezone} from "./resetTimezone";
import {clearDynamicRules} from "./clearDynamicRules";
import {LANG_RULE_ID, USER_AGENT_RULE_ID} from "./ruleIds";

export const resetProxyParams = () => {
  clearProxy();
  resetTimezone();
  clearDynamicRules([USER_AGENT_RULE_ID, LANG_RULE_ID]);
};
