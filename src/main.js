import { navigate } from "./router/router.js";
import { getSession } from "./storage/session.js";

const user = getSession();

if (user) {
  navigate("dashboard");
} else {
  navigate("login");
}