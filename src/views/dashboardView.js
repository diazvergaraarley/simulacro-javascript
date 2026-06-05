import {
  getProjects,
  createProject,
  deleteProject,
  updateProject
} from "../services/projectService.js";

import { clearSession } from "../storage/session.js";
import { navigate } from "../router/router.js";
import { getSession } from "../storage/session.js";

export async function renderDashboardView() {
  const app = document.getElementById("app");
  const user = getSession();

  let projects = await getProjects();

  // FILTRO COLLABORATOR
  if (user.role === "collaborator") {
    projects = projects.filter(
      p => Number(p.assignedTo) === Number(user.id)
    );
  }

  // =========================
  // ESTADÍSTICAS DASHBOARD
  // =========================
  let statsHTML = "";

  if (user.role === "manager") {
    const total = projects.length;
    const active = projects.filter(
      p => p.status === "In Progress"
    ).length;

    const finished = projects.filter(
      p => p.status === "Finished"
    ).length;

    statsHTML = `
      <div class="stats-card">
        <h3>Stats</h3>
        <p>Total: ${total}</p>
        <p>Active: ${active}</p>
        <p>Finished: ${finished}</p>
      </div>
    `;
  }

  if (user.role === "collaborator") {
    statsHTML = `
      <div>
        <h3>My Overview</h3>
        <p>Assigned Projects: ${projects.length}</p>
      </div>
    `;
  }

  // =========================
  // RENDER PRINCIPAL
  // =========================
  app.innerHTML = `
    <div class="dashboard">
      <h1>Dashboard</h1>

      ${statsHTML}

      ${
        user.role === "manager"
          ? `
        <h2>Create Project</h2>

        <form id="project-form" class="project-form">
          <input id="name" placeholder="Name" required />
          <input id="description" placeholder="Description" required />

          <select id="status">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Finished</option>
          </select>

          <button type="submit">Create</button>
        </form>
      `
          : ""
      }

      <h2>Projects</h2>
      <ul id="project-list" class="project-list"></ul>

      <button id="logout-btn">Logout</button>
    </div>
  `;

  const list = document.getElementById("project-list");

  function renderProjects(projects) {
    list.innerHTML = "";

    projects.forEach(project => {
      const li = document.createElement("li");
      li.classList.add("project-card");

      li.innerHTML = `
        <strong>${project.name}</strong>
        - ${project.status}

        <p>${project.description}</p>

        ${
          user.role === "manager"
            ? `
              <button class="edit-btn" data-id="${project.id}">
                Change Status
              </button>

              <button class="delete-btn" data-id="${project.id}">
                Delete
              </button>
            `
            : `
              <button class="edit-btn" data-id="${project.id}">
                Update Status
              </button>
            `
        }
      `;

      list.appendChild(li);
    });
  }

  renderProjects(projects);

  // DELETE + EDIT EVENTS
  list.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
      await deleteProject(id);

      const updatedProjects = await getProjects();
      renderProjects(updatedProjects);
    }

    if (e.target.classList.contains("edit-btn")) {
      const newStatus = prompt("New status:");

      if (!newStatus) return;

      await updateProject(id, {
        status: newStatus
      });

      const updatedProjects = await getProjects();
      renderProjects(updatedProjects);
    }
  });

  // LOGOUT
  document
    .getElementById("logout-btn")
    .addEventListener("click", () => {
      clearSession();
      navigate("login");
    });

  // CREATE (solo manager)
  const form = document.getElementById("project-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newProject = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        assignedTo: Number(user.id),
        createdAt: new Date().toISOString()
      };

      await createProject(newProject);

      const updatedProjects = await getProjects();
      renderProjects(updatedProjects);

      form.reset();
    });
  }
}