interface LoggerParams {
  type?: "log" | "trace" | "warn" | "info" | "debug" | "profile";
}

const defaultParams: Required<LoggerParams> = {
  type: "debug",
};

export function Log(params?: LoggerParams) {
  const options: Required<LoggerParams> = {
    type: params?.type || defaultParams.type,
  };

  // @ts-ignore
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = Date.now();
      const result = original.apply(this, args);

      if (options.type === "profile") {
        console.log(`Function time is ${Date.now() - start}ms`);
      }

      console[options.type](
        `Logged: ${target} - ${propertyKey} - ${descriptor} -> ${result}`
      );

      return result;
    };
  };
}
