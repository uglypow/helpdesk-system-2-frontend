import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent } from "react";
import {
  createTicket,
  deleteTicket,
  getAllTicket,
  updateTicket,
  updateTicketStatus,
} from "../api/tickets";
import {
  ICreateTicketRequest,
  ITicket,
  IUpdateTicketRequest,
} from "../types/ITicket";

export function fetchTicket() {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: getAllTicket,
  });

  const handleCreate = async (body: ICreateTicketRequest) => {
    try {
      await createTicket(body);
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.response?.data.message);
    }
    refetch();
  };

  const handleUpdate = async (
    ticketId: string,
    body: IUpdateTicketRequest
  ): Promise<void> => {
    try {
      await updateTicket(ticketId, body);
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.response?.data.message);
    }
    refetch();
  };

  const handleUpdateStatus = async (
    event: ChangeEvent<HTMLSelectElement>,
    ticket: ITicket
  ): Promise<void> => {
    const updatedStatus = {
      status : event.target.value as string,
    };
    const selectedTicket: ITicket = ticket!;
    try {
      await updateTicketStatus(selectedTicket.ticket_id, updatedStatus);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) alert(error.response?.data.message);
    }
    refetch();
  };

  const handleDelete = async (ticket: ITicket) => {
    if (
      window.confirm("This will permanently delete the data. Are you sure?")
    ) {
      try {
        await deleteTicket(ticket.ticket_id);
        window.location.reload();
      } catch (error: unknown) {
        if (error instanceof AxiosError) alert(error.response?.data.message);
      }
    }
  };

  return {
    isLoading,
    isError,
    data,
    refetch,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleUpdateStatus,
  };
}
