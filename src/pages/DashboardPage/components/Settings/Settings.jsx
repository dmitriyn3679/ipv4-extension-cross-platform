import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fingerprint } from "./components/Fingerprint";
import { Parameter } from "./components/Parameter";
import { Button } from "../../../../components/ui/Button";
import { selectTranslations } from "../../../../features/translation";
import { WebsitesTable } from "./components/WebsitesTable";
import { Timezone } from "./components/Timezone";
import { fetchSettings } from "../../../../features/asyncActions/fetchSettings";
import "./Settings.scss";

export const Settings = () => {
  const {
    settings: {
      title,
      timezoneLabel,
      timezoneInfo,
      languageLabel,
      languageInfo,
      fingerprintLabel,
      saveButton,
      websites,
    }
  } = useSelector(selectTranslations);
  const { ignoredHosts } = useSelector((state) => state.settings);
  
  const hosts = ["stage.proxy-ipv4.com", "proxy-ipv4.com", ...ignoredHosts];

  return (
    <div className="settings">
      <div className="settings__title">{title}</div>
      <div className="settings__content dashboard-content-container">
        <div className="settings__section">
          <div className="settings__label">{fingerprintLabel}</div>
          <div className="settings__fingerprint">
            <Fingerprint ignoredHosts={hosts} />
          </div>
        </div>
        <div className="settings__param">
          <Parameter
            label={languageLabel}
            info={languageInfo}
            ignoredHosts={hosts}
          />
        </div>
        <div>
          <Timezone
            label={timezoneLabel}
            info={timezoneInfo}
          />
        </div>
        {/*<div className="settings__button">*/}
        {/*  <Button*/}
        {/*    kind="main"*/}
        {/*    text={saveButton}*/}
        {/*    customize={{ marginTop: 20 }}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      <div className="settings__title">{websites}</div>
      <WebsitesTable />
    </div>
  );
};
