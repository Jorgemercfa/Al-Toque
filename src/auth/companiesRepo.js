const STORAGE_KEY = 'al-toque-companies';

/**
 * Obtener empresas del localStorage
 */
export function getCompanies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Error leyendo empresas:', error);
    return [];
  }
}

/**
 * Guardar empresas
 */
export function saveCompanies(companies) {
  if (!Array.isArray(companies)) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
}

/**
 * Registrar nueva empresa
 */
export function addCompany(company) {
  const companies = getCompanies();

  companies.push(company);

  saveCompanies(companies);
}
