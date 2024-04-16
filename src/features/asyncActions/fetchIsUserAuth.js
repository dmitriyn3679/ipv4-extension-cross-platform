import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../api/ApiService";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchIsUserAuth = createAsyncThunk("auth/fetchIsUserAuth", async (_, { rejectWithValue }) => {
  await delay(50);
  
  try {
    const response = await ApiService.checkAuth();
    
    if (response.status !== 200) {
      throw response;
    }
    return response.data;
  } catch (err) {
    return rejectWithValue(false);
  }
});
