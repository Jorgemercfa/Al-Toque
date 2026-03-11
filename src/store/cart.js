import { reactive, computed } from 'vue';
import coupons from '@/data/coupon.js';
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    items: state.items,
    purchasedCoupons: state.purchasedCoupons,
  }));
}

export function useCart() {
  const { state: sessionState } = useSession();

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
        const coupon = coupons.find((c) => c.id === item.couponId);
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

  function checkout() {
    const userId = sessionState.user?.id ?? null;
    const purchased = cartItems.value.map((item) => ({
      ...item,
      purchasedAt: new Date().toISOString(),
      userId,
    }));
    state.purchasedCoupons.push(...purchased);
    clearCart();
    persist();
  }

  function getPurchasedCoupons(userId) {
    return state.purchasedCoupons.filter((c) => c.userId === userId);
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
    getPurchasedCoupons,
  };
}
