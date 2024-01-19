import {createSlice} from "@reduxjs/toolkit";
import {fetchSettings} from "./asyncActions/fetchSettings";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isSpoofLangActive: false,
    isSpoofUaActive: false,
    isSpoofTimezoneActive: false,
    selectedUserAgentParams: null,
    isLoaded: false,
    ignoredHosts: []
  },
  reducers: {
    setSelectedUserAgent: (state, action) => {
      chrome.storage.local.set({ selectedUserAgentParams: action.payload })
      state.selectedUserAgentParams = action.payload;
    },
    setTimezone: (state, action) => {
      chrome.storage.local.set({ isSpoofTimezoneActive: action.payload })
      state.isSpoofTimezoneActive = action.payload
    },
    setLangRule: (state, action) => {
      chrome.storage.local.set({ isSpoofLangActive: action.payload })
      state.isSpoofLangActive = action.payload;
    },
    setIgnoredHosts: (state, action) => {
      state.ignoredHosts = action.payload;
    },
  },
  extraReducers: {
    [fetchSettings.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.isSpoofTimezoneActive = action.payload.isSpoofTimezoneActive;
      state.isSpoofLangActive = action.payload.isSpoofLangActive;
      state.selectedUserAgentParams = action.payload.selectedUserAgentParams;
    }
  }
})

export const { setSelectedUserAgent, setTimezone, setLangRule, setIgnoredHosts } = settingsSlice.actions;
export default settingsSlice.reducer;

