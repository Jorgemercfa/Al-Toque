const STORAGE_KEY = 'al-toque-session-company'; // ← DIFERENTE a session_companies.js

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getCompanies() {
  return safeParse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function findCompanyByRuc(ruc) {
  const normalized = String(ruc || '')
    .trim()
    .toLowerCase();
  return (
    getCompanies().find((u) => u.ruc?.toLowerCase() === normalized) || null
  );
}

export function addCompany({ name, ruc, password }) {
  const companies = getCompanies();

  const normalizedRuc = String(ruc || '')
    .trim()
    .toLowerCase();
  const exists = companies.some((u) => u.ruc?.toLowerCase() === normalizedRuc);
  if (exists) {
    throw new Error('Este RUC ya está registrado.');
  }

  const newCompany = {
    id: Date.now(),
    name: String(name || '').trim(),
    ruc: normalizedRuc,
    password: String(password),
    coupons: [],
  };

  companies.push(newCompany);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));

  return newCompany;
}
