<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import coupons from '@/data/coupon.js';
import { useCart } from '@/store/cart.js';
import { useSession } from '@/auth/session';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { isAuthenticated } = useSession();

const coupon = computed(() =>
  coupons.find((s) => s.id === Number(route.params.id)),
);

const addedFeedback = ref(false);

function handleAddToCart() {
  if (!isAuthenticated.value) {
    router.push({ name: 'SignIn' });
    return;
  }
  addToCart(coupon.value.id);
  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
  }, 1500);
}

// Busca el “scroll container” real (si existiera)
function getScrollContainer() {
  // 1) Si tienes un contenedor layout con overflow, ponle un id y úsalo aquí.
  // return document.querySelector('#app-scroll');

  // 2) Fallbacks comunes:
  return document.scrollingElement || document.documentElement || document.body;
}

async function forceScrollTop() {
  await nextTick();

  // 1) Scroll del documento
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // 2) Scroll del contenedor real (si no es window)
  const el = getScrollContainer();
  if (el) el.scrollTop = 0;

  // 3) Doble “refuerzo” por si hay imágenes/iframes que cambian el layout después
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const el2 = getScrollContainer();
    if (el2) el2.scrollTop = 0;
  }, 50);

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const el3 = getScrollContainer();
    if (el3) el3.scrollTop = 0;
  }, 250);
}

onMounted(() => {
  forceScrollTop();
});

// IMPORTANTE: si cambias entre servicios (id cambia), vuelve a forzar scroll
watch(
  () => route.params.id,
  () => {
    forceScrollTop();
  },
);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="container">
    <div v-if="coupon" class="coupon-wrapper">
      <!-- regresar -->
      <router-link to="/Coupon-item" class="return-area">
        <button class="card-button">Regresar</button>
      </router-link>

      <!-- titulo -->
      <h1 class="title">{{ coupon.name }}</h1>

      <!-- imagen -->
      <img
        v-if="coupon.image"
        class="coupon-image-details"
        :src="coupon.image"
      />

      <!-- badge -->
      <div class="coupon-badge">
        {{ coupon.percentage }}
      </div>

      <!-- precios -->
      <div class="coupon-prices">
        <span class="original-price">S/ {{ coupon.original_price }}</span>
        <span class="discount-price">S/ {{ coupon.discount_price }}</span>
      </div>

      <!-- descripción -->
      <div class="text-coupon-type">
        {{ coupon.longDescription }}
      </div>

      <!-- info -->
      <div class="coupon-details">
        <div class="coupon-info">
          <div class="info-item">
            <span class="label">Categoría</span>
            <span class="value">{{ coupon.category }}</span>
          </div>

          <div class="info-item">
            <span class="label">Válido hasta</span>
            <span class="value">{{ coupon.expiration_date }}</span>
          </div>

          <div class="info-item">
            <span class="label">Términos</span>
            <span class="value">{{ coupon.Terms_of_use }}</span>
          </div>
        </div>

        <div class="coupon-code">
          <span>Código:</span>
          <strong>{{ coupon.coupon_code }}</strong>
        </div>

        <button class="buy-button" @click="handleAddToCart">
          {{ addedFeedback ? '✓ Agregado' : 'Agregar al carrito' }}
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Servicio no encontrado.</p>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>
<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: Outfit, Inter, Avenir, Helvetica, Arial, sans-serif;
}

.coupon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.return-area {
  align-self: flex-start;
  margin-bottom: 20px;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #111;
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  width: 70px;
  height: 4px;
  background-color: #325bcd;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
}

.coupon-image-details {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.text-coupon-type {
  max-width: 800px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 40px;
}

.coupon-prices {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
}

.original-price {
  text-decoration: line-through;
  color: #dcdcdc;
  font-size: 0.95rem;
}

.discount-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1f1f1f;
}

.coupon-details {
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
}

/* contenedor de información */
.coupon-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

/* cada dato */
.info-item {
  background: #f7f7f7;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: left;
}

/* etiqueta */
.label {
  display: block;
  font-size: 0.85rem;
  color: #777;
}

/* valor */
.value {
  font-weight: 600;
  color: #222;
}

/* código del cupón */
.coupon-code {
  background: #325bcd;
  color: white;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

/* botón comprar */
.buy-button {
  width: 100%;
  background: #1f1f1f;
  color: white;
  border: none;
  padding: 14px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.buy-button:hover {
  background: #000;
}

.card-button {
  background-color: #325bcd;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.coupon-badge {
  top: 10px;
  right: 10px;
  background: #ffd700;
  color: #000;
  font-weight: bold;
  padding: 6px 10px;
  border-radius: 6px;
}

.card-button:hover {
  background-color: #325bcd;
}

.not-found {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.2rem;
  color: #666;
}
</style>
