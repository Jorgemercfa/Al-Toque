const STORAGE_KEY = 'al-toque-companies';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getCompany() {
  return safeParse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function findUserByRuc(ruc) {
  const normalized = String(ruc || '')
    .trim()
    .toLowerCase();
  return getCompany().find((u) => u.ruc?.toLowerCase() === normalized) || null;
}

export function addUser({ name, ruc, password }) {
  const companies = getCompany();

  const normalizedRuc = String(ruc || '')
    .trim()
    .toLowerCase();
  const exists = companies.some((u) => u.ruc?.toLowerCase() === normalizedRuc);
  if (exists) {
    throw new Error('Este RUC ya está registrado.');
  }

  const newUser = {
    id: Date.now(),
    name: String(name || '').trim(),
    ruc: normalizedRuc,
    password: String(password),
    coupons: [],
  };

  companies.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));

  return newUser;
}
