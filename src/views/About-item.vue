<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <header>
    <navbar />
  </header>

  <section class="about-section">
    <div class="about-container">
      <h1 class="main-title">Nosotros</h1>

      <div class="about-card">
        <p class="about-text">
          Al Toque simplifica la forma de comprar en línea, conectando empresas
          y usuarios mediante ofertas reales en tiempo real y compras directas
          desde las páginas oficiales.
        </p>

        <h2>Visión</h2>
        <p>
          Convertir la aplicación en líder de las ofertas en línea más grande de
          Latinoamérica, por su innovación, transparencia y creatividad, para
          que el cliente tenga una experiencia directa, eficiente y accesible
          para todos.
        </p>

        <h2>Misión</h2>
        <p>
          Conectar a las personas con las mejores ofertas y promociones en
          tiempo real. Simplificando las compras en línea con una experiencia
          rápida, segura y confiable, uniendo a usuarios y empresas de forma
          directa.
        </p>
      </div>
    </div>
  </section>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.about-container {
  width: 85%;
  max-width: 1100px;
  margin: auto;
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

.about-card {
  background-color: #325bcd; /* Azul oscuro como la imagen */
  color: #f2f2f2;
  padding: 50px;
  border-radius: 20px;
  margin-top: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  line-height: 1.7;
}

.about-card h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 22px;
  color: #ffffff;
}

.about-card p {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
