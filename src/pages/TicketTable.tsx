import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { ChangeEvent, FC } from "react";
import { deleteTicket, getAllTicket, updateTicketStatus } from "../api/tickets";
import CreateTicketButton from "../components/CreateTicketButton";
import DeleteTicketButton from "../components/DeleteTicketButton";
import UpdateTicketButton from "../components/UpdateTicketButton";
import { ITicket } from "../types/ITicket";

const TicketTable: FC = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 3,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 8,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      renderCell: (params: any) => (
        <select
          value={params.value}
          className="bg-blue-500 text-white font-semibold rounded-xl w-fit h-[30px]"
          onChange={(e) => handleUpdateStatus(e, params)}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      ),
    },
    {
      field: "created_at",
      headerName: "Create",
      flex: 3,
      valueFormatter: (params: Date) =>
        dayjs(params).format("DD/MM/YY, hh:mm:ss"),
    },
    {
      field: "updated_at",
      headerName: "Update",
      flex: 3,
      valueFormatter: (params: Date) =>
        dayjs(params).format("DD/MM/YY, hh:mm:ss"),
    },
    {
      field: "action1",
      headerName: "",
      renderCell: (params: any) => (
        <UpdateTicketButton ticket={params.row} handleUpdate={handleUpdate} />
      ),
    },
    {
      field: "action2",
      headerName: "",
      renderCell: (params: any) => (
        <DeleteTicketButton ticket={params.row} handleDelete={handleDelete} />
      ),
    },
  ];

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

  const handleUpdate = () => {
    refetch();
  };

  const handleUpdateStatus = async (
    event: ChangeEvent<HTMLSelectElement>,
    ticket: ITicket
  ) => {
    const updatedStatus = {
      status: event.target.value as string,
    };
    const selectedTicket: ITicket = ticket!;
    try {
      await updateTicketStatus(selectedTicket.id, updatedStatus);
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.response?.data.message);
    }
    refetch();
  };

  const handleDelete = async (ticket: ITicket) => {
    if (
      window.confirm("This will permanently delete the data. Are you sure?")
    ) {
      await deleteTicket(ticket.id);
      window.location.reload();
    }
  };

  return (
    <>
      <CreateTicketButton handleCreate={handleCreate} />
      <DataGrid
        className="p-4 m-4"
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </>
  );
};

export default TicketTable;
