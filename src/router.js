import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import About from './views/About-item.vue';
import Coupons from './views/Coupon-item.vue';
import Contact from './views/Contact-item.vue';
import SignIn from './views/Sign-in.vue';
import SignUp from './views/Sign-up.vue';
import CouponsDetails from './components/Component-coupons-item.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/About-item', name: 'About', component: About },
  { path: '/Coupon-item', name: 'Coupon', component: Coupons },
  { path: '/Contact-item', name: 'Contact', component: Contact },
  { path: '/Sign-in', name: 'SignIn', component: SignIn },
  { path: '/Sign-up', name: 'SignUp', component: SignUp },
  { path: '/coupon/:id', name: 'CouponsDetails', component: CouponsDetails }, // ✅ Ruta correcta
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
