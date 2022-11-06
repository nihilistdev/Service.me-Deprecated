import { Layout } from "@components/Layout";
import * as React from "react";
import { useParams } from "react-router-dom";
import { EditForm } from "./EditForm/EditForm";

interface EditCustomerProps {}

export const EditCustomer = ({}: EditCustomerProps) => {
  const { id } = useParams();

  const tabs = ["Edit", "Past services", "Statistics"];
  const [tab, setTab] = React.useState<string>(tabs[0]);
  return (
    <Layout>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-600 px-4">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabs.map((e) => (
            <li className="mr-2" role="presentation">
              <button
                onClick={() => setTab(e)}
                className={`inline-block p-4 rounded-t-lg border-b-2 ${
                  tab === e && "border-blue-700"
                } dark:text-white active:border-blue-700`}
                type="button"
              >
                {e}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {tab === "Edit" && <EditForm id={id!} />}
    </Layout>
  );
};
