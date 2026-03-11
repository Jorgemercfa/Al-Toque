<template>
  <div class="our-coupons">
    <div class="carousel">
      <button @click="scrollLeft">&lt;</button>
      <div class="carousel-track" ref="track">
        <div v-for="(coupon, index) in coupons" :key="index" class="coupon-card">
          <CouponCard :coupon="coupon" />
        </div>
      </div>
      <button @click="scrollRight">&gt;</button>
    </div>
    <div class="carousel-dots">
      <span
        v-for="(coupon, index) in coupons"
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CouponCard from './CouponCard.vue';

const coupons = ref([/* your coupon data here */]);
const currentIndex = ref(0);

const scrollLeft = () => {
  currentIndex.value = (currentIndex.value - 1 + coupons.value.length) % coupons.value.length;
};

const scrollRight = () => {
  currentIndex.value = (currentIndex.value + 1) % coupons.value.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const translateX = computed(() => {
  return `translateX(-${currentIndex.value * 100}%)`;
});

</script>

<style scoped>
.our-coupons {
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  align-items: center;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  transform: translateX(translateX);
}

.coupon-card {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  height: 10px;
  width: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: lightgray;
  cursor: pointer;
}

.dot.active {
  background-color: gray;
}
</style>