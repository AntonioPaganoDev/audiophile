import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: { layout: DefaultLayout },
  },
  {
    path: '/checkout',
    component: () => import('@/views/CheckoutView.vue'),
    meta: { requiresAuth: true, layout: DefaultLayout },
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    meta: { layout: AuthLayout },
  },
  {
    path: '/headphones',
    component: () => import('@/views/HeadphonesView.vue'),
    meta: { layout: DefaultLayout },
  },
  {
    path: '/speakers',
    component: () => import('@/views/SpeakersView.vue'),
    meta: { layout: DefaultLayout },
  },
  {
    path: '/earphones',
    component: () => import('@/views/EarphonesView.vue'),
    meta: { layout: DefaultLayout },
  },
  {
    path: '/product/:id',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { layout: DefaultLayout },
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { layout: AuthLayout },
  },
  {
    path: '/403',
    component: () => import('@/views/ForbiddenView.vue'),
    meta: { layout: DefaultLayout },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { layout: AuthLayout },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // se l'utente usa avanti/indietro, ripristina la posizione salvata
    if (savedPosition) {
      return savedPosition
    }
    // se la rotta ha un anchor (#hash), scrolla lì
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // altrimenti torna sempre in cima
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  await auth.init() // sicuro chiamarlo ad ogni navigazione: init() ritorna subito se già fatto

  if (to.meta.requiresAuth && !auth.user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) return '/403'
})

export default router
