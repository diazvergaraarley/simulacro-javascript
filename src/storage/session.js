const SESSION_KEY = "currentUser";

export function saveSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user)
  );
}

export function getSession() {
  const user = localStorage.getItem(SESSION_KEY);

  return user ? JSON.parse(user) : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}