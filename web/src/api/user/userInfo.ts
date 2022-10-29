import axiosService from "../../utils/axios";

export const userInfo = () =>
  axiosService("user/info", {
    method: "get",
  })
    .then((res: any) => res.data)
    .catch((err: any) => err.response.data);
