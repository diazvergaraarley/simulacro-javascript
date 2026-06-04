▶️ Running the Project
Start development server
npm run dev
Start JSON Server (API)
npm run server

API runs on:

http://localhost:3000
📂 Project Structure
src/
│
├── assets/
├── components/
├── router/
│   └── router.js
├── services/
│   ├── api.js
│   ├── authService.js
│   └── projectService.js
├── storage/
│   └── session.js
├── utils/
│   └── alerts.js
├── views/
│   ├── loginView.js
│   ├── dashboardView.js
│   └── projectsView.js
├── main.js
└── styles/
    └── style.css
🔐 Authentication Flow
Login validates users against json-server
On success, user session is stored in localStorage
Session persists after page reload
Logout clears session storage
👥 Role Permissions
Manager
Create projects
View all projects
Edit any project
Delete projects
View dashboard statistics
Collaborator
View only assigned projects
Update status of assigned projects only
No access to administrative actions
📊 Features
SPA navigation (no page reload)
Authentication system
Role-based UI rendering
CRUD operations (Create, Read, Update, Delete)
Session persistence
Dashboard statistics per role
🧠 Technical Decisions
Vanilla JS chosen to demonstrate core JavaScript skills
json-server used to simulate REST API
Modular architecture for scalability
localStorage used for session persistence
Router-based SPA without external frameworks
🚪 Logout Behavior
Manual logout button available
Session is cleared from localStorage
User is redirected to login view

---

# 🧱 2. GUÍA PARA RECONSTRUIR EL PROYECTO (PASO A PASO)

📄 Esto puedes guardarlo como:


SETUP_GUIDE.md


---

# 🧩 PASO A PASO COMPLETO

---

## 1. Crear proyecto base

```bash
npm create vite@latest project-management-spa
cd project-management-spa
npm install

Elegir:

Vanilla
JavaScript
2. Instalar json-server
npm install json-server
3. Configurar package.json

Agregar scripts:

"scripts": {
  "dev": "vite",
  "server": "json-server --watch db.json --port 3000",
  "build": "vite build",
  "preview": "vite preview"
}
4. Crear estructura de carpetas

Dentro de src/ crear:

assets/
components/
router/
services/
storage/
utils/
views/
styles/
5. Crear archivo db.json

Ubicación raíz del proyecto:

db.json

Contendrá:

users
projects
6. Crear API layer

📂 src/services/api.js

Crear constante BASE_URL
Implementar función fetch genérica GET
7. Crear authService

📂 src/services/authService.js

Obtener usuarios desde API
Validar email + password
Guardar usuario en session storage
8. Crear projectService

📂 src/services/projectService.js

Implementar:

GET projects
POST create project
DELETE project
PATCH/PUT update project
9. Crear session storage

📂 src/storage/session.js

Funciones:

saveSession(user)
getSession()
clearSession()
10. Crear router

📂 src/router/router.js

Función navigate(view)
Control de rutas:
login
dashboard
Validación de sesión antes de renderizar
11. Crear views

📂 src/views/loginView.js

Form login
Evento submit
Llamar authService
Redirigir a dashboard

📂 src/views/dashboardView.js

Obtener sesión
Filtrar proyectos por rol
Render dinámico
CRUD UI
Estadísticas por rol
12. main.js (entry point)
Leer sesión
Redirigir automáticamente:
si hay usuario → dashboard
si no → login
13. Levantar servidor

Terminal 1:

npm run server

Terminal 2:

npm run dev