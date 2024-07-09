import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchIsUserAuth} from "../features/asyncActions/fetchIsUserAuth";
import {Loading} from "../components/ui/Loading/Loading";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {tokenName} from "../utils/helpers/browserIdToken";
import {getScreenInfo} from "../utils/helpers/getScreenInfo";
import {ApiService} from "../api/ApiService";
import {errorToast} from "../utils/helpers/customToast";
import { UAParser } from 'ua-parser-js';
import "./AppLayout.scss";

const checkBrowserId = async () => {
  const browserIdToken = localStorage.getItem(tokenName);
  
  if (!browserIdToken) {
    const { screen } = getScreenInfo();
    const uaData = new UAParser(window.navigator.userAgent);
    const browserInfo = {
      screen,
      uaData: uaData?.getResult()
    };
    
    try {
      const { data, status } = await ApiService.sendBrowserToken(browserInfo);
      
      if (status !== 200) {
        throw new Error();
      }
      
      localStorage.setItem(tokenName, data);
    } catch (e) {
      errorToast("Something went wrong")
    }
  }
};

function AppLayout() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((state) => state.auth)
  
  useEffect(() => {
    checkBrowserId();
    dispatch(fetchIsUserAuth());
  }, []);
  
  return (
    <div className="app">
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
      {/*{ !isLoaded ? (*/}
      {/*  <Loading absolute mainLoader />*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <Header />*/}
      {/*    <main>*/}
      {/*      <Outlet />*/}
      {/*    </main>*/}
      {/*  </>*/}
      {/*)}*/}
      <ToastContainer
        className="custom-toast"
        position="top-right"
        autoClose={8000}
        newestOnTop
        closeOnClick={false}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        limit={3}
      />
    </div>
  );
}

export default AppLayout;
