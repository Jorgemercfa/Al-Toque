<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { ref, onMounted, onBeforeUnmount } from 'vue';
import coupons from '@/data/coupon.js';

/* =============================
   CARRUSEL PRINCIPAL
============================= */
import img1 from '@/assets/picture1.png';
import img2 from '@/assets/picture2.png';
import img3 from '@/assets/picture3.png';
import img4 from '@/assets/picture4.png';

const images = [img1, img2, img3, img4];

const currentImageIndex = ref(0);
const intervalId = ref(null);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

const startCarousel = () => {
  stopCarousel();
  intervalId.value = setInterval(nextImage, 5000);
};

const stopCarousel = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  startCarousel();
});

onBeforeUnmount(() => {
  stopCarousel();
});

/* =============================
   CLIENTES
============================= */
import c1 from '@/assets/customer-1.jpg';
import c2 from '@/assets/customer-2.png';
import c3 from '@/assets/customer-3.png';
import c4 from '@/assets/customer-4.png';
import c5 from '@/assets/customer-5.png';
import c6 from '@/assets/customer-6.png';
import c7 from '@/assets/customer-7.png';
import c8 from '@/assets/customer-8.png';
import c9 from '@/assets/customer-9.png';
import c10 from '@/assets/customer-10.png';
import c11 from '@/assets/customer-11.png';
import c12 from '@/assets/customer-12.png';

const customers = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12];
const duplicatedCustomers = [...customers, ...customers];

/* =============================
   CARRUSEL CUPONES (HORIZONTAL)
============================= */
const couponsTrackRef = ref(null);

const scrollCouponsBy = (direction) => {
  const el = couponsTrackRef.value;
  if (!el) return;

  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  const gap = 20;
  const step = cardWidth + gap;

  el.scrollBy({ left: direction * step, behavior: 'smooth' });
};

const scrollCouponsLeft = () => scrollCouponsBy(-1);
const scrollCouponsRight = () => scrollCouponsBy(1);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="home-area">
    <!-- Carrusel automático -->
    <div class="carousel-container">
      <img class="img-home" :src="images[currentImageIndex]" />
      <div class="carousel-dots">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: index === currentImageIndex }"
          @click="currentImageIndex = index"
        ></span>
      </div>
    </div>

    <div class="text-home">
      Al Toque simplifica la forma de comprar en línea, conectando empresas y
      usuarios mediante ofertas reales en tiempo real y compras directas desde
      las páginas oficiales.
    </div>

    <h1 class="title-home">Ofertas destacadas</h1>

    <!-- Carrusel de cupones -->
    <div class="our-coupons-wrapper">
      <button
        class="coupons-nav coupons-nav-left"
        type="button"
        aria-label="Anterior"
        @click="scrollCouponsLeft"
      >
        ‹
      </button>

      <div class="our-coupons" ref="couponsTrackRef">
        <router-link
          v-for="coupon in coupons"
          :key="coupon.id"
          :to="{ name: 'CouponsDetails', params: { id: coupon.id } }"
          class="logs-item"
        >
          <div class="coupon-mini-badge">
            {{ coupon.percentage }}
          </div>

          <img class="card-icons" :src="coupon.image" :alt="coupon.name" />

          <div class="coupon-mini-info">
            <h4 class="coupon-mini-title">
              {{ coupon.name }}
            </h4>

            <div class="coupon-mini-price">S/ {{ coupon.discount_price }}</div>

            <div class="coupon-mini-date">
              Hasta {{ coupon.expiration_date }}
            </div>
          </div>
        </router-link>
      </div>

      <button
        class="coupons-nav coupons-nav-right"
        type="button"
        aria-label="Siguiente"
        @click="scrollCouponsRight"
      >
        ›
      </button>
    </div>

    <h1 class="title-home">Ofertas Restaurantes</h1>
    <div class="our-sector">
      <div class="logs-item">
        <img class="card-icons" src="@/assets/office.svg" alt="office" />
        <div>OFICINAS</div>
      </div>

      <div class="logs-item">
        <img
          class="card-icons"
          src="@/assets/restaurant.svg"
          alt="restaurant"
        />
        <div>RESTAURANTES</div>
      </div>

      <div class="logs-item">
        <img class="card-icons" src="@/assets/storage.svg" alt="storage" />
        <div>ALMACENES</div>
      </div>

      <div class="logs-item">
        <img class="card-icons" src="@/assets/factory.svg" alt="factory" />
        <div>PLANTAS DE PRODUCCIÓN</div>
      </div>

      <div class="logs-item">
        <img
          class="card-icons"
          src="@/assets/laboratory.svg"
          alt="laboratory"
        />
        <div>LABORATORIOS</div>
      </div>

      <div class="logs-item">
        <img class="card-icons" src="@/assets/store.svg" alt="store" />
        <div>LOCALES COMERCIALES</div>
      </div>
    </div>

    <h1 class="title-home">Empresas con las que trabajamos</h1>
    <div class="our-customers">
      <div class="customers-track">
        <div
          class="customer-slide"
          v-for="customer in duplicatedCustomers"
          :key="customer"
        >
          <img :src="customer" class="customer-icons" />
        </div>
      </div>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
