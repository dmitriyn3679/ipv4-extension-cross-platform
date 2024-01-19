import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuList } from "../../components/common/MenuList";
import { Settings } from "./components/Settings";
import { Home } from "./components/Home/Home";
import { Proxies } from "./components/Proxies";
import { BugReport } from "./components/BugReport";
import { fetchProxyStatus } from "../../features/asyncActions/fetchProxyStatus";
import { Loading } from "../../components/ui/Loading/Loading";
import { fetchSelectedProxy } from "../../features/asyncActions/fetchSelectedProxy";
import { fetchSettings } from "../../features/asyncActions/fetchSettings";
import "./DashboardPage.scss";

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tab = searchParams.get("tab");

  const { isAuth, isLoaded } = useSelector((state) => state.auth)
  const { isLoaded: contentIsLoaded } = useSelector((state) => state.content)

  useEffect(() => {
    if (isLoaded && !isAuth) {
      navigate("/auth")
    } else {
      dispatch(fetchProxyStatus())
      dispatch(fetchSelectedProxy())
      dispatch(fetchSettings())
    }
  }, [])

  return (
    <section className="dashboard">
      <div className="dashboard__menu">
        <MenuList />
      </div>
      <div className="dashboard__tab-content">
        <div className="dashboard__container">
          { !contentIsLoaded ? (
            <Loading mainLoader absolute />
          ) : (
            <>
              { !tab && <Home /> }
              { tab === "proxies" && <Proxies /> }
              { tab === "settings" && <Settings /> }
              { tab === "bugs" && <BugReport /> }
            </>
          )}
        </div>
      </div>
      
    </section>
  );
}
