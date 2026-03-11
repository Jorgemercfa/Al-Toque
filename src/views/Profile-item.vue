<script setup>
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSession } from '@/auth/session';

const router = useRouter();
const { state, logout } = useSession();

const onLogout = () => {
  logout();
  router.push({ name: 'Home' });
};
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <h1 class="main-title">Perfil</h1>

        <div class="contact-card">
          <div class="form-area">
            <div class="form-group">
              <label>Nombre</label>
              <input :value="state.user?.name" disabled />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input :value="state.user?.email" disabled />
            </div>

            <button class="submit-btn" type="button" @click="onLogout">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
/* puedes reutilizar estilos parecidos a Sign-in */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}
.contact-section {
  flex: 1;
  padding: 120px 0 80px 0;
}
.contact-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}
.main-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 50px;
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
.contact-card {
  display: flex;
  gap: 60px;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}
.form-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}
.form-group input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
}
.submit-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #325bcd;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #2549ad;
  transform: translateY(-2px);
}
</style>
