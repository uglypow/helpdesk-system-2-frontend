import axios from "axios";

const base_url = `${process.env.BASE_URL!}/tickets`;

import { jwtDecode } from "jwt-decode";

let token = window.localStorage.getItem("loggedInUserToken");

const config = {
  headers: { token: token },
};

export async function getAllTicket(): Promise<any> {
  const user: any = jwtDecode(token!);
  let url = base_url;
  if (user.roles === "USER") {
    url = `${base_url}?user_id=${user.user_id}`;
  }
  const response = await axios.get(url, config);
  return response.data;
}

export async function createTicket(newObject: any): Promise<any> {
  const response = await axios.post(base_url, newObject, config);
  return response.data;
}

export async function updateTicket(id: string, newObject: any): Promise<any> {
  const response = await axios.patch(`${base_url}/${id}`, newObject, config);
  return response.data;
}

export async function updateTicketStatus(
  id: string,
  status: any
): Promise<void> {
  await axios.patch(`${base_url}/${id}/status`, status, config);
}

export async function deleteTicket(id: string): Promise<void> {
  try {
    await axios.delete(`${base_url}/${id}`, config);
  } catch (error) {
    throw error;
  }
}
