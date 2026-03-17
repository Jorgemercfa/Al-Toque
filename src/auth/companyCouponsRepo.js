import couponsSeed from '@/data/coupon';

const STORAGE_KEY = 'al-toque-company-coupons';

function safeParse(json) {
  if (!json) return [];

  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Error leyendo cupones de empresa:', error);
    return [];
  }
}

export function getCompanyCoupons() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));

  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }

  const normalizedSeed = couponsSeed.map((coupon) => ({
    ...coupon,
    companyId: null,
    companyName: coupon.name || '',
    companyRuc: null,
    createdAt: null,
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSeed));

  return normalizedSeed;
}

export function saveCompanyCoupons(coupons) {
  if (!Array.isArray(coupons)) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
}

function nextCouponId(coupons) {
  const maxId = coupons.reduce(
    (max, coupon) => (coupon?.id > max ? coupon.id : max),
    0,
  );

  return maxId + 1;
}

export function addCompanyCoupon(couponInput) {
  const coupons = getCompanyCoupons();

  const coupon = {
    ...couponInput,
    id: nextCouponId(coupons),
    createdAt: new Date().toISOString(),
  };

  coupons.push(coupon);
  saveCompanyCoupons(coupons);

  return coupon;
}

export function getCouponsByCompany(company) {
  if (!company) return [];

  const coupons = getCompanyCoupons();

  return coupons.filter(
    (coupon) =>
      coupon.companyId === company.id ||
      (coupon.companyRuc && coupon.companyRuc === company.ruc),
  );
}
