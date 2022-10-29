import { getUser } from "@store/hooks/getUser";
import React from "react";
import { useNavigate } from "react-router-dom";

export const isAuth = () => {
  const user = getUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/");
    }
  }, [user]);
};
