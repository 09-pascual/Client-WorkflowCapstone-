import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "../services/ProjectServices";
import { getAllClients } from "../services/ClientServices";
import { getAllGroups } from "../services/GroupServices";

export const EditProjectForm = ({ currentUser }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    // Fetch project details
    getProjectById(projectId).then((projectData) => {
      // Format dates for input fields
      const formattedProject = {
        ...projectData,
        start_date: new Date(projectData.start_date)
          .toISOString()
          .split("T")[0],
        end_date: new Date(projectData.end_date).toISOString().split("T")[0],
        clientId: projectData.clientId.id,
        assigned_group: projectData.assigned_group?.id || "",
      };
      setProject(formattedProject);
    });

    // Fetch clients and groups for dropdowns
    Promise.all([getAllClients(), getAllGroups()]).then(
      ([clientsData, groupsData]) => {
        setClients(clientsData);
        setGroups(groupsData);
        setLoading(false);
      }
    );
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(projectId, project)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
  };

  const handleDelete = () => {
    deleteProject(projectId)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Project Form</h2>

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
              setProject({ ...project, clientId: parseInt(e.target.value) })
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
                assigned_group: parseInt(e.target.value),
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
                expected_duration: parseInt(e.target.value),
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
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            DELETE PROJECT
          </button>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
