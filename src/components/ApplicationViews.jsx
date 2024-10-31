import { Routes, Route, Navigate } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Home from "../pages/Home";
import { AddClientForm } from "../Clients/AddClientForm";
import { useEffect, useState } from "react";
import { EditProjectForm } from "../Projects/EditProjectForm";
import { ShowAllProjectsView } from "../Projects/ShowAllProjects";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("workflow_token");
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated) {
      const userInfo = JSON.parse(token);
      setCurrentUser(userInfo);
    }
  }, [token, isAuthenticated]);

  if (
    !isAuthenticated &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />

      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/addClientForm"
          element={<AddClientForm currentUser={currentUser} />}
        />
        <Route
          path="/editProjectForm/:projectId"
          element={<EditProjectForm currentUser={currentUser} />}
        />
        <Route
          path="/projects"
          element={<ShowAllProjectsView currentUser={currentUser} />}
        />
        {/* Add your other protected routes here */}
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};
