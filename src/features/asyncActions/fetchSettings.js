import {createAsyncThunk} from "@reduxjs/toolkit";

const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get({
      isSpoofTimezoneActive: false,
      isSpoofLangActive: false,
      selectedUserAgentParams: null
    }, (res) => {
      resolve(res)
    })
  })
};

export const fetchSettings = createAsyncThunk("settings/fetchSettings", async (_, { rejectWithValue }) => {
  try {
    return await getSettings();
  } catch (e) {
    return rejectWithValue(false);
  }
})
