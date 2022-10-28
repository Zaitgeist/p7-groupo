import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Register',
      name: 'register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/Landing',
      name: 'Landing',
      component: () => import('../components/Landing.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../components/Profil.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'      
    }
  ]
})

export default router
