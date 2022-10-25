import axiosService from "@utils/axios";

export type LoginPostType = {
  emailOrUsername: string;
  password: string;
};

export const login = ({ emailOrUsername, password }: LoginPostType) =>
  axiosService("auth/login", {
    method: "POST",
    data: {
      emailOrUsername: emailOrUsername,
      password: password,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
