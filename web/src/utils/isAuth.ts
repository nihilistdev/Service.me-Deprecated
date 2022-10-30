import { getUser } from "@store/hooks/getUser";

export const isAuth = () => {
  const user = getUser();

  if (user) return true;
  return false;
};
