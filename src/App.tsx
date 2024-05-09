import { QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import TicketBoard from "./pages/TicketBoard";
import { queryClient } from "./queryClient";

const App: FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="bg-blue-500 w-[150px] h-screen flex flex-col justify-center">
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
          </div>
          <Routes>
            <Route path="/" element={<TicketBoard />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
