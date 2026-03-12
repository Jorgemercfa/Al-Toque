import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import About from './views/About-item.vue';
import Coupons from './views/Coupon-item.vue';
import Contact from './views/Contact-item.vue';
import CouponsDetails from './components/Component-coupons-item.vue';

// NUEVO
import SignIn from './views/Sign-in.vue';
import SignUp from './views/Sign-up.vue';
import Profile from './views/Profile-item.vue';

import Cart from './views/Cart-item.vue';
import Checkout from './views/Checkout-item.vue';
import OrderConfirmation from './views/OrderConfirmation-item.vue';

// EMPRESA
import SignInCompany from './views/views_companies/Sign-in-companies.vue';
import SignUpCompany from './views/views_companies/Sign-up-companies.vue';
import HomeCompanies from './views/views_companies/Home-companies.vue';

import { useSession } from './auth/session';
import { useSessionCompany } from './auth/session_companies';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/About-item', name: 'About', component: About },
  { path: '/Coupon-item', name: 'Coupon', component: Coupons },
  { path: '/Contact-item', name: 'Contact', component: Contact },
  { path: '/coupon/:id', name: 'CouponsDetails', component: CouponsDetails },

  // USUARIO
  { path: '/Sign-in', name: 'SignIn', component: SignIn },
  { path: '/Sign-up', name: 'SignUp', component: SignUp },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/Checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: '/OrderConfirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation,
    meta: { requiresAuth: true },
  },

  // EMPRESA
  {
    path: '/Sign-in-companies',
    name: 'SignInCompany',
    component: SignInCompany,
  },
  {
    path: '/Sign-up-companies',
    name: 'SignUpCompany',
    component: SignUpCompany,
  },
  {
    path: '/Home-companies',
    name: 'HomeCompanies',
    component: HomeCompanies,
    meta: { requiresCompanyAuth: true },
  },

  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: 'auto' };
  },
});

// Guard ÚNICO que maneja ambos tipos de auth
router.beforeEach((to) => {
  // Rutas de usuario
  if (to.meta?.requiresAuth) {
    const { isAuthenticated } = useSession();
    if (!isAuthenticated.value) {
      return { name: 'SignIn' };
    }
  }

  // Rutas de empresa
  if (to.meta?.requiresCompanyAuth) {
    const { isCompanyAuthenticated } = useSessionCompany();
    if (!isCompanyAuthenticated.value) {
      return { name: 'SignInCompany' };
    }
  }
});

// ✅ Asegurar scroll en navegación
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
