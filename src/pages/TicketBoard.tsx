import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CreateTicketButton from "../components/CreateTicketButton";
import TicketCard from "../components/TicketCard";
import "../global.scss";
import { fetchTicket } from "../hooks/fetchTicket";
import { ITicket } from "../types/ITicket";

const TicketBoard: FC = () => {
  const navigate = useNavigate();
  const ticket = fetchTicket();

  if (ticket.isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center text-3xl font-bold">
        Loading ... {ticket.isError && "(Error occured, please try again)"}
      </div>
    );
  }

  return (
    <div>
      {ticket.data === undefined ? (
        <div className="flex flex-col gap-2 w-screen h-screen justify-center items-center text-3xl font-bold">
          <div>No data...</div>
          <span className="text-base font-sans">
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Click Here
            </Button>{" "}
            to login
          </span>
        </div>
      ) : (
        <>
          <CreateTicketButton handleCreate={ticket.handleCreate} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {ticket.data.map((item: ITicket) => (
              <TicketCard
                key={item.ticket_id}
                ticket={item}
                handleUpdate={ticket.handleUpdate}
                handleUpdateStatus={ticket.handleUpdateStatus}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketBoard;
