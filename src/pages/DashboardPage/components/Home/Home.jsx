import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentShimmer from "react-content-shimmer";
import { TabTitle } from "../../../../components/ui/TabTitle";
import { MainToggle } from "../../../../components/ui/MainToggle";
import { SelectedProxy } from "./components/SelectedProxy";
import { useTranslation } from "../../../../hooks/useTranslation";
import { ApiService } from "../../../../api/ApiService";
import { errorToast } from "../../../../utils/helpers/customToast";
import { setIgnoredHosts } from "../../../../features/settings";
import { IconSvg } from "../../../../utils/iconSvg";
import "./Home.scss";
import { currentBrowser } from "../../../../utils/currentBrowser";

const customColorFore = "#555555";
const customColorBack = "#333333";

export const Home = ({ isDataLoaded }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { homePage: { title, authSupport, chooseProxy } } = useTranslation();
  
  const dispatch = useDispatch();
  const { ignoredHosts } = useSelector((state) => state.settings);
  const { selectedProxy } = useSelector((state) => state.content);

  const getHosts = (sites) => {
    if (!sites.length) {
      return [];
    }
    
    return sites
      .filter((siteData) => siteData.enabled)
      .map((siteData) => siteData.site.split('/')[2])
  };
  
  useEffect(() => {
    if (!isDataLoaded) {
      return;
    }
    
    (async () => {
      try {
        const { data: { content }, status } = await ApiService.getWebsites({ pageable: false });
        
        if (status === 302 || status === 301) {
          return;
        }
        
        if (status !== 200) {
          throw new Error();
        }
        
        const hosts = getHosts(content) || [];
        dispatch(setIgnoredHosts(hosts));
      } catch (e) {
        errorToast("Something went wrong");
      } finally {
        setIsLoaded(true);
      }
    })()
  }, [isDataLoaded])
  
  const isUnavailableType = selectedProxy?.protocol === "SOCKS"
    && selectedProxy?.authType === "login";
  
  const getBrowserName = () => {
    const browsers = {
      chrome: "Google Chrome",
      firefox: "Mozilla Firefox",
      opera: "Opera"
    };
    
    return browsers[currentBrowser] || "";
  };
  
  return (
    <div className="home">
      <div className="home__title">
        <TabTitle title={title} />
      </div>
      <div className="home__container dashboard-content-container">
        <>
          <div className="home__ip-toggle">
            {!isDataLoaded ? (
              <ContentShimmer size={{ width: 146, height: 69 }} rounded="100px" foreground={customColorFore} background={customColorBack} />
            ) : (
              <MainToggle isUnavailableType={isUnavailableType} />
            )}
          </div>
          {!isDataLoaded ? (
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <ContentShimmer size={{ width: 28, height: 19 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
                  <ContentShimmer size={{ width: 64, height: 16 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
                </div>
                <ContentShimmer size={{ width: 128.6, height: 16 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
              </div>
              <div className="home__show-more"><IconSvg tag="arrow" /></div>
            </div>
          ) : (
            <SelectedProxy />
          )}
        </>
      </div>
      {isUnavailableType && (
        <div className="home__unavailable-type">
          <div className="home__info-icon">
            <IconSvg tag="info" />
          </div>
          <div>{authSupport.replace("_", getBrowserName())}</div>
        </div>
      )}
    </div>
  );
};
