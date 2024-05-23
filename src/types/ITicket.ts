export interface ITicket {
  ticket_id: string;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUpdateTicketRequest {
  title?: string;
  description?: string;
}

export interface ICreateTicketRequest {
  title: string;
  description?: string;
}
