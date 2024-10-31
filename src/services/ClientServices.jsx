export const getAllClients = () => {
  return fetch("http://localhost:8000/clients", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const getClientById = (id) => {
  return fetch(`http://localhost:8000/clients/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const createClient = (client) => {
  return fetch("http://localhost:8000/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(client),
  }).then((response) => response.json());
};

export const deleteClient = (id) => {
  return fetch(`http://localhost:8000/clients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then(() => {
    return;
  });
};

export const updateClient = async (id, clientData) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`http://localhost:8000/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(clientData),
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to update client: ${error.message}`);
  }
};
