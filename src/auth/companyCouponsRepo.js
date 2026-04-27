import couponsSeed from '@/data/coupon';

const STORAGE_KEY = 'al-toque-company-coupons';
const MS_IN_DAY = 24 * 60 * 60 * 1000;

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

function normalizeDate(value) {
  if (!value) return null;

  const raw = String(value).trim();
  if (!raw) return null;

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [dd, mm, yyyy] = raw.split('/').map(Number);
    const parsed = new Date(yyyy, mm - 1, dd);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function toEndOfDayIso(dateLike) {
  const parsed = new Date(dateLike);
  if (Number.isNaN(parsed.getTime())) return null;

  parsed.setHours(23, 59, 59, 999);
  return parsed.toISOString();
}

function buildUniqueAcquiredCodes(couponCode, amount, deadlineIso) {
  const base = (couponCode || 'CUPON').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);

  return Array.from({ length: amount }, (_, index) => {
    const suffix = Math.random().toString(36).substring(2, 7).toUpperCase();

    return {
      id: `${base}-${index + 1}-${Date.now()}-${suffix}`,
      uniqueCode: `${base}-${(index + 1).toString().padStart(3, '0')}-${suffix}`,
      status: 'activo',
      createdAt: new Date().toISOString(),
      deadline: deadlineIso,
      redeemedAt: null,
    };
  });
}

function sanitizeCoupon(coupon) {
  const expiration = normalizeDate(coupon.expiration_date);
  const expirationDeadline = expiration ? toEndOfDayIso(expiration) : null;

  return {
    ...coupon,
    companyId: coupon.companyId ?? null,
    companyName: coupon.companyName ?? coupon.name ?? '',
    companyRuc: coupon.companyRuc ?? null,
    createdAt: coupon.createdAt ?? null,
    expiration_date: expiration ?? coupon.expiration_date,
    monthlyPlan: coupon.monthlyPlan || 'basic',
    totalCoupons: Number(coupon.totalCoupons) > 0 ? Number(coupon.totalCoupons) : 50,
    acquiredCodes:
      Array.isArray(coupon.acquiredCodes) && coupon.acquiredCodes.length > 0
        ? coupon.acquiredCodes
        : buildUniqueAcquiredCodes(coupon.coupon_code, 50, expirationDeadline),
  };
}

export function isCodeExpired(code) {
  if (!code?.deadline) return false;
  const deadline = new Date(code.deadline);
  if (Number.isNaN(deadline.getTime())) return false;

  return deadline.getTime() < Date.now();
}

function removeExpiredCodes(coupon) {
  if (!Array.isArray(coupon.acquiredCodes)) {
    return { ...coupon, acquiredCodes: [] };
  }

  return {
    ...coupon,
    acquiredCodes: coupon.acquiredCodes.filter((code) => !isCodeExpired(code)),
  };
}

