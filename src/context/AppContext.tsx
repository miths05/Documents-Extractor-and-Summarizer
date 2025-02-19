import React, { createContext, useReducer, ReactNode } from "react";

const initialState = {
  message: "Hello, React!",
  activeSection: "home",
};

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "CHANGE_KEY":
      return {
        ...state,
        activeSection: action.payload,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<any>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
