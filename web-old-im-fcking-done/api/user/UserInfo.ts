import axiosService from "@utils/axios";

export const userInfo = () =>
  axiosService<ApiResponse<User> | any>("user/info", {
    method: "get",
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
