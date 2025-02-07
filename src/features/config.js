import {createSlice} from "@reduxjs/toolkit";
import {fetchConfig} from "./asyncActions/fetchConfig";

export const configSlice = createSlice({
  name: "content",
  initialState: {
    isConfigLoaded: false,
    captcha: {
      token: "",
      isEnabled: false
    }
  },
  reducers: {},
  extraReducers: {
    [fetchConfig.pending]: (state) => {
      state.isConfigLoaded = false;
    },
    [fetchConfig.fulfilled]: (state, action) => {
      state.captcha.token = action.payload.cloud.token;
      state.captcha.isEnabled = action.payload.cloud.isEnabled;
    },
    [fetchConfig.rejected]: (state) => {
      state.isConfigLoaded = true;
    }
  }
})

export default configSlice.reducer;