export function getCompanyCoupons() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));

  if (Array.isArray(stored) && stored.length > 0) {
    const withCleanup = stored.map((coupon) => removeExpiredCodes(sanitizeCoupon(coupon)));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withCleanup));
    return withCleanup;
  }

  const normalizedSeed = couponsSeed.map((coupon) => {
    const expiration = normalizeDate(coupon.expiration_date);
    const deadline = expiration ? toEndOfDayIso(expiration) : null;

    return {
      ...coupon,
      expiration_date: expiration,
      companyId: null,
      companyName: coupon.name || '',
      companyRuc: null,
      createdAt: null,
      totalCoupons: 50,
      monthlyPlan: 'basic',
      acquiredCodes: buildUniqueAcquiredCodes(coupon.coupon_code, 50, deadline),
    };
  });

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
  const expiration = normalizeDate(couponInput.expiration_date);
  const deadline = expiration ? toEndOfDayIso(expiration) : null;
  const totalCoupons = Number(couponInput.totalCoupons) || 50;

  const coupon = {
    ...couponInput,
    id: nextCouponId(coupons),
    createdAt: new Date().toISOString(),
    expiration_date: expiration,
    totalCoupons,
    acquiredCodes: buildUniqueAcquiredCodes(couponInput.coupon_code, totalCoupons, deadline),
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

export function getCouponsCreatedThisMonth(company) {
  const coupons = getCouponsByCompany(company);
  const now = new Date();

  return coupons.filter((coupon) => {
    if (!coupon.createdAt) return false;
    const createdAt = new Date(coupon.createdAt);
    return (
      createdAt.getFullYear() === now.getFullYear() &&
      createdAt.getMonth() === now.getMonth()
    );
  });
}

export function redeemCompanyCouponCode(company, uniqueCode) {
  const coupons = getCompanyCoupons();
  const normalizedCode = String(uniqueCode || '').trim().toUpperCase();

  if (!normalizedCode) {
    return { ok: false, message: 'Ingresa un código válido.' };
  }

  const companyCoupons = coupons.filter(
    (coupon) =>
      coupon.companyId === company?.id ||
      (coupon.companyRuc && coupon.companyRuc === company?.ruc),
  );

  for (const coupon of companyCoupons) {
    const codeIndex = coupon.acquiredCodes?.findIndex(
      (code) => code.uniqueCode.toUpperCase() === normalizedCode,
    );

    if (codeIndex === -1 || codeIndex == null) continue;

    const matchedCode = coupon.acquiredCodes[codeIndex];

    if (isCodeExpired(matchedCode)) {
      coupon.acquiredCodes.splice(codeIndex, 1);
      saveCompanyCoupons(coupons);
      return { ok: false, message: 'El código expiró y fue eliminado automáticamente.' };
    }

    if (matchedCode.status === 'canjeado') {
      return { ok: false, message: 'Este código ya fue canjeado.' };
    }

    coupon.acquiredCodes[codeIndex] = {
      ...matchedCode,
      status: 'canjeado',
      redeemedAt: new Date().toISOString(),
    };
    saveCompanyCoupons(coupons);

    return {
      ok: true,
      message: `Código canjeado correctamente para ${coupon.name}.`,
      couponName: coupon.name,
    };
  }

  return { ok: false, message: 'Código no encontrado para esta empresa.' };
}

export function getCompanyCouponsStats(company) {
  const companyCoupons = getCouponsByCompany(company);

  const withStats = companyCoupons.map((coupon) => {
    const codes = Array.isArray(coupon.acquiredCodes) ? coupon.acquiredCodes : [];
    const sold = codes.filter((code) => code.status === 'canjeado').length;
    const active = codes.filter((code) => code.status === 'activo').length;

    return {
      ...coupon,
      sold,
      active,
    };
  });

  const soldTotal = withStats.reduce((sum, coupon) => sum + coupon.sold, 0);
  const activeTotal = withStats.reduce((sum, coupon) => sum + coupon.active, 0);

  const bestSeller = [...withStats].sort((a, b) => b.sold - a.sold)[0] || null;

  return {
    soldTotal,
    activeTotal,
    totalCoupons: withStats.length,
    bestSeller,
    coupons: withStats,
  };
}

export function acquireCodeForUser(couponId, userId) {
  const coupons = getCompanyCoupons();
  const coupon = coupons.find((c) => c.id === couponId);

  if (!coupon || !Array.isArray(coupon.acquiredCodes)) return null;

  const codeIndex = coupon.acquiredCodes.findIndex(
    (code) => code.status === 'activo' && !isCodeExpired(code),
  );

  if (codeIndex === -1) return null;

  coupon.acquiredCodes[codeIndex] = {
    ...coupon.acquiredCodes[codeIndex],
    status: 'adquirido',
    acquiredBy: userId,
    acquiredAt: new Date().toISOString(),
  };

  saveCompanyCoupons(coupons);

  return coupon.acquiredCodes[codeIndex];
}

export function isCouponActive(coupon) {
  const expirationDate = normalizeDate(coupon?.expiration_date);
  if (!expirationDate) return true;
  const expirationMs = new Date(expirationDate).getTime() + MS_IN_DAY - 1;

  return expirationMs >= Date.now();
}
