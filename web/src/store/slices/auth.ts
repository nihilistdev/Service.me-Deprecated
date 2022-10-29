import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDetails } from "@store/actions/userActions";

export interface UserStore {
  auth: {
    account: User;
  };
}

export interface State {
  account?: User;
  isLoading: boolean;
}

const initialState = { account: undefined, isLoading: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccount(state: State, action: PayloadAction<User>) {
      state.account = action.payload;
    },
    getAccount(state: State) {
      state.account;
    },
    logout(state: State) {
      state.account = undefined;
    },
  },
  extraReducers: {
    [getUserDetails.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.account = undefined;
    },
    [getUserDetails.fulfilled.toString()]: (
      state: State,
      { payload }: PayloadAction<User>
    ) => {
      state.isLoading = false;
      state.account = payload;
    },
    [getUserDetails.rejected.toString()]: (state: State) => {
      state.isLoading = false;
    },
  },
});
