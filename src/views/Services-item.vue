<script setup name=src/components/ServicesList.vue>
import navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'
import { useRouter } from 'vue-router'
import services from '@/data/services.js'

const router = useRouter()
</script>

<template>
  <header>
    <navbar />
  </header>
  <div class="services-area">
    <h1 class="title-services">Nuestros servicios</h1>
    <div class="services-container">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="service-content">
          <img v-if="service.image" :src="service.image" :alt="service.name" class="service-image" />
          <div class="service-info">
            <h2 class="service-title">{{ service.name }}</h2>
            <p class="service-description">{{ service.shortDescription }}</p>
          </div>
        </div>
        <button
  class="details-button"
  @click="router.push({ name: 'ServiceDetails', params: { id: service.id } })"
>
  {{ service.details_button }}
</button>
      </div>
    </div>
  </div>
  <footer>
    <Footer />
  </footer>
</template>

<style>
.services-area {
  margin: 50px 7%;
  text-align: center;
}

.title-services {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left;
  position: relative;
}

.title-services::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #325BCD;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.service-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #325BCD, #2549ad);
  color: white;
  border-radius: 14px;
  padding: 24px;
  width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}


.service-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.service-image {
  width: 90px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  background-color: white;
  flex-shrink: 0;
}

.service-info {
  text-align: left;
}

.service-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.service-description {
  font-size: 1rem;
  line-height: 1.5;
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