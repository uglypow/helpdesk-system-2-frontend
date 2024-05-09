import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { queryClient } from "./queryClient";

const root = ReactDom.createRoot(document.querySelector("#app")!);
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);
