import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import About from './views/About-item.vue';
import Services from './views/Services-item.vue';
import Contact from './views/Contact-item.vue';
import ServiceDetails from './components/Component-services-item.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/About-item', name: 'About', component: About },
  { path: '/Services-item', name: 'Services', component: Services },
  { path: '/Contact-item', name: 'Contact', component: Contact },
  { path: '/service/:id', name: 'ServiceDetails', component: ServiceDetails }, // ✅ Ruta correcta
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // ✅ MEJORADO: Mejor scrollBehavior
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'auto' };
    }
  },
});

// ✅ Asegurar scroll en navegación
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
