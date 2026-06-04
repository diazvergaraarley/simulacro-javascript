import { getData } from "./api.js";

const BASE_URL = "http://localhost:3000";

export async function getProjects() {
  return await getData("projects");
}

export async function createProject(project) {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
  });

  if (!response.ok) {
    throw new Error("Error creating project");
  }

  return await response.json();
}
export async function deleteProject(id) {
  const response = await fetch(
    `${BASE_URL}/projects/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Error deleting project");
  }

  return true;
}

export async function updateProject(id, data) {
  const response = await fetch(
    `${BASE_URL}/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error("Error updating project");
  }

  return await response.json();
}