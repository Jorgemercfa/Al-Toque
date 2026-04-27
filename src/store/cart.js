import { reactive, computed } from 'vue';
import { getCompanyCoupons, acquireCodeForUser } from '@/auth/companyCouponsRepo';
import { useSession } from '@/auth/session';

const STORAGE_KEY = 'al-toque-cart';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const stored = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  items: [],
  purchasedCoupons: [],
};

const state = reactive({
  items: stored.items || [],
  purchasedCoupons: stored.purchasedCoupons || [],
});

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      items: state.items,
      purchasedCoupons: state.purchasedCoupons,
    }),
  );
}

export function useCart() {
  const { state: sessionState } = useSession();
  const coupons = computed(() => getCompanyCoupons());

  function addToCart(couponId) {
    const existing = state.items.find((i) => i.couponId === couponId);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.items.push({ couponId, quantity: 1 });
    }
    persist();
  }

  function removeFromCart(couponId) {
    const idx = state.items.findIndex((i) => i.couponId === couponId);
    if (idx !== -1) {
      state.items.splice(idx, 1);
      persist();
    }
  }

  function updateQuantity(couponId, qty) {
    const item = state.items.find((i) => i.couponId === couponId);
    if (item) {
      item.quantity = Math.max(1, qty);
      persist();
    }
  }

  function clearCart() {
    state.items.splice(0);
    persist();
  }

  const cartItems = computed(() =>
    state.items
      .map((item) => {
        const coupon = coupons.value.find((c) => c.id === item.couponId);
        if (!coupon) return null;
        return { ...coupon, quantity: item.quantity };
      })
      .filter(Boolean),
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.discount_price * item.quantity,
      0,
    ),
  );

  const cartCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  function claimFreeCoupons() {
    const userId = sessionState.user?.id ?? null;
    if (!userId) return;

    const purchased = [];

    for (const item of cartItems.value) {
      const alreadyOwned = state.purchasedCoupons.some(
        (owned) => owned.userId === userId && owned.id === item.id,
      );
      if (alreadyOwned) continue;

      const assignedCode = acquireCodeForUser(item.id, userId);
      if (!assignedCode) {
        console.warn(`No hay códigos disponibles para el cupón "${item.name}" (id: ${item.id}). Se omite.`);
        continue;
      }

      purchased.push({
        ...item,
        discount_price: 0,
        original_price: item.original_price ?? item.discount_price,
        purchasedAt: new Date().toISOString(),
        userId,
        uniqueCode: assignedCode.uniqueCode,
        deadline: assignedCode.deadline,
      });
    }

    if (purchased.length > 0) {
      state.purchasedCoupons.push(...purchased);
    }

    clearCart();
    persist();
  }

  function checkout() {
    // Checkout de pago eliminado para cupones:
    // ahora los cupones se adquieren gratis al confirmar desde el carrito.
    claimFreeCoupons();
  }

  function getPurchasedCoupons(userId) {
    const now = Date.now();
    const before = state.purchasedCoupons.length;
    const valid = state.purchasedCoupons.filter((c) => {
      if (c.userId !== userId) return true;
      if (!c.deadline) return true;
      const deadline = new Date(c.deadline);
      if (Number.isNaN(deadline.getTime())) return true;
      return deadline.getTime() >= now;
    });

    if (valid.length !== before) {
      state.purchasedCoupons.splice(0, state.purchasedCoupons.length, ...valid);
      persist();
    }

    return valid.filter((c) => c.userId === userId);
  }

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    claimFreeCoupons,
    getPurchasedCoupons,
  };
}
