import axiosService from "../../utils/axios";

export const createCustomers = ({
  first_name,
  last_name,
  email,
  pin,
  phone,
}: Customers) =>
  axiosService(`customer/filter`, {
    method: "POST",
    data: {
      first_name,
      last_name,
      email,
      pin,
      phone,
    },
  })
    .then((res) => res.data.data)
    .catch((err) => err);
