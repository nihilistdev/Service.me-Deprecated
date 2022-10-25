import axiosService from "@utils/axios";

export const logout = () =>
  axiosService("auth/logout", { method: "POST" })
    .catch((err) => err)
    .then((res) => res.data);
