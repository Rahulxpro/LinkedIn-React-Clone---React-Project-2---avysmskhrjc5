// import React from 'react'

import { ReactNode, createContext, useContext, useState } from "react";

interface DarkModeContextValues {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onDarkMode: () => void;
}
const DarkModeContext = createContext<DarkModeContextValues>({
  darkMode: false,
  setDarkMode: () => {},
  onDarkMode: () => {},
});
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const onDarkMode = () => {
    console.log("onDarkMode");
    setDarkMode((prev) => !prev);
  };
  const value = { darkMode, setDarkMode, onDarkMode };
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
