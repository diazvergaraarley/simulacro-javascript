import { getData } from "./api.js";

export async function getProjects() {
  return await getData("projects");
}