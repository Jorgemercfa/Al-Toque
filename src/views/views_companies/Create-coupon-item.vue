<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import NavbarCompanies from '@/components/Navbar-company-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSessionCompany } from '@/auth/session_companies';
import { addCompanyCoupon, getCouponsCreatedThisMonth } from '@/auth/companyCouponsRepo';
import { getCompanyPlan, getMonthlyCouponLimitForPlan } from '@/auth/companyPlansRepo';

const router = useRouter();
const { state } = useSessionCompany();

const name = ref('');
const shortDescription = ref('');
const longDescription = ref('');
const category = ref('Restaurantes');
const percentage = ref('');
const originalPrice = ref('');
const expirationDate = ref('');
const termsOfUse = ref('');
const couponCode = ref('');
const totalCoupons = ref(50);
const error = ref('');
const success = ref('');

const categories = [
  'Restaurantes',
  'Entretenimiento',
  'Tecnología',
  'Fitness',
  'Moda',
  'Salud y Bienestar',
  'Otros',
];

const companyPlan = computed(() => getCompanyPlan(state.company));
const monthlyLimit = computed(() => getMonthlyCouponLimitForPlan(companyPlan.value));
const monthlyCreated = computed(() => getCouponsCreatedThisMonth(state.company).length);
const monthlyRemaining = computed(() => Math.max(0, monthlyLimit.value - monthlyCreated.value));

const generateCouponCode = () => {
  const prefix = name.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);

  const random = Math.floor(1000 + Math.random() * 9000);
  couponCode.value = `${prefix || 'CUPON'}${random}`;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const normalizeCouponQuantity = () => {
  const parsed = Number(totalCoupons.value);
  if (!Number.isFinite(parsed)) {
    totalCoupons.value = 50;
    return;
  }

  totalCoupons.value = Math.min(500, Math.max(50, Math.round(parsed)));
};

const onCreateCoupon = () => {
  error.value = '';
  success.value = '';

  if (!state.company) {
    error.value = 'Tu sesión de empresa no está activa.';
    return;
  }

  if (monthlyRemaining.value <= 0) {
    error.value = `Ya alcanzaste el límite de ${monthlyLimit.value} cupones este mes en tu plan.`;
    return;
  }

  if (!name.value.trim() || !shortDescription.value.trim()) {
    error.value = 'Completa el nombre y la descripción corta.';
    return;
  }

  const originalPriceNumber = toNumber(originalPrice.value);

  if (!Number.isFinite(originalPriceNumber) || originalPriceNumber <= 0) {
    error.value = 'Ingresa un precio original válido.';
    return;
  }

  normalizeCouponQuantity();

  if (!couponCode.value.trim()) {
    generateCouponCode();
  }

  addCompanyCoupon({
    name: name.value.trim(),
    shortDescription: shortDescription.value.trim(),
    longDescription: longDescription.value.trim(),
    category: category.value,
    percentage: percentage.value.trim(),
    original_price: originalPriceNumber,
    expiration_date: expirationDate.value,
    Terms_of_use: termsOfUse.value.trim(),
    coupon_code: couponCode.value.trim().toUpperCase(),
    companyId: state.company.id,
    companyName: state.company.name,
    companyRuc: state.company.ruc,
    monthlyPlan: companyPlan.value,
    totalCoupons: totalCoupons.value,
  });

  success.value = 'Cupón creado correctamente.';

  name.value = '';
  shortDescription.value = '';
  longDescription.value = '';
  category.value = 'Restaurantes';
  percentage.value = '';
  originalPrice.value = '';
  expirationDate.value = '';
  termsOfUse.value = '';
  couponCode.value = '';
  totalCoupons.value = 50;

  setTimeout(() => {
    router.push({ name: 'CompanyCoupons' });
  }, 500);
};
</script>

<template>
  <div class="page-wrapper">
    <header>
      <NavbarCompanies />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <h1 class="main-title">Crear Cupones</h1>

        <div class="plan-alert">
          <strong>Plan {{ companyPlan === 'premium' ? 'Premium' : 'Básico' }}:</strong>
          {{ monthlyCreated }} / {{ monthlyLimit }} cupones creados este mes.
          <span class="remaining">Disponibles: {{ monthlyRemaining }}</span>
        </div>

        <div class="contact-card">
          <form class="form-area" @submit.prevent="onCreateCoupon" autocomplete="on">
            <div v-if="error" class="message error">{{ error }}</div>
            <div v-if="success" class="message success">{{ success }}</div>

            <div class="form-group">
              <label>Nombre del cupón</label>
              <input v-model="name" type="text" required placeholder="Ej: Combo parrillero" />
            </div>

            <div class="form-group">
              <label>Descripción corta</label>
              <input v-model="shortDescription" type="text" required />
            </div>

            <div class="form-group">
              <label>Descripción larga</label>
              <textarea v-model="longDescription" rows="3" />
            </div>

            <div class="form-group">
              <label>Categoría</label>
              <select v-model="category">
                <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Porcentaje / Beneficio</label>
              <input v-model="percentage" type="text" placeholder="Ej: 20% o 2x1" required />
            </div>

            <div class="form-group">
              <label>Precio Original</label>
              <input v-model="originalPrice" type="number" min="1" required />
            </div>

            <div class="form-group">
              <label>Cantidad de cupones para esta oferta (mínimo 50, máximo 500)</label>
              <div class="quantity-row">
                <input
                  v-model.number="totalCoupons"
                  type="range"
                  min="50"
                  max="500"
                  step="1"
                  @input="normalizeCouponQuantity"
                />
                <input
                  v-model.number="totalCoupons"
                  type="number"
                  min="50"
                  max="500"
                  step="1"
                  class="quantity-input"
                  @blur="normalizeCouponQuantity"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Fecha de vencimiento</label>
              <input v-model="expirationDate" type="date" required />
            </div>

            <div class="form-group">
              <label>Términos de uso</label>
              <textarea v-model="termsOfUse" rows="2" />
            </div>

            <div class="code-row">
              <div class="form-group code-input">
                <label>Código del cupón</label>
                <input v-model="couponCode" type="text" placeholder="Se puede autogenerar" />
              </div>
              <button type="button" class="secondary-btn" @click="generateCouponCode">
                Generar código
              </button>
            </div>

            <button type="submit" class="submit-btn">Crear Cupón</button>
          </form>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
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
  margin-bottom: 24px;
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

.plan-alert {
  background: #e8ecff;
  border-left: 5px solid #325bcd;
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 22px;
}

.remaining {
  margin-left: 8px;
  font-weight: 600;
}

.contact-card {
  display: flex;
  gap: 60px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}

.form-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.form-group input,
.form-group textarea,
.form-group select {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #325bcd;
}

.quantity-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.quantity-row input[type='range'] {
  width: 100%;
  padding: 0;
}

.quantity-input {
  max-width: 130px;
}

.code-row {
  display: flex;
  gap: 12px;
  align-items: end;
}

.code-input {
  flex: 1;
}

.submit-btn,
.secondary-btn {
  border: none;
  padding: 12px 24px;
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn {
  background-color: #325bcd;
  color: white;
}

.submit-btn:hover {
  background-color: #2549ad;
}

.secondary-btn {
  background-color: #e8ecff;
  color: #325bcd;
}

.secondary-btn:hover {
  background-color: #d8e0ff;
}

.message {
  font-weight: 600;
}

.message.error {
  color: #b00020;
}

.message.success {
  color: #177245;
}

@media (max-width: 700px) {
  .code-row,
  .quantity-row {
    flex-direction: column;
    align-items: stretch;
  }

  .quantity-input {
    max-width: none;
  }
}
</style>
