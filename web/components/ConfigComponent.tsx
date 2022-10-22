import * as React from "react";

interface ConfigComponent extends React.HTMLAttributes<HTMLElement> {
  value: any;
}

export const ConfigContext = React.createContext({});

export const ConfigComponent = ({
  value,
  children,
  ...props
}: ConfigComponent) => {
  return (
    <ConfigContext.Provider value={value} {...props}>
      {children}
    </ConfigContext.Provider>
  );
};
