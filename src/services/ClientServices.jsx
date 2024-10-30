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
