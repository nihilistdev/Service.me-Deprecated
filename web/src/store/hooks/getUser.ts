import { UserStore } from "@store/slices/auth";
import { useStore } from "react-redux";

export const getUser = () => {
  const store = useStore<UserStore>();
  return store.getState().auth.account;
};
