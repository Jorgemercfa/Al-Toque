<script setup>
import { computed, ref } from 'vue';

import NavbarCompanies from '@/components/Navbar-company-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSessionCompany } from '@/auth/session_companies';
import {
  getCouponsByCompany,
  getCompanyCouponsStats,
  isCouponActive,
  redeemCompanyCouponCode,
  isCodeExpired,
} from '@/auth/companyCouponsRepo';

const { state } = useSessionCompany();

const redeemCode = ref('');
const redeemMessage = ref('');
const redeemType = ref('success');

const coupons = computed(() => getCouponsByCompany(state.company));
const activeCoupons = computed(() =>
  coupons.value.filter((coupon) => isCouponActive(coupon)),
);
const stats = computed(() => getCompanyCouponsStats(state.company));

const uniqueCodes = computed(() =>
  stats.value.coupons
    .flatMap((coupon) =>
      (coupon.acquiredCodes || []).map((code) => ({
        ...code,
        couponName: coupon.name,
      })),
    )
    .slice(0, 40),
);

const formatDate = (isoOrDate) => {
  if (!isoOrDate) return '-';

  const date = new Date(isoOrDate);
  if (Number.isNaN(date.getTime())) return isoOrDate;

  return date.toLocaleDateString('es-PE');
};

const submitRedeem = () => {
  const result = redeemCompanyCouponCode(state.company, redeemCode.value);
  redeemType.value = result.ok ? 'success' : 'error';
  redeemMessage.value = result.message;
  if (result.ok) redeemCode.value = '';
};

const countAvailable = (coupon) => {
  if (!Array.isArray(coupon.acquiredCodes)) return 0;
  return coupon.acquiredCodes.filter(
    (code) => code.status === 'activo' && !isCodeExpired(code),
  ).length;
};

const countAcquired = (coupon) => {
  if (!Array.isArray(coupon.acquiredCodes)) return 0;
  return coupon.acquiredCodes.filter(
    (code) => code.status === 'adquirido' || code.status === 'canjeado',
  ).length;
};
</script>

<template>
  <div class="page-wrapper-company">
    <header>
      <NavbarCompanies />
    </header>

    <main class="dashboard-section">
      <div class="dashboard-container">
        <h1 class="page-title">Panel de cupones para empresas</h1>

        <section class="dashboard-block">
          <h2>Sesión de cupones activos</h2>

          <div v-if="activeCoupons.length === 0" class="empty-state">
            <p>No tienes cupones activos en este momento.</p>
            <router-link to="/Create-Coupons" class="create-link">
              Crear un cupón
            </router-link>
          </div>

          <div v-else class="coupons-grid">
            <article
              v-for="coupon in activeCoupons"
              :key="coupon.id"
              class="coupon-card"
            >
              <div class="badge">{{ coupon.percentage || 'Oferta' }}</div>
              <h3>{{ coupon.name }}</h3>
              <p class="short">{{ coupon.shortDescription }}</p>

              <div class="meta-row">
                <strong>Código base:</strong>
                <span>{{ coupon.coupon_code }}</span>
              </div>
              <div class="meta-row">
                <strong>Categoría:</strong>
                <span>{{ coupon.category }}</span>
              </div>
              <div class="meta-row">
                <strong>Stock inicial:</strong>
                <span>{{ coupon.totalCoupons }}</span>
              </div>
              <div class="meta-row">
                <strong>Vence:</strong>
                <span>{{ formatDate(coupon.expiration_date) }}</span>
              </div>
              <div class="meta-row">
                <strong>Cupones disponibles:</strong>
                <span>{{ countAvailable(coupon) }}</span>
              </div>
              <div class="meta-row">
                <strong>Cupones adquiridos:</strong>
                <span>{{ countAcquired(coupon) }}</span>
              </div>
            </article>
          </div>
        </section>

        <section class="dashboard-block">
          <h2>Estadísticas</h2>
          <div class="stats-grid">
            <article class="stat-card">
              <p>Cupones vendidos/canjeados</p>
              <strong>{{ stats.soldTotal }}</strong>
            </article>
            <article class="stat-card">
              <p>Códigos activos</p>
              <strong>{{ stats.activeTotal }}</strong>
            </article>
            <article class="stat-card">
              <p>Cupón más vendido</p>
              <strong>{{ stats.bestSeller?.name || 'Sin ventas aún' }}</strong>
            </article>
          </div>
        </section>

        <section class="dashboard-block">
          <h2>Canjeo de códigos</h2>
          <div class="redeem-box">
            <input
              v-model="redeemCode"
              type="text"
              placeholder="Ingresa el código único"
            />
            <button @click="submitRedeem">Canjear código</button>
          </div>
          <p v-if="redeemMessage" :class="['redeem-message', redeemType]">
            {{ redeemMessage }}
          </p>
        </section>

        <section class="dashboard-block">
          <h2>Códigos únicos adquiridos</h2>
          <div class="codes-table">
            <div class="codes-header">
              <span>Código</span>
              <span>Cupón</span>
              <span>Estado</span>
              <span>Deadline</span>
            </div>
            <div v-for="code in uniqueCodes" :key="code.id" class="codes-row">
              <span>{{ code.uniqueCode }}</span>
              <span>{{ code.couponName }}</span>
              <span>{{ code.status }}</span>
              <span>{{ formatDate(code.deadline) }}</span>
            </div>
          </div>
        </section>

        <section class="dashboard-block support-block">
          <h2>Soporte para empresas</h2>
          <p>
            Si necesitas apoyo con campañas, canjes o gestión de cupones,
            escríbenos a <strong>soporte-empresas@altoque.app</strong>.
          </p>
        </section>
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

.dashboard-block {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.07);
  margin-bottom: 18px;
}

.empty-state {
  border-radius: 16px;
  padding: 12px 0;
}

.create-link {
  display: inline-block;
  margin-top: 8px;
  color: #ecdd06;
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
  box-shadow: inset 0 0 0 1px #ececec;
}

.badge {
  position: absolute;
  right: 12px;
  top: 12px;
  background: #ecdd06;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.stat-card {
  background: #eef2ff;
  border-radius: 12px;
  padding: 16px;
}

.stat-card strong {
  font-size: 1.4rem;
}

.redeem-box {
  display: flex;
  gap: 10px;
}

.redeem-box input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.redeem-box button {
  border: none;
  border-radius: 10px;
  padding: 0 16px;
  background: #ecdd06;
  color: #fff;
}

.redeem-message {
  margin-top: 10px;
  font-weight: 600;
}

.redeem-message.success {
  color: #177245;
}

.redeem-message.error {
  color: #b00020;
}

.codes-table {
  border: 1px solid #ebebeb;
  border-radius: 10px;
  overflow: hidden;
}

.codes-header,
.codes-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr;
  gap: 12px;
  padding: 10px 12px;
  font-size: 0.9rem;
}

.codes-header {
  background: #f8f8ff;
  font-weight: 700;
}

.codes-row:nth-child(even) {
  background: #fcfcff;
}

.support-block strong {
  color: #ecdd06;
}

@media (max-width: 700px) {
  .redeem-box {
    flex-direction: column;
  }

  .codes-header,
  .codes-row {
    grid-template-columns: 1fr;
  }
}
</style>
