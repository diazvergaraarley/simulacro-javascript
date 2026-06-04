const BASE_URL = "http://localhost:3000";

export async function getData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return await response.json();
}