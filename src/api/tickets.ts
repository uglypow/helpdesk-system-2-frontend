import axios from "axios";

const base_url = "http://localhost:8080/tickets";

export async function getAllTicket(): Promise<any> {
  const response = await axios.get(base_url);
  return response.data;
}

export async function createTicket(newObject: any): Promise<any> {
  const response = await axios.post(base_url, newObject);
  return response.data;
}

export async function updateTicket(id: string, newObject: any): Promise<any> {
  const response = await axios.put(`${base_url}/${id}`, newObject);
  return response.data;
}

export async function updateTicketStatus(
  id: string,
  status: any
): Promise<any> {
  const response = await axios.patch(`${base_url}/${id}`, status);
}

export async function deleteTicket(id: string): Promise<any> {
  try {
    await axios.delete(`${base_url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}
