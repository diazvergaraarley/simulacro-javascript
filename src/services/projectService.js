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