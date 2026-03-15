<script setup>
import { computed } from 'vue';

import NavbarCompanies from '@/components/Navbar-company-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSessionCompany } from '@/auth/session_companies';
import { getCouponsByCompany } from '@/auth/companyCouponsRepo';

const { state } = useSessionCompany();

const coupons = computed(() => getCouponsByCompany(state.company));

const formatDate = (isoOrDate) => {
  if (!isoOrDate) return '-';

  const date = new Date(isoOrDate);
  if (Number.isNaN(date.getTime())) return isoOrDate;

  return date.toLocaleDateString('es-PE');
};
</script>

<template>
  <div class="page-wrapper-company">
    <header>
      <NavbarCompanies />
    </header>

    <main class="dashboard-section">
      <div class="dashboard-container">
        <h1 class="page-title">Cupones creados por empresa</h1>

        <div v-if="coupons.length === 0" class="empty-state">
          <p>Aún no has creado cupones.</p>
          <router-link to="/Create-Coupons" class="create-link">
            Crear mi primer cupón
          </router-link>
        </div>

        <div v-else class="coupons-grid">
          <article v-for="coupon in coupons" :key="coupon.id" class="coupon-card">
            <div class="badge">{{ coupon.percentage || 'Oferta' }}</div>
            <h3>{{ coupon.name }}</h3>
            <p class="short">{{ coupon.shortDescription }}</p>

            <div class="meta-row">
              <strong>Código:</strong>
              <span>{{ coupon.coupon_code }}</span>
            </div>
            <div class="meta-row">
              <strong>Categoría:</strong>
              <span>{{ coupon.category }}</span>
            </div>
            <div class="meta-row">
              <strong>Precio:</strong>
              <span>S/ {{ coupon.original_price }}</span>
            </div>
            <div class="meta-row">
              <strong>Vence:</strong>
              <span>{{ formatDate(coupon.expiration_date) }}</span>
            </div>
            <div class="meta-row">
              <strong>Creado:</strong>
              <span>{{ formatDate(coupon.createdAt) }}</span>
            </div>
          </article>
        </div>
      </div>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper-company {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}

.dashboard-section {
  flex: 1;
  padding: 100px 0 60px 0;
}

.dashboard-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 26px;
}

.empty-state {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
}

.create-link {
  display: inline-block;
  margin-top: 8px;
  color: #325bcd;
  font-weight: 600;
}

.coupons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.coupon-card {
  position: relative;
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.07);
}

.badge {
  position: absolute;
  right: 12px;
  top: 12px;
  background: #325bcd;
  color: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.8rem;
}

.short {
  color: #555;
  margin-bottom: 10px;
}

.meta-row {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 5px;
}
</style>
