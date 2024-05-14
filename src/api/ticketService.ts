// import { useEffect, useState } from "react";
// import { ITicket } from "../types/ITicket";
// import { getAllTicket } from "./tickets";

// const ticketService = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     getAllTicket()
//       .then((initialTickets) => {
//         setTickets(initialTickets);
//       })
//       .catch((error) => console.log(error.message));
//   }, []);

//   const createTicket = (ticket: ITicket) => {
//     createTicket(ticket)
//       .then((newTicket) => {
//         setTickets(newTicket);
//       })
//       .catch((error) => console.log(error.message));
//   };

//   return { createTicket };
// };

// export default ticketService;
