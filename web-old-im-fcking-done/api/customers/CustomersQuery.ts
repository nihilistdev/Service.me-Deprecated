import axiosService from "@utils/axios";

export const customersQuery = (page?: number, limit?: number) =>
  axiosService(`customer/all?page=${page || 1}&limit=${limit || 10}`, {
    method: "POST",
  })
    .then((res) => res.data.data)
    .catch((err) => err);
