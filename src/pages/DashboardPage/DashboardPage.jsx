import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuList } from "../../components/common/MenuList";
import { Settings } from "./components/Settings";
import { Home } from "./components/Home/Home";
import { Proxies } from "./components/Proxies";
import { BugReport } from "./components/BugReport";
import { fetchProxyStatus } from "../../features/asyncActions/fetchProxyStatus";
import { fetchSelectedProxy } from "../../features/asyncActions/fetchSelectedProxy";
import { fetchSettings } from "../../features/asyncActions/fetchSettings";
import "./DashboardPage.scss";

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tab = searchParams.get("tab");

  const { isAuth, isLoaded: isAuthDataLoaded } = useSelector((state) => state.auth)
  const { isProxyStatusLoaded, isSelectedProxyLoaded } = useSelector((state) => state.content)
  const { isSettingsLoaded } = useSelector((state) => state.settings)
  
  useEffect(() => {
    if (!isAuthDataLoaded) {
      return;
    }
    
    if (!isAuth) {
      navigate("/auth")
      return;
    }
  
    dispatch(fetchProxyStatus())
    dispatch(fetchSelectedProxy())
    dispatch(fetchSettings())
  }, [isAuthDataLoaded])
  
  const isDataLoaded = isProxyStatusLoaded && isSelectedProxyLoaded && isSettingsLoaded;
  
  return (
    <section className="dashboard">
      <div className="dashboard__menu">
        <MenuList />
      </div>
      <div className="dashboard__tab-content">
        <div className="dashboard__container">
          <>
            { !tab && <Home isDataLoaded={isDataLoaded && isAuthDataLoaded} /> }
            { tab === "proxies" && <Proxies /> }
            { tab === "settings" && <Settings /> }
            { tab === "bugs" && <BugReport /> }
          </>
          {/*{ !isDataLoaded || !isAuthDataLoaded ? (*/}
          {/*  // <Loading mainLoader absolute />*/}
          {/*  <HomeLoader />*/}
          {/*) : (*/}
          {/*  */}
          {/*)}*/}
        </div>
      </div>
      
    </section>
  );
}
