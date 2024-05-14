import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getAllTicket, updateTicketStatus } from "../api/tickets";
import TicketCard from "../components/TicketCard";
import "../global.scss";
import { ITicket } from "../types/ITicket";
import CreateTicketButton from "../components/CreateTicketButton";

const TicketBoard: FC = () => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: getAllTicket,
  });

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        Loading ... {isError && "(Error occured, please try again)"}
      </div>
    );
  }

  const handleCreate = () => {
    refetch();
  };

  const handleUpdateStatus = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    // const updatedStatus = {
    //   status: event.target.value as string,
    // };
    // const selectedTicket: ITicket = selected!;
    // try {
    //   await updateTicketStatus(selectedTicket.id, updatedStatus);
    // } catch (error: unknown) {
    //   if (error instanceof AxiosError) alert(error.response?.data.message);
    // }
    // refetch();
  };

  return (
    <div>
      <CreateTicketButton handleCreate={handleCreate} />
      {data && (
        <div className="grid grid-cols-4 gap-[16px] p-4 grid-">
          {data.map((item: ITicket) => (
            <TicketCard key={item.id} ticket={item} handleUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketBoard;
