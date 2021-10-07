import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SidebarDetailProvider } from "./context/sidebar";
import { AuthProvider } from "./context/auth";

import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarDetailProvider>
          <App />
        </SidebarDetailProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
