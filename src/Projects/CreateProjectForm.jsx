import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClients } from "../services/ClientServices";
import { getAllGroups } from "../services/GroupServices";
import { createProject } from "../services/ProjectServices";

export const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [project, setProject] = useState({
    clientId: "",
    assigned_group: "",
    project_name: "",
    status: "",
    start_date: "",
    end_date: "",
    expected_duration: "",
  });

  useEffect(() => {
    Promise.all([getAllClients(), getAllGroups()]).then(
      ([clientsData, groupsData]) => {
        setClients(clientsData);
        setGroups(groupsData);
        setLoading(false);
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all integer fields are numbers, not strings
    const formattedProject = {
      ...project,
      clientId: parseInt(project.clientId),
      assigned_group: project.assigned_group
        ? parseInt(project.assigned_group)
        : null,
      expected_duration: parseInt(project.expected_duration),
      start_date: `${project.start_date}T08:00:00Z`,
      end_date: `${project.end_date}T17:00:00Z`,
    };

    createProject(formattedProject)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={project.project_name}
            onChange={(e) =>
              setProject({ ...project, project_name: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            value={project.clientId}
            onChange={(e) =>
              setProject({ ...project, clientId: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.first_name} {client.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assigned Team
          </label>
          <select
            value={project.assigned_group}
            onChange={(e) =>
              setProject({
                ...project,
                assigned_group: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select a team</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={project.start_date}
            onChange={(e) =>
              setProject({ ...project, start_date: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={project.end_date}
            onChange={(e) =>
              setProject({ ...project, end_date: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Duration (days)
          </label>
          <input
            type="number"
            value={project.expected_duration}
            onChange={(e) =>
              setProject({
                ...project,
                expected_duration: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Project
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
