import { createContext, useContext, useEffect, useState } from "react";

// CONTEXT
export const AppContext = createContext();

// CUSTOM HOOK 
export const useAppContext = () => {
  return useContext(AppContext);
};

// PROVIDER
export const AppContextProvider = ({ children }) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
