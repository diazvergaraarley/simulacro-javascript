import { login } from "../services/authService.js";

import { navigate } from "../router/router.js";

export function renderLoginView() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div>
      <h1>Login</h1>

      <form id="login-form">
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            required
          >
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            required
          >
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      <p id="message"></p>
    </div>
  `;

  const form = document.getElementById("login-form");

  form.addEventListener("submit", handleLogin);
}

async function handleLogin(event) {
  event.preventDefault();

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const message =
    document.getElementById("message");

  try {
    const user = await login(
      email,
      password
    );

    navigate("dashboard");

  } catch (error) {

    message.textContent =
      error.message;
  }
}