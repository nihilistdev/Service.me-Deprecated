import { userInfo } from "@api/user/userInfo";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await userInfo();
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
