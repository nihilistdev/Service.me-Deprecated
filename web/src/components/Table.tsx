import { useLocalStorage } from "@hooks/useLocalStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";

import * as React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SearchModal } from "./Modal";
import { SearchInput } from "./SearchInput";

interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  render: (element: T) => React.ReactNode;
  limit?: number;
  name?: string;
  searchMutation: (...args: any[]) => Promise<T>;
  fn: <T>(...args: any[]) => Promise<T>;
  create?: string;
  edit?: string;
  headerLimit?: number;
}

export const Table = <T,>({
  render,
  fn,
  name,
  headerLimit,
  create,
  edit,
  searchMutation,
}: TableProps<T>) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = useLocalStorage("limit", 10);

  const [modal, setModal] = React.useState(false);
  const filterMutation = useMutation(searchMutation);
  const [mutationItems, setMutationItems] = React.useState<T[]>([]);
  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<T> | any
  >([name || "query", page, limit], () => fn(page, limit));
  const header = Object.keys(queryData?.results[0] || {}).slice(
    0,
    headerLimit || 7
  );

  const increase = () => {
    if (queryData?.next && page < queryData.pages) {
      setPage(queryData.next.page);
    }
  };

  const decrease = () => {
    if (queryData?.previous && page !== 1) {
      setPage(queryData.previous.page);
    }
  };

  const handleLimitChange = (event: any) => {
    setLimit(parseInt(event.target.value));
  };
  console.log(edit);
  return (
    <div className="p-10">
      {create && (
        <button
          onClick={() => navigate(create!)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      )}
      <button
        type="button"
        onClick={() => setModal(!modal)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
      <SearchModal
        isOpen={modal}
        onClose={() => setModal(!modal)}
        modalTitle={
          <Formik
            initialValues={{ search: "" }}
            onSubmit={async (values) => {
              await filterMutation.mutateAsync(values.search, {
                onSuccess(data) {
                  setMutationItems(data as T[]);
                },
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <SearchInput
                  name="search"
                  placeholder="search"
                  label="Seacrh"
                  isLoading={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        }
      >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {mutationItems.length > 1
            ? mutationItems.map((e: any, idx) => (
                <tr
                  onClick={() => navigate(`${edit}/${e.id}`, { replace: true })}
                  className="bg-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 hover:bg-slate-50 hover:cursor-pointer dark:hover:cursor-pointer rounded"
                  key={idx}
                >
                  {render(e)}
                </tr>
              ))
            : null}
        </table>
      </SearchModal>
      {isLoading ? (
        <div
          role="status"
          className="flex flex-col h-full w-full justify-center items-center justify-self-center m-auto"
        >
          <svg
            aria-hidden="true"
            className="mr-2 w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {header.map((e: string, idx) => (
                <th key={idx} scope="col" className="py-3 px-6">
                  {e.includes("_") ? e.replace("_", " ") : e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queryData?.results.map((e: any, idx: number) => (
              <tr
                onClick={() => navigate(`${edit}/${e.id}`, { replace: true })}
                className="bg-white border-b hover:cursor-pointer hover:bg-slate-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:cursor-pointer"
                key={idx}
              >
                {render(e)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex flex-row justify-end">
        <select
          onChange={handleLimitChange}
          className="mt-2 mr-10 w-12  text-sm text-gray-900 bg-gray-50 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={limit}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
        <div className="flex flex-col items-center">
          <div className="inline-flex mt-2 xs:mt-0 gap-2">
            <button
              onClick={decrease}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-black rounded-full  border-gray-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <HiChevronLeft size={25} />
            </button>
            <button
              onClick={increase}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-black rounded-full border-gray-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <HiChevronRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
