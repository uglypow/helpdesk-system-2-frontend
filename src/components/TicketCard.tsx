const TicketCard = (ticket: any) => {
  return (
    <div className="rounded-xl p-2 m-3 bg-white border-4 hover:border-blue-400 cursor-pointer">
      {ticket.title}
    </div>
  );
};

export default TicketCard;
