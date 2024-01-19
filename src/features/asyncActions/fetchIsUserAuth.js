import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../api/ApiService";

export const fetchIsUserAuth = createAsyncThunk("auth/fetchIsUserAuth", async (_, { rejectWithValue }) => {
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
