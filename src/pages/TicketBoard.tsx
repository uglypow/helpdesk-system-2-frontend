import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getAllTicket } from "../api/tickets";
import "../global.scss";

const TicketBoard: FC = () => {
  const { isLoading, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: getAllTicket,
    enabled: false,
  });

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        Loading ... {isError && "(Error occured, please try again)"}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="w-[200px] h-[50px] bg-red-500 text-white"
      >
        Get All Ticket
      </button>

      {data && (
        <div className="">
          {data.map((item: any) => (
            <div key={item.id} className="grid grid-cols-4 gap-[16px]">
              <div className="flex flex-col gap-[8px] items-center bg-yellow-500">
                <div className="p-4">
                  <p>title: {item.title}</p>
                  <p>description: {item.description}</p>
                  <p>contact: {item.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketBoard;
