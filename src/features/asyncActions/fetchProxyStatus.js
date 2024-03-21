import {createAsyncThunk} from "@reduxjs/toolkit";
import {currentBrowser} from "../../utils/currentBrowser";

const getProxyStatus = (config) => {
  switch (currentBrowser) {
    case "chrome":
      console.log(config)
      return config.value.mode === "pac_script";
    case "firefox":
      return config.value.proxyType === "autoConfig";
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
