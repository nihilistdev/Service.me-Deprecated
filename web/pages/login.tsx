import { useMutation } from "@tanstack/react-query";
import { login } from "api/auth/Login";
import { Form, Formik } from "formik";
import * as React from "react";
import { InputField } from "../components/InputField";
import { useRouter } from "next/router";
import { toErrormap } from "@utils/toErrorMap";
import { Button } from "@components/Button";
import { useIsAuth } from "@utils/useIsAuth";

const Login: React.FC<{}> = () => {
  useIsAuth();
  const handleLogin = useMutation(login);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        emailOrUsername: "",
        password: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await handleLogin.mutateAsync(values);
        if (response.response?.data.errors)
          setErrors(toErrormap(response.response.data.errors));
        else if ("data" in response) {
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
