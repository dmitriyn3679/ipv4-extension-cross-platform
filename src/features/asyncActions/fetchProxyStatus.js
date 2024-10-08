import {createAsyncThunk} from "@reduxjs/toolkit";
import {currentBrowser} from "../../utils/currentBrowser";

const getProxyStatus = async (config) => {
  const proxySettings = await chrome.storage.local.get('isProxyConfigEnabled')
  
  switch (currentBrowser) {
    case "chrome":
      return config.value.mode === "pac_script" && proxySettings?.isProxyConfigEnabled;
    case "firefox":
      return config.value.proxyType === "autoConfig" && proxySettings?.isProxyConfigEnabled;
    default:
      return config.value.mode === "pac_script" && proxySettings?.isProxyConfigEnabled;
  }
};

const checkProxy = () => {
  return new Promise((resolve) => {
    chrome.proxy.settings.get(
      {},
      (config) => {
        const isProxyEnabled = getProxyStatus(config);
        resolve(isProxyEnabled);
      }
    );
  })
};

export const fetchProxyStatus = createAsyncThunk("content/fetchProxyStatus", async (_, { rejectWithValue }) => {
  try {
    return await checkProxy();
  } catch (e) {
    return rejectWithValue(false);
  }
})
