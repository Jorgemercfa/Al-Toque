<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <header>
    <navbar />
  </header>

  <section class="plan-section">
    <div class="plan-container">
      <h1 class="main-title">Planes</h1>
      <div class="plan-layout">
        <div class="plan-card">
          <h2>Basico</h2>
          <p class="plan-text">
            Permite a las empresas publicar ofertas y promociones en la
            plataforma, llegando a una amplia audiencia de usuarios interesados
            en descuentos y promociones. Es ideal para pequeñas empresas que
            desean aumentar su visibilidad y atraer nuevos clientes.
          </p>
          <button class="checkout-btn" @click="goToCheckout">
            Proceder al pago
          </button>
        </div>
        <div class="plan-card">
          <h2>Premium</h2>
          <p class="plan-text">
            Ofrece todas las características del plan básico, además de acceso a
            análisis avanzados sobre el rendimiento de las promociones, soporte
            prioritario y la capacidad de destacar las ofertas en la plataforma.
            Es perfecto para empresas que buscan maximizar su alcance y obtener
            información detallada sobre el comportamiento de los usuarios.
          </p>
          <button class="checkout-btn" @click="goToCheckout">
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
  align-items: center;
  gap: 40px;
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
  background-color: #325bcd; /* Línea roja */
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.plan-card {
  background-color: #325bcd; /* Azul oscuro como la imagen */
  color: #f2f2f2;
  padding: 50px;
  align-items: center;
  border-radius: 20px;
  text-align: center;
  width: 400px;
  height: 500px;
  margin-top: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  line-height: 1.7;
}

.plan-card h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 22px;
  color: #ffffff;
}

.plan-card p {
  font-size: 16px;
  margin-bottom: 15px;
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
}

.checkout-btn:hover {
  background: #1f1f1f;
  transform: translateY(-2px);
}
</style>
