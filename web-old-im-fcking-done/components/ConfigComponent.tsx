import React, { useReducer, useContext, useEffect } from "react";

// create the context
export const AuthStateContext = React.createContext({});

const initialState: User = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  username: "",
};

const reducer = (
  state: any,
  action: {
    type: "setAuthDetails" | "removeAuthDetails";
    payload: {
      id: any;
      first_name: any;
      last_name: any;
      email: any;
      username: any;
    };
  }
) => {
  switch (action.type) {
    case "setAuthDetails":
      return {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        username: action.payload.username,
      };
    case "removeAuthDetails":
      return {
        id: initialState.id,
        first_name: initialState.first_name,
        last_name: initialState.last_name,
        email: initialState.email,
        username: initialState.username,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthProvider = ({ children }: any) => {
  let localState = null;
  if (typeof localStorage !== "undefined" && localStorage.getItem("userInfo")) {
    localState = JSON.parse(localStorage.getItem("userInfo") || "");
  }
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  if (typeof localStorage !== "undefined") {
    useEffect(() => {
      localStorage.setItem("userInfo", JSON.stringify(state));
    }, [state]);
  }
  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuth: any = () => useContext(AuthStateContext);
