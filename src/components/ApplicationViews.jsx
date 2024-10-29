import { Routes, Route, Navigate } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login";
import Home from "../pages/Home";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        {/* Add more protected routes here */}
      </Route>

      {/* Redirect to login if no route matches */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
