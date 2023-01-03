import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import UserManagement from '@/views/UserManagementPage.vue'
import Login from '@/views/LoginPage.vue'
import { vueApp } from '@/app.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin/user-management',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPasswordPage.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/404Page.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

vueApp.use(router)
