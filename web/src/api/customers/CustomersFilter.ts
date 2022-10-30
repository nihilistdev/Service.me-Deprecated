import axiosService from "../../utils/axios";

export const filterCustomers = (text?: string) =>
  axiosService(`customer/filter`, {
    method: "POST",
    data: {
      text,
    },
  })
    .then((res) => res.data.data)
    .catch((err) => err);
