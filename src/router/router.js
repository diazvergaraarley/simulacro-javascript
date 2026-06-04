import { renderLoginView } from "../views/loginView.js";
import { renderDashboardView } from "../views/dashboardView.js";

export function navigate(view) {
  switch (view) {
    case "login":
      renderLoginView();
      break;

    case "dashboard":
      renderDashboardView();
      break;

    default:
      renderLoginView();
  }
}