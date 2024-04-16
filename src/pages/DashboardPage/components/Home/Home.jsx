import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "../../../../components/ui/TabTitle";
import { MainToggle } from "../../../../components/ui/MainToggle";
import { SelectedProxy } from "./components/SelectedProxy";
import { useTranslation } from "../../../../hooks/useTranslation";
import { ApiService } from "../../../../api/ApiService";
import { errorToast } from "../../../../utils/helpers/customToast";
import { Loading } from "../../../../components/ui/Loading/Loading";
import { setIgnoredHosts } from "../../../../features/settings";
import { IconSvg } from "../../../../utils/iconSvg";
import "./Home.scss";

export const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { homePage: { title, authSupport } } = useTranslation();
  
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
    (async () => {
      try {
        const { data: { content }, status } = await ApiService.getWebsites({ pageable: false });
        
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
  }, [])
  
  const isUnavailableType = selectedProxy?.protocol === "SOCKS"
    && selectedProxy?.authType === "login";
  
  return (
    <div className="home">
      { !isLoaded ? (
        <Loading absolute />
      ) : (
        <>
          <div className="home__title">
            <TabTitle title={title} />
          </div>
          <div className="home__container dashboard-content-container">
            <div className="home__ip-toggle">
              <MainToggle isUnavailableType={isUnavailableType} />
            </div>
            <SelectedProxy />
          </div>
          {isUnavailableType && (
            <div className="home__unavailable-type">
              <div className="home__info-icon">
                <IconSvg tag="info" />
              </div>
              <div>{authSupport}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
