import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllClients } from "../services/ClientServices";

export const ShowAllClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllClients()
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load clients");
        setLoading(false);
        console.error("Error loading clients:", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">
          Loading clients...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Clients</h1>
        <Link
          to="/clients/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150"
        >
          Add New Client
        </Link>
      </div>

      {clients.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {client.first_name} {client.last_name}
                  </h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">
                      {client.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {client.phone_number}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {client.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <Link
                    to={`/createNewProjectForm`}
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors duration-150"
                  >
                    Add Project
                  </Link>
                  <Link
                    to={`/EditClientForm/${client.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-150"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No clients available.</p>
          <Link
            to="/clients/add"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first client
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowAllClients;
