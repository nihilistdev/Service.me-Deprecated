import React, { ClassAttributes, InputHTMLAttributes } from "react";
import { FieldHookConfig, useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string> & {
    label: string;
    name: string;
    className?: string;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  className,
  size: _,
  ...props
}: InputFieldProps) => {
  const [field, { error }] = useField({ name });
  const errorFill =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  const normalFill =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`${error ? errorFill : normalFill}`}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      ) : null}
    </div>
  );
};
