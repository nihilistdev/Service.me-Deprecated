import Login from "@pages/Login";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/Dashboard";
import { Landing } from "@pages/Landing";
import { useAppContextProvider } from "@components/AuthProvider";
import ThemeProvider from "./context/ThemeContext";

const App = () => {
  const { user } = useAppContextProvider();
  console.log(user);
  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="dashboard"
          element={
            <React.Suspense fallback={<h1>Loading user...</h1>}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