/* ===============================
   HERO / CARRUSEL PRINCIPAL
================================= */
.img-home {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  object-fit: cover;
  object-position: center 30%;
  transition: opacity 0.8s ease;
}

.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 1;
}

.carousel-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  background: rgba(255, 255, 255, 0.45);
}

.carousel-dots .active {
  background: #325bcd;
  transform: scale(1.2);
}

/* ===============================
   TEXTO + TITULOS
================================= */
.text-home {
  max-width: 900px;
  margin: 60px auto;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
}

.title-home {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 80px 0 40px 0;
  position: relative;
}

.title-home::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #325bcd;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

/* ===============================
   CUPONES: CARRUSEL HORIZONTAL
================================= */
.our-coupons-wrapper {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #325bcd, #2549ad);
  padding: 40px 60px;
}

.our-coupons {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 20px 0;
}

.our-coupons::-webkit-scrollbar {
  height: 8px;
}

.our-coupons::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 10px;
}

.coupons-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  display: grid;
  place-items: center;
  z-index: 2;
}

.coupons-nav-left {
  left: 14px;
}

.coupons-nav-right {
  right: 14px;
}

/* Card reutilizada */
.logs-item {
  scroll-snap-align: start;
  flex: 0 0 220px;
  min-height: 240px;
  position: relative;
  background: #1f1f1f;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: 0.25s;
}

.logs-item:hover {
  transform: translateY(-4px);
}

.card-icons {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: white;
}

.coupon-mini-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.coupon-mini-price {
  font-weight: bold;
  color: #ffffff;
}

.coupon-mini-date {
  font-size: 0.8rem;
  color: #ffffff;
}

.coupon-mini-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffd700;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* ===============================
   SECTORES (se queda como está)
================================= */
.our-sector {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #325bcd, #2549ad);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* ===============================
   CLIENTES (carrusel infinito)
================================= */
.our-customers {
  overflow: hidden;
  background: linear-gradient(135deg, #325bcd, #2549ad);
  padding: 80px 0;
  position: relative;
}

.customers-track {
  display: flex;
  width: max-content;
  animation: scrollCustomers 25s linear infinite;
}

.customer-slide {
  flex: 0 0 auto;
  padding: 0 40px;
}

.customer-icons {
  height: 60px;
  width: auto;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.customer-icons:hover {
  transform: scale(1.1);
}

@keyframes scrollCustomers {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* ===============================
   RESPONSIVE
================================= */
@media (max-width: 768px) {
  .img-home {
    height: 55vh;
    min-height: 280px;
  }

  .text-home {
    font-size: 16px;
    padding: 0 20px;
    margin: 40px auto;
  }

  .title-home {
    font-size: 26px;
    margin: 60px 0 30px 0;
  }

  .our-coupons-wrapper {
    padding: 30px 45px;
  }

  .logs-item {
    flex-basis: 180px;
    min-height: 220px;
  }

  .our-sector {
    height: auto;
    flex-wrap: wrap;
    padding: 50px 20px;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .img-home {
    height: 45vh;
  }

  .title-home {
    font-size: 22px;
  }

  .logs-item {
    flex-basis: 160px;
  }

  .customer-icons {
    height: 45px;
  }
}
</style>
