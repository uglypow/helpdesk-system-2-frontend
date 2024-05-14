import { QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import TicketBoard from "./pages/TicketBoard";
import TicketTable from "./pages/TicketTable";
import { queryClient } from "./queryClient";

const App: FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="bg-blue-500 h-[50px] flex items-center justify-around px-4">
            <Link to={"/"} className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to={"/about"} className="text-white hover:text-gray-200">
              About
            </Link>
            <Link to={"/table"} className="text-white hover:text-gray-200">
              Table
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<TicketBoard />}></Route>
            <Route path="/table" element={<TicketTable />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
