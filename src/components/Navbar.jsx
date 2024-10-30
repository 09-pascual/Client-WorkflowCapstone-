import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const getNavLinkClasses = ({ isActive }) => {
    return `px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("workflow_token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm mb-8 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center relative">
          <ul className="flex items-center h-16 space-x-8">
            <li>
              <NavLink to="/" className={getNavLinkClasses}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/clients" className={getNavLinkClasses}>
                Clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={getNavLinkClasses}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/invoices" className={getNavLinkClasses}>
                Invoices
              </NavLink>
            </li>
            <li>
              <NavLink to="/groups" className={getNavLinkClasses}>
                Groups
              </NavLink>
            </li>
            <li>
              <NavLink to="/employees" className={getNavLinkClasses}>
                Employees
              </NavLink>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
