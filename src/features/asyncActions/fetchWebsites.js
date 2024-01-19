import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../api/ApiService";

export const fetchWebsites = createAsyncThunk("content/fetchWebsites", async ({ page, size }, rejectWithValue) => {
  try {
    // const { data: { content, totalElements }, status } = await ApiService.getWebsites();
    const response = await ApiService.getWebsites({ page, size });
    
    if (response.status !== 200) {
       throw response;
    }
    
    return response.data;
  } catch (e) {
    return rejectWithValue(false);
  }
})
