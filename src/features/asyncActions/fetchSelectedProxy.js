import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../api/ApiService";

const getSelectedProxy = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("selectedProxy", ({ selectedProxy }) => {
      resolve(selectedProxy);
    });
  })
};

const checkSelectedProxy = async (savedProxyId) => {
  try {
    const { data, status } = await ApiService.checkSelectedProxy({ ipAddressId: savedProxyId })
    if (status !== 200 ) {
      throw new Error();
    }
    
    return data;
  } catch (e) {
    console.log(e)
  }
};

export const fetchSelectedProxy = createAsyncThunk("content/fetchSelectedProxy", async (_, { rejectWithValue }) => {
  try {
    const savedProxy = await getSelectedProxy();
    if (!savedProxy) {
      return;
    }
  
    const proxyIsActive = await checkSelectedProxy(savedProxy.id);
  
    if (proxyIsActive) {
      return savedProxy;
    }
  } catch (e) {
    return rejectWithValue(false);
  }
})
