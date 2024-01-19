import {createSlice} from "@reduxjs/toolkit";
import {fetchIsUserAuth} from "./asyncActions/fetchIsUserAuth";
import {resetProxyParams} from "../utils/helpers/resetProxyParams";

const initialState = {
  isAuth: false,
  isLoaded: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthUser: (state, action) => {
      state.isAuth = action.payload.isAuth
      state.isLoaded = action.payload.isLoaded
    }
  },
  extraReducers: {
    [fetchIsUserAuth.pending]: (state) => {
      state.isLoaded = false;
    },
    [fetchIsUserAuth.fulfilled]: (state, action) => {
      if (!action.payload) {
        resetProxyParams();
      }
      
      state.isAuth = action.payload;
      state.isLoaded = true;
    },
    [fetchIsUserAuth.rejected]: (state) => {
      state.isLoaded = true;
    },
  }
});

export const { setIsAuthUser } = authSlice.actions;
export default authSlice.reducer;
