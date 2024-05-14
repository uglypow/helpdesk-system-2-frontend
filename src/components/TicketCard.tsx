import dayjs from "dayjs";
import { FC } from "react";
import { ITicket } from "../types/ITicket";

interface TicketCardProps {
  ticket: ITicket;
  handleUpdateStatus: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const TicketCard: FC<TicketCardProps> = ({ ticket, handleUpdateStatus }) => {
  return (
    <div
      className="flex flex-col gap-[8px] items-center bg-white m-1
                border-4 hover:border-blue-400 cursor-pointer"
    >
      <div className="p-2 m-2 flex flex-col justify-items-start">
        <div>Title: {ticket.title}</div>
        <div>
          Description:{" "}
          {ticket.description.length > 60 ? (
            <span>{`${ticket.description.substring(0, 60)}...`}</span>
          ) : (
            <span>{ticket.description}</span>
          )}
        </div>
        <div>Contact: {ticket.contact}</div>
        <div>
          Create at: {dayjs(ticket.created_at).format("MMMM YYYY, dddd")}
        </div>
        <div>
          Updated at: {dayjs(ticket.updated_at).format("MMMM YYYY, dddd")}
        </div>
        Status:{" "}
        <select value={ticket.status} onChange={(e) => handleUpdateStatus(e)}>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default TicketCard;
