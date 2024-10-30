import { Routes, Route, Navigate } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Home from "../pages/Home";

export const ApplicationViews = () => {
  const isAuthenticated = !!localStorage.getItem("workflow_token");

  return (
    <Routes>
      {/* Public Routes - Only accessible when NOT logged in */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Protected Routes - Only accessible when logged in */}
      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        {/* Add your other protected routes here */}
      </Route>

      {/* Catch all route */}
      <Route
        path="*"
        element={
          isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};
