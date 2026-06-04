import { navigate } from "./router/router.js";
import { getSession } from "./storage/session.js";

// chequeo de sesión al iniciar la app
const user = getSession();

if (user) {
  navigate("dashboard");
} else {
  navigate("login");
}