import * as React from "react";
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  ReactReduxContextValue,
} from "react-redux";
import { AnyAction } from "redux";

export type AuthStateType = {
  user?: User;
};

export const AuthContext = React.createContext<
  ReactReduxContextValue<unknown, AnyAction>
>({} as ReactReduxContextValue);

export const useStore = createStoreHook(AuthContext);
export const useDispatch = createDispatchHook(AuthContext);
export const useSelector = createSelectorHook(AuthContext);
