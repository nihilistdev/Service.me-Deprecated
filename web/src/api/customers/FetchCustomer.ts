import axiosService from "../../utils/axios";

export const fetchCustomer = (id: string | number) =>
  axiosService(`customer/get/${id}`, {
    method: "GET",
  })
    .then((res) => res.data.data)
    .catch((err) => err);
