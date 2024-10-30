import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { getAllProjects } from "../services/ProjectServices";

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="text-slate-900 pl-10 pr-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl">Current Projects</h1>
        <button
          onClick={() => navigate("/addClient")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Client
        </button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">
                  {project.project_name}
                </h2>
                <button
                  onClick={() => navigate(`/edit-project/${project.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-1 px-3 rounded"
                >
                  Edit
                </button>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  project.status === "Open"
                    ? "bg-green-100 text-green-800"
                    : project.status === "Closed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Client Details</h3>
                <p>
                  Name: {project.clientId.first_name}{" "}
                  {project.clientId.last_name}
                </p>
                <p>Address: {project.clientId.address}</p>
                <p>Email: {project.clientId.email}</p>
                <p>Phone: {project.clientId.phone_number}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Assigned Team</h3>
                {project.assigned_group && (
                  <div>
                    <p className="font-medium">{project.assigned_group.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.assigned_group.description}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Team Members:</p>
                      {project.assigned_group.workers &&
                      project.assigned_group.workers.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm">
                          {project.assigned_group.workers.map((worker) => (
                            <li key={worker.id}>
                              {worker.first_name} {worker.last_name} -{" "}
                              {worker.role}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No team members assigned
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {!project.assigned_group && (
                  <p className="text-gray-500 italic">No team assigned</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">
                  Project Timeline
                </h3>
                <p>
                  Start: {new Date(project.start_date).toLocaleDateString()}
                </p>
                <p>End: {new Date(project.end_date).toLocaleDateString()}</p>
                <p>Duration: {project.expected_duration} days</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
