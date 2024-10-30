import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./Navbar.jsx";

export const Authorized = () => {
  if (!localStorage.getItem("workflow_token")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};
