const STORAGE_KEY = 'al-toque-company-plans';

function safeParse(json) {
  if (!json) return {};

  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function buildCompanyKey(company) {
  if (!company) return '';
  return String(company.id || company.ruc || '').trim();
}

export function getCompanyPlansMap() {
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

export function saveCompanyPlan(company, planId) {
  const key = buildCompanyKey(company);
  if (!key) return;

  const plansMap = getCompanyPlansMap();
  plansMap[key] = {
    planId,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(plansMap));
}

export function getCompanyPlan(company) {
  const key = buildCompanyKey(company);
  if (!key) return 'basic';

  const plansMap = getCompanyPlansMap();
  return plansMap[key]?.planId || 'basic';
}

export function getMonthlyCouponLimitForPlan(planId) {
  return planId === 'premium' ? 40 : 20;
}
