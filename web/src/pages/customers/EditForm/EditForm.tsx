import { fetchCustomer } from "@api/customers/FetchCustomer";
import { updateCustomer } from "@api/customers/UpdateCustomer";
import { Button } from "@components/Button";
import { InputField } from "@components/InputField";
import { Spinner } from "@components/Spinner";
import { SuccessToast } from "@components/SuccessToast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toErrormap } from "@utils/toErrorMap";
import { Formik, Form } from "formik";
import * as React from "react";

interface EditFormProps {
  id: string;
}

export const EditForm = ({ id }: EditFormProps) => {
  const { data, isLoading } = useQuery<Customers>(
    ["get-customer", parseInt(id)],
    () => fetchCustomer(parseInt(id))
  );
  const [success, setSuccess] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation(updateCustomer, {});
  return (
    <>
      {success && (
        <SuccessToast
          onClose={() => setSuccess(false)}
          title="Customer updated successfully"
        />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-full">
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
                  <div className="grid gap-6 p-5 mb-2">
                    <div className="grid gap-5 md:grid-cols-2">
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
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <InputField
                        placeholder="Email"
                        name="email"
                        label="Email"
                      />
                      <InputField
                        placeholder="Phone"
                        name="phone"
                        label="Phone"
                      />
                    </div>
                    <InputField placeholder="Pin" name="pin" label="Pin" />
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
        </div>
      )}
    </>
  );
};
