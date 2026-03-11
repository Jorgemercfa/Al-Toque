const STORAGE_KEY = 'al-toque-users';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getUsers() {
  return safeParse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function findUserByEmail(email) {
  const normalized = String(email || '')
    .trim()
    .toLowerCase();
  return getUsers().find((u) => u.email?.toLowerCase() === normalized) || null;
}

export function addUser({ name, email, password }) {
  const users = getUsers();

  const normalizedEmail = String(email || '')
    .trim()
    .toLowerCase();
  const exists = users.some((u) => u.email?.toLowerCase() === normalizedEmail);
  if (exists) {
    throw new Error('Este correo ya está registrado.');
  }

  const newUser = {
    id: Date.now(),
    name: String(name || '').trim(),
    email: normalizedEmail,
    password: String(password),
    coupons: [],
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return newUser;
}
