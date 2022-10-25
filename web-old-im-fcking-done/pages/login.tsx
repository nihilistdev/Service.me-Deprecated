import { login } from "api/auth/Login";
import { Form, Formik } from "formik";
import * as React from "react";
import { InputField } from "../components/InputField";
import { useRouter } from "next/router";
import { toErrormap } from "@utils/toErrorMap";
import { Button } from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { AuthStateContext, useAuth } from "@components/ConfigComponent";

const Login: React.FC<{}> = () => {
  const router = useRouter();
  const loginMutation = useMutation(login);
  const [state, dispatch] = useAuth();
  return (
    <Formik
      initialValues={{
        emailOrUsername: "",
        password: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await loginMutation.mutateAsync(values);
        if ("errorType" in response) {
          setErrors(toErrormap(response.errors));
        } else {
          dispatch({
            type: "setAuthDetails",
            payload: response.data,
          });
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col h-screen justify-center items-center">
            <div className="w-1/3 gap-5">
              <InputField
                className="mb-5"
                label="Username or email"
                name="emailOrUsername"
                type="text"
                required
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                required
              />
              <Button type="submit" isLoading={isSubmitting}>
                Log in
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
