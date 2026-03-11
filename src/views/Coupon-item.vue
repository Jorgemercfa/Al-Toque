<script setup name=src/components/couponsList.vue>
import navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'
import { useRouter } from 'vue-router'
import coupons from '@/data/coupon.js'

const router = useRouter()
</script>

<template>
  <header>
    <navbar />
  </header>
  <div class="coupons-area">
    <h1 class="title-coupons">Nuestros Cupones</h1>
    <div class="coupons-container">
      <div v-for="coupon in coupons" :key="coupon.id" class="coupon-card">
        <div class="coupon-content">
        <h2 class="coupon-title">{{ coupon.name }}</h2>
          <img v-if="coupon.image" :src="coupon.image" :alt="coupon.name" class="coupon-image" />
          <p class="coupon-description">{{ coupon.shortDescription }}</p>
        </div>
        <button
  class="details-button"
  @click="router.push({ name: 'CouponsDetails', params: { id: coupon.id } })"
>
  {{ coupon.details_button }}
</button>
      </div>
    </div>
  </div>
  <footer>
    <Footer />
  </footer>
</template>

<style>
.coupons-area {
  margin: 50px 7%;
  text-align: center;
}

.title-coupons {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left;
  position: relative;
}

.title-coupons::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #325BCD;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.coupons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.coupon-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #325BCD, #2549ad);
  color: white;
  border-radius: 14px;
  padding: 24px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.coupon-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}


.coupon-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.coupon-image {
  width: 160px;
  height: 160px;
  border-radius: 10px;
  object-fit: cover;
  background-color: white;
}

.coupon-title {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}

.coupon-description {
  font-size: 1rem;
  text-align: center;
}

.details-button {
  margin-top: 20px;
  background-color: #1F1F1F;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-button:hover {
  background-color: #141313;
}
</style>