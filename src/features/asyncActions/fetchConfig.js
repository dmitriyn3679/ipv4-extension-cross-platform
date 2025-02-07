import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../api/ApiService";

export const fetchConfig = createAsyncThunk("config/fetchConfig", async (_, { rejectWithValue }) => {
  try {
    const { data } = await ApiService.getConfig();
    return data;
  } catch (e) {
    return rejectWithValue(false);
  }
})
