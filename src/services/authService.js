import { getData } from "./api.js";
import { saveSession } from "../storage/session.js";

export async function login(email, password) {
  const users = await getData("users");

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  saveSession(user);

  return user;
}