import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { ITicket, IUpdateTicketRequest } from "../types/ITicket";

interface UpdateTicketButtonProp {
  ticket: ITicket;
  handleUpdate: (ticketId: string, body: any) => Promise<void>;
}

const UpdateTicketButton: FC<UpdateTicketButtonProp> = ({
  ticket,
  handleUpdate,
}) => {
  const [formOpen, setFormOpen] = useState(false);

  const handleOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog
        open={formOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: {
            preventDefault: () => void;
            currentTarget: HTMLFormElement | undefined;
          }) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson: any = Object.fromEntries(formData.entries());
            const newTicket: IUpdateTicketRequest = {
              title: formJson.title,
              description: formJson.description,
            };
            handleUpdate(ticket.ticket_id, newTicket);
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            disabled
            margin="dense"
            id="ticket_id"
            name="ticket_id"
            label="ticket_id"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={ticket.ticket_id}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={ticket.title}
          />
          <TextField
            multiline
            rows={4}
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={ticket.description}
          />
          <TextField
            autoFocus
            disabled
            margin="dense"
            id="created_at"
            name="created_at"
            label="Created_at"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={dayjs(ticket.created_at).format(
              "dddd/MMMM/YYYY, hh:mm:ss"
            )}
          />
          <TextField
            autoFocus
            disabled
            margin="dense"
            id="updated_at"
            name="updated_at"
            label="Updated_at"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={dayjs(ticket.updated_at).format(
              "dddd/MMMM/YYYY, hh:mm:ss"
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateTicketButton;
