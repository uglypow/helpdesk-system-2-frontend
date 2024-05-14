import { Button } from "@mui/material";
import { FC } from "react";
import { ITicket } from "../types/ITicket";

interface DeleteTicketButtonProps {
  ticket: ITicket;
  handleDelete: (ticket : ITicket) => void;
}

const DeleteTicketButton: FC<DeleteTicketButtonProps> = ({ ticket, handleDelete }) => {
  return (
    <>
      <Button sx={{ color: "red" }} onClick={() => handleDelete(ticket)}>
        delete
      </Button>
    </>
  );
};

export default DeleteTicketButton;
