<script setup>
import { useRouter } from 'vue-router';
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

const router = useRouter();

function goToCheckout(planId) {
  router.push({
    name: 'Checkout',
    query: {
      flow: 'plan-company',
      plan: planId,
    },
  });
}
</script>

<template>
  <header>
    <navbar />
  </header>

  <section class="plan-section">
    <div class="plan-container">
      <h1 class="main-title">Planes para empresas</h1>
      <div class="plan-layout">
        <div class="plan-card">
          <h2>Básico</h2>
          <p class="plan-text">
            Incluye publicación de hasta <strong>20 cupones por mes</strong>, sesión de
            cupones activos, canjeo de códigos y soporte para empresas.
          </p>
          <ul class="plan-features">
            <li>20 cupones mensuales</li>
            <li>Gestión de códigos únicos adquiridos</li>
            <li>Deadline por código y limpieza automática</li>
          </ul>
          <button class="checkout-btn" @click="goToCheckout('basic')">
            Proceder al pago
          </button>
        </div>
        <div class="plan-card premium">
          <h2>Premium</h2>
          <p class="plan-text">
            Todo lo del básico y capacidad de publicar hasta
            <strong>40 cupones por mes</strong>, además de dashboard con estadísticas
            de cupones vendidos y los más vendidos.
          </p>
          <ul class="plan-features">
            <li>40 cupones mensuales</li>
            <li>Dashboard de rendimiento</li>
            <li>Soporte prioritario para empresas</li>
          </ul>
          <button class="checkout-btn" @click="goToCheckout('premium')">
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.plan-container {
  gap: 40px;
  margin: 50px 7%;
}

.plan-layout {
  display: flex;
  align-items: stretch;
  gap: 40px;
  flex-wrap: wrap;
}

.main-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #325bcd;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.plan-card {
  background-color: #325bcd;
  color: #f2f2f2;
  padding: 40px;
  align-items: center;
  border-radius: 20px;
  text-align: left;
  width: 400px;
  min-height: 500px;
  margin-top: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  line-height: 1.7;
  display: flex;
  flex-direction: column;
}

.plan-card.premium {
  background: linear-gradient(145deg, #223e91, #325bcd);
}

.plan-card h2 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 28px;
  color: #ffffff;
  align-self: flex-start;
}

.plan-card p {
  font-size: 16px;
  margin-bottom: 10px;
}

.plan-features {
  margin: 10px 0 22px;
  padding-left: 18px;
  width: 100%;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: #1f1f1f;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
  margin-top: auto;
}

.checkout-btn:hover {
  background: #101010;
  transform: translateY(-2px);
}
</style>
