import Login from "@pages/Login";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/Dashboard";
import { Landing } from "@pages/Landing";
import { useAppContextProvider } from "@components/AuthProvider";
import ThemeProvider from "./context/ThemeContext";
import { ProtectedRoute } from "@components/ProtectedRoute";
import { CreateCustomers } from "@pages/customers/CreateCustomers";
import { EditCustomer } from "@pages/customers/EditCustomers";

const App = () => {
  const { user } = useAppContextProvider();
  console.log(user);
  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="customers/create"
          element={
            <ProtectedRoute>
              <CreateCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="customers/:id/*"
          element={
            <ProtectedRoute>
              <EditCustomer />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
