import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { createTicket } from "../api/tickets";

interface CreateTicketButtonProps {
  handleCreate: () => void;
}

const CreateTicketButton: FC<CreateTicketButtonProps> = ({ handleCreate }) => {
  const [open, setOpen] = useState(false);

  function handleDialog(): void {
    setOpen(!open);
  }

  return (
    <>
      <button
        className="m-2 w-[150px] h-[40px] bg-green-500 text-white items-center rounded-lg"
        onClick={handleDialog}
      >
        Create Ticket
      </button>
      <Dialog
        open={open}
        onClose={handleDialog}
        PaperProps={{
          component: "form",
          onSubmit: async (event: {
            preventDefault: () => void;
            currentTarget: HTMLFormElement | undefined;
          }) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await createTicket(formJson);
            handleCreate();
            handleDialog();
          },
        }}
      >
        <DialogTitle>Create Ticket</DialogTitle>
        <DialogContent>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTicketButton;
