import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../services/ClientServices";

export const AddClientForm = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createClient(client).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Client</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.first_name}
            onChange={(e) =>
              setClient({ ...client, first_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.last_name}
            onChange={(e) =>
              setClient({ ...client, last_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            required
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.phone_number}
            onChange={(e) =>
              setClient({ ...client, phone_number: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Client
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
