import { Button } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import TicketBoard from "./pages/TicketBoard";
import TicketTable from "./pages/TicketTable";
import { queryClient } from "./queryClient";

const App: FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="bg-blue-500 h-[50px] flex items-center justify-around px-4">
            <Link
              to={"/table"}
              className="text-white text-xl hover:text-gray-200"
            >
              Table
            </Link>
            <Link
              to={"/board"}
              className="text-white text-xl hover:text-gray-200"
            >
              Board
            </Link>
            <div>
              {window.localStorage.getItem("loggedInUserToken") === null ? (
                <Link
                  to={"/login"}
                  className="text-white text-xl hover:text-gray-200"
                >
                  Login
                </Link>
              ) : (
                <Button
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  onClick={() => {
                    window.localStorage.removeItem("loggedInUserToken");
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/table" element={<TicketTable />}></Route>
            <Route path="/board" element={<TicketBoard />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
