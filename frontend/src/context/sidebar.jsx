import { createContext, useState } from "react";

export const SidebarDetailContext = createContext({});

export const SidebarDetailProvider = ({ children }) => {
  const [sidebarDetails, setSidebarDetails] = useState(null);

  return (
    <SidebarDetailContext.Provider
      value={{ sidebarDetails, setSidebarDetails }}
    >
      {children}
    </SidebarDetailContext.Provider>
  );
};
