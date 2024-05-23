import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CreateTicketButton from "../components/CreateTicketButton";
import DeleteTicketButton from "../components/DeleteTicketButton";
import UpdateTicketButton from "../components/UpdateTicketButton";
import { fetchTicket } from "../hooks/fetchTicket";
import { TicketStatus } from "../types/TicketStatus";

const TicketTable: FC = () => {
  const columns = [
    {
      field: "ticket_id",
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
      field: "status",
      headerName: "Status",
      flex: 2,
      renderCell: (params: any) => (
        <select
          value={params.value}
          // className="bg-blue-500 text-white font-semibold rounded-xl w-fit h-[30px]"
          onChange={(e) => handleUpdateStatus(e, params)}
        >
          <option value={TicketStatus.PENDING}>Pending</option>
          <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
          <option value={TicketStatus.COMPLETED}>Accepted</option>
          <option value={TicketStatus.CANCELLED}>Cancelled</option>
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
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => (
        <UpdateTicketButton ticket={params.row} handleUpdate={handleUpdate} />
      ),
    },
    {
      field: "action2",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => (
        <DeleteTicketButton ticket={params.row} handleDelete={handleDelete} />
      ),
    },
  ];

  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleUpdateStatus,
  } = fetchTicket();

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center text-3xl font-bold">
        Loading ... {isError && "(Error occured, please try again)"}
      </div>
    );
  }

  return (
    <>
      {data === undefined ? (
        <div className="flex flex-col gap-2 w-screen h-screen justify-center items-center text-3xl font-bold">
          <div>No data...</div>
          <span className="text-base font-sans">
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Click Here
            </Button>{" "}
            to login
          </span>
        </div>
      ) : (
        <>
          <CreateTicketButton handleCreate={handleCreate} />
          <DataGrid
            getRowId={(row) => row.ticket_id}
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
      )}
    </>
  );
};

export default TicketTable;
