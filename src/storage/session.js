const SESSION_KEY = "currentUser";

export function saveSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user)
  );
}

export function getSession() {
  try {
    const user = localStorage.getItem(SESSION_KEY);

    if (!user) return null;

    return JSON.parse(user);
  } catch (error) {
    // si el JSON está corrupto, limpiamos sesión
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}