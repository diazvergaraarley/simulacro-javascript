import { renderLoginView } from "../views/loginView.js";
import { renderDashboardView } from "../views/dashboardView.js";
import { getSession } from "../storage/session.js";

export function navigate(view) {
  const user = getSession();

  // =========================
  // 1. SIN SESIÓN → SOLO LOGIN
  // =========================
  if (!user) {
    renderLoginView();
    return;
  }

  // =========================
  // 2. ROUTING PROTEGIDO
  // =========================
  switch (view) {
    case "login":
      renderLoginView();
      break;

    case "dashboard":
      renderDashboardView();
      break;

    default:
      renderDashboardView();
  }

}
