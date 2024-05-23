import dayjs from "dayjs";
import { ChangeEvent } from "react";
import { ITicket } from "../types/ITicket";
import { TicketStatus } from "../types/TicketStatus";
import UpdateTicketButton from "./UpdateTicketButton";

interface TicketCardProps {
  ticket: ITicket;
  handleUpdate: (ticketId: string, body: any) => Promise<void>;
  handleUpdateStatus: (
    event: ChangeEvent<HTMLSelectElement>,
    ticket: ITicket
  ) => Promise<void>;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  handleUpdate,
  handleUpdateStatus,
}) => {
  return (
    <div className="bg-white border-4 p-4 m-2 flex flex-col justify-between h-[250px]">
      <div className="mb-2">
        <div className="text-xl font-semibold mb-1">Title: {ticket.title}</div>
        <div className="text-sm mb-1">
          Description:{" "}
          {ticket.description.length > 60 ? (
            <span>{`${ticket.description.substring(0, 60)}...`}</span>
          ) : (
            <span>{ticket.description}</span>
          )}
        </div>
        <div className="text-sm mb-1">
          Create at: {dayjs(ticket.created_at).format("MMMM YYYY, dddd")}
        </div>
        <div className="text-sm mb-1">
          Updated at: {dayjs(ticket.updated_at).format("MMMM YYYY, dddd")}
        </div>
      </div>

      <div className="flex flex-col">
        <select
          value={ticket.status}
          className="bg-blue-500 text-white font-semibold rounded-xl h-[30px] mt-2"
          onChange={(e) => {
            e.preventDefault();
            handleUpdateStatus(e, ticket);
            alert("Ticket has been updated");
          }}
        >
          <option value={TicketStatus.PENDING}>Pending</option>
          <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
          <option value={TicketStatus.COMPLETED}>Completed</option>
          <option value={TicketStatus.CANCELLED}>Cancelled</option>
        </select>
        <div className="text-center mt-2">
          <UpdateTicketButton ticket={ticket} handleUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
