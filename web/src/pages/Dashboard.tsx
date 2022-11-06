// import { Table } from "@components/Table";
import { isAuth } from "@utils/isAuth";
import * as React from "react";
import { AppLayout } from "../components/AppLayout";
// import { customersQuery } from "@api/customers/CustomersQuery";
// import { filterCustomers } from "@api/customers/CustomersFilter";

interface DashboardProps {}

export const Dashboard = ({}: DashboardProps) => {
  isAuth();
  return (
    <AppLayout>
      {/* <Table
        name="customers"
        searchMutation={filterCustomers}
        fn={customersQuery}
        edit="/customers"
        create="/customers/create"
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
      /> */}
    </AppLayout>
  );
};
