import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { updateTicket } from "../api/tickets";
import { ITicket } from "../types/ITicket";

interface UpdateTicketButtonProp {
  ticket: ITicket;
  handleUpdate: () => void;
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
      <Button onClick={handleOpen}>Update</Button>
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
            const formJson = Object.fromEntries(formData.entries());
            await updateTicket(ticket.id, formJson);
            handleUpdate();
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
            id="id"
            name="id"
            label="id"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={ticket.id}
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
            required
            margin="dense"
            id="contact"
            name="contact"
            label="Contact"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={ticket.contact}
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
            defaultValue={ticket.created_at}
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
            defaultValue={ticket.updated_at}
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
