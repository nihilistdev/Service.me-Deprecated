import { ThemeToggle } from "@components/ThemeToggle";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axiosService from "../utils/axios";
import { useIsAuth } from "../utils/useIsAuth";

const Home = () => {
  useIsAuth();
  const customersQuery = (page: number, limit: number) =>
    axiosService(`customer/all?page=${page}&limit=${limit}`, {
      method: "POST",
    }).then((res) => res.data.data);

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = useLocalStorage("limit", 10);

  const { data: customers, isLoading } = useQuery(
    ["customers", page, limit],
    () => customersQuery(page, limit)
  );

  if (!isLoading) console.log(customers);

  const increase = () => {
    if (customers.next && page < customers.pages) {
      setPage(customers.next.page);
    }
  };

  const decrease = () => {
    if (customers.previous && page !== 1) {
      setPage(customers.previous.page);
    }
  };

  const handleLimitChange = (event: any) => {
    setLimit(parseInt(event.target.value));
  };

  return (
    <div>
      <ThemeToggle />
      {isLoading
        ? "Loading ...."
        : customers.results.map((e: any) => (
            <ul>
              <li>{e.id}</li>
              <li>{e.first_name}</li>
              <li>{e.last_name}</li>
            </ul>
          ))}
      <select onChange={handleLimitChange} value={limit}>
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
      <button onClick={decrease}>{"<"}</button>
      <button onClick={increase}>{">"}</button>
    </div>
  );
};

export default Home;
