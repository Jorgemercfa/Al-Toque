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
import img3 from '@/assets/picture3.jpg';
import img4 from '@/assets/picture4.png';

const images = [img1, img2, img3, img4];

const currentImageIndex = ref(0);
const intervalId = ref(null);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

/* iniciar carrusel */

const startCarousel = () => {
  stopCarousel();
  intervalId.value = setInterval(nextImage, 5000);
};

/* detener carrusel */

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

/* duplicamos para animación infinita */

const duplicatedCustomers = [...customers, ...customers];

/* =============================
   NAVEGACIÓN SERVICIOS
============================= */
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
    <div class="our-coupons">
      <router-link
        v-for="coupon in coupons"
        :key="coupon.id"
        :to="{ name: 'CouponsDetails', params: { id: coupon.id } }"
        class="logs-item"
      >
        <img class="card-icons" :src="coupon.image" :alt="coupon.name" />
        <div>{{ coupon.name }}</div>
      </router-link>
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
      <!-- <div class="logs-item">
        <img class="card-icons" src="@/assets/apartment.svg" alt="apartment" />
        <div>CONDOMINIOS</div>
      </div> -->
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
.img-home {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  object-fit: cover;
  object-position: center 30%; /* 🔥 mueve el enfoque hacia arriba */
  transition: opacity 0.8s ease;
}

/* .home-area {
} */

.title-home {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 80px 0 40px 0;
  text-align: center;
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

.text-home {
  max-width: 900px;
  margin: 60px auto;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
}
.our-coupons {
  width: 100%;
  background: linear-gradient(135deg, #325bcd, #2549ad);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 80px 40px;
  flex-wrap: wrap;
}

.card-icons {
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 15px;
  /* padding: 18px; */
  object-fit: contain;
  margin-bottom: 20px;
}

.logs-item {
  width: 180px;
  min-height: 220px;
  background-color: #1f1f1f;
  border-radius: 16px;
  text-align: center;
  color: #ffffff;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

.logs-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

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
   Carrusel automático clientes
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

/* Animación infinita */
@keyframes scrollCustomers {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Estilos para el carrusel */
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
}

.carousel-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-dots .active {
  background: #325bcd;
  transform: scale(1.2);
}
/* =================================
   MEJORAS RESPONSIVE MOVIL
================================= */

@media (max-width: 768px) {
  /* Imagen principal */
  .img-home {
    height: 55vh;
    min-height: 280px;
  }

  /* Texto introductorio */
  .text-home {
    font-size: 16px;
    padding: 0 20px;
    margin: 40px auto;
  }

  /* Títulos */
  .title-home {
    font-size: 26px;
    margin: 60px 0 30px 0;
  }

  /* ===============================
     SERVICIOS
  =============================== */

  .our-coupons {
    gap: 20px;
    padding: 50px 20px;
  }

  .logs-item {
    width: 140px;
    min-height: 170px;
    padding: 15px;
  }

  .card-icons {
    width: 65px;
    height: 65px;
    padding: 14px;
  }

  /* ===============================
     SECTORES
  =============================== */

  .our-sector {
    height: auto;
    flex-wrap: wrap;
    padding: 50px 20px;
    gap: 20px;
  }
}

/* =================================
   MOVILES PEQUEÑOS
================================= */

@media (max-width: 480px) {
  .img-home {
    height: 45vh;
  }

  .title-home {
    font-size: 22px;
  }

  .logs-item {
    width: 120px;
    min-height: 150px;
    font-size: 10px;
  }

  .card-icons {
    width: 55px;
    height: 55px;
  }

  .customer-icons {
    height: 45px;
  }
}
</style>
