import { fetchCustomer } from "@api/customers/FetchCustomer";
import { updateCustomer } from "@api/customers/UpdateCustomer";
import { Button } from "@components/Button";
import { InputField } from "@components/InputField";
import { Layout } from "@components/Layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toErrormap } from "@utils/toErrorMap";
import { Form, Formik } from "formik";
import * as React from "react";
import { useParams } from "react-router-dom";

interface EditCustomerProps {}

export const EditCustomer = ({}: EditCustomerProps) => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Customers>(
    ["get-customer", parseInt(id!)],
    () => fetchCustomer(parseInt(id!))
  );
  const [success, setSuccess] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation(updateCustomer, {});
  return (
    <Layout>
      {success && (
        <div
          id="toast-success"
          className="flex self-center items-center z-50 p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
            Customer updated successfully.
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => setSuccess(false)}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
      {isLoading ? (
        <div role="status" className="grid h-screen place-items-center">
          <svg
            aria-hidden="true"
            className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        <Formik
          initialValues={{
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            pin: data?.pin,
            phone: data?.phone,
            address: data?.address,
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            await mutateAsync(
              {
                id: id,
                data: {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  email: values.email,
                  pin: values.pin,
                  phone: values.phone,
                  address: values.address,
                },
              },
              {
                onSuccess() {
                  setSuccess(true);
                },
                onError(error) {
                  setErrors(toErrormap(error as any[]));
                },
              }
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col content-start">
                <div className="grid gap-6 p-5 mb-6 md:grid-cols-2">
                  <InputField
                    placeholder="First name"
                    name="first_name"
                    label="First name"
                  />
                  <InputField
                    placeholder="Last name"
                    name="last_name"
                    label="Last name"
                  />
                  <InputField
                    placeholder="Last name"
                    name="last_name"
                    label="Last name"
                  />
                  <InputField placeholder="Email" name="email" label="Email" />
                  <InputField placeholder="Pin" name="pin" label="Pin" />
                  <InputField placeholder="Phone" name="phone" label="Phone" />
                  <InputField
                    placeholder="Address"
                    name="address"
                    label="Address"
                  />
                </div>
                <div className="flex flex-start w-14 px-5">
                  <Button type="submit" isLoading={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};
