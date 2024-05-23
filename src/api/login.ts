import axios from "axios";

const base_url = `${process.env.BASE_URL!}/users/login`;

export const login = async (body: any) => {
  const response = await axios.post(base_url, body);
  return response;
};
