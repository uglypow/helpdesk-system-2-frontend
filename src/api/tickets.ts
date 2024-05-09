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
  const response = await axios.put(base_url, newObject);
  return response.data;
}
