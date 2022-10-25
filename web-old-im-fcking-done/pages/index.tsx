import { Layout } from "@components/Layout";
import { customersQuery } from "api/customers/CustomersQuery";
import * as React from "react";
import { useIsAuth } from "../utils/useIsAuth";
import { Table } from "@components/Table";

const Home = () => {
  useIsAuth();
  return (
    <Layout>
      <div className="p-10">
        <Table
          fn={customersQuery}
          render={(data: Customers) => (
            <>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.id}
              </th>
              <td className="py-4 px-6">{data.first_name}</td>
              <td className="py-4 px-6">{data.last_name}</td>
              <td className="py-4 px-6">{data.email}</td>
              <td className="py-4 px-6">{data.pin}</td>
              <td className="py-4 px-6">{data.phone}</td>
              <td className="py-4 px-6">{data.address}</td>
            </>
          )}
        />
      </div>
    </Layout>
  );
};

export default Home;
