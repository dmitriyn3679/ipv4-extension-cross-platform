import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../../../../../components/ui/Toggle";
import { LANG_RULE_ID } from "../../../../../../utils/helpers/ruleIds";
import { updateDynamicRule } from "../../../../../../utils/helpers/updateDynamicRule";
import { clearDynamicRules } from "../../../../../../utils/helpers/clearDynamicRules";
import { setLangRule } from "../../../../../../features/settings";
import { getLangHeader } from "../../../../../../utils/helpers/getLangHeader";
import "./Parameter.scss";

export const Parameter = ({ label, info }) => {
  const { selectedProxy } = useSelector((state) => state.content);
  const { isProxyEnabled } = useSelector((state) => state.content)
  const { isSpoofLangActive } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  
  // const setLangRules = () => {
  //   if (isLangChanged) {
  //     clearDynamicRules([LANG_RULE_ID]);
  //     setIsLangChanged(false);
  //
  //     return;
  //   }
  //
  //   const langHeader = getLangHeader(selectedProxy);
  //
  //   updateDynamicRule(LANG_RULE_ID, {
  //     "Accept-Language": langHeader || "en;q=1.0"
  //   })
  //   setIsLangChanged(true);
  // };
  
  const handleLangRules = () => {
    dispatch(setLangRule(!isSpoofLangActive))
    
    if (isProxyEnabled && !isSpoofLangActive) {
      const langHeader = getLangHeader(selectedProxy);
      updateDynamicRule(LANG_RULE_ID, {
        "Accept-Language": langHeader || "en;q=1.0"
      })
    }
    
    if (isSpoofLangActive) {
      clearDynamicRules([LANG_RULE_ID]);
    }
  };
  
  return (
    <div className="parameter">
      <span className="parameter__label">{label}</span>
      <div className="parameter__container">
        <p className="parameter__info">{info}</p>
        <Toggle checked={isSpoofLangActive} handleSwitch={handleLangRules} />
      </div>
    </div>
  );
};
