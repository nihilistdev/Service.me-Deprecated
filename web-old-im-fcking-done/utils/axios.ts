import axios from "axios";

const axiosService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosService;
