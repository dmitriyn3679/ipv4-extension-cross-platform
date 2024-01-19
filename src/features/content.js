import {createSlice} from "@reduxjs/toolkit";
import {fetchProxyStatus} from "./asyncActions/fetchProxyStatus";
import {fetchWebsites} from "./asyncActions/fetchWebsites";
import {fetchSelectedProxy} from "./asyncActions/fetchSelectedProxy";
import {resetProxyParams} from "../utils/helpers/resetProxyParams";

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    selectedProxy: null,
    isProxyEnabled: false,
    isLoaded: false,
    websites: {
      isLoaded: false,
      data: [],
      dataCount: null
    }
  },
  reducers: {
    setSelectedProxy: (state, action) => {
      chrome.storage.local.set({ selectedProxy: action.payload })
      state.selectedProxy = action.payload
      state.isProxyEnabled = false;
    },
    setProxyStatus: (state, action) => {
      state.isProxyEnabled = action.payload
    },
    setWebsites: (state, action) => {
      state.websites.data = action.payload;
    },
    addWebsite: (state, action) => {
      state.websites.data.push(action.payload)
      state.websites.dataCount = state.websites.dataCount + 1;
    },
    removeWebsite: (state, action) => {
      state.websites.data = state.websites.data
        .filter((site) => !action.payload.includes(site.id));
      state.websites.dataCount = state.websites.dataCount - action.payload.length
    },
  },
  extraReducers: {
    [fetchProxyStatus.pending]: (state) => {
      state.isLoaded = false;
    },
    [fetchProxyStatus.fulfilled]: (state, action) => {
      state.isProxyEnabled = action.payload;
      state.isLoaded = true;
    },
    [fetchProxyStatus.rejected]: (state) => {
      state.isLoaded = true;
    },
    [fetchWebsites.pending]: (state) => {
      state.websites.isLoaded = false;
    },
    [fetchWebsites.fulfilled]: (state, action) => {
      state.websites.isLoaded = true;
      state.websites.data = action.payload.content
      state.websites.dataCount = action.payload.totalElements
    },
    [fetchWebsites.rejected]: (state) => {
      state.websites.isLoaded = true;
    },
    [fetchSelectedProxy.fulfilled]: (state, action) => {
      state.selectedProxy = action.payload;
    }
  }
})

export const { setProxyStatus, setWebsites, addWebsite, removeWebsite, setSelectedProxy } = contentSlice.actions;
export default contentSlice.reducer;

