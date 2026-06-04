import { getProjects, createProject } from "../services/projectService.js";
import { clearSession } from "../storage/session.js";
import { navigate } from "../router/router.js";
import { getSession } from "../storage/session.js";

export async function renderDashboardView() {
  const app = document.getElementById("app");
  const user = getSession();
  let projects = await getProjects();

  if (user.role === "collaborator") {
    projects = projects.filter(
      p => p.assignedTo === user.id
    );
  }

  app.innerHTML = `
    <div>
      <h1>Dashboard</h1>

      ${user.role === "manager" ? `
        <h2>Create Project</h2>
      
        <form id="project-form">
          <input id="name" placeholder="Name" required />
          <input id="description" placeholder="Description" required />
      
          <select id="status">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Finished</option>
          </select>
      
          <button type="submit">Create</button>
        </form>
      ` : ""}
      
      <h2>Projects</h2>
      <ul id="project-list"></ul>

      <button id="logout-btn">Logout</button>
    </div>
  `;

  const list = document.getElementById("project-list");

  function renderProjects(projects) {
    list.innerHTML = "";

    projects.forEach(project => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${project.name}</strong> - ${project.status}
        <p>${project.description}</p>
      `;

      list.appendChild(li);
    });
  }

  renderProjects(projects);

  document
    .getElementById("logout-btn")
    .addEventListener("click", () => {
      clearSession();
      navigate("login");
    });

  const form = document.getElementById("project-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const newProject = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        assignedTo: user.id,
        createdAt: new Date().toISOString()
      };
    
      await createProject(newProject);
    
      const updatedProjects = await getProjects();
      renderProjects(updatedProjects);
    
      form.reset();
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newProject = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      status: document.getElementById("status").value,
      assignedTo: 1,
      createdAt: new Date().toISOString()
    };

    await createProject(newProject);

    const updatedProjects = await getProjects();
    renderProjects(updatedProjects);

    form.reset();
  });
}