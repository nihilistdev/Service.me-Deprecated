import { login } from "@api/auth/Login";
import { Form, Formik } from "formik";
import * as React from "react";
import { InputField } from "../components/InputField";
import { toErrormap } from "@utils/toErrorMap";
import { Button } from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSlice } from "@store/slices/auth";

const Login: React.FC<{}> = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useMutation(login, {});
  return (
    <Formik
      initialValues={{
        emailOrUsername: "",
        password: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await loginMutation.mutateAsync(values, {
          onSuccess: (data) => {
            dispach(authSlice.actions.setAccount(data.data));
          },
        });
        console.log(response);
        if ("errorType" in response) {
          setErrors(toErrormap(response.errors));
        } else {
          navigate("/dashboard");
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
