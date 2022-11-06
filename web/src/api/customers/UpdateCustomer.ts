import axiosService from "../../utils/axios";

export interface UpdateCustomerProps {
  id?: string;
  data: {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    pin: string | undefined;
    phone: string | undefined;
    address?: string;
  };
}

export const updateCustomer = async ({ id, data }: UpdateCustomerProps) => {
  const res = await axiosService(`customer/update/${id}`, {
    method: "PUT",
    data: data,
  });
  return res.data.data;
};
