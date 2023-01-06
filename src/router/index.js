import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Login from '@/views/LoginPage.vue'
import { vueApp } from '@/app.js'
import PortfolioPage from '@/views/PortfolioPage.vue'
import BlogsPage from '@/views/BlogsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    label: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    label: 'Login',
    component: Login,
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    label: 'Portfolio',
    component: PortfolioPage,
  },
  {
    path: '/blogs',
    name: 'blogs',
    label: 'Blogs',
    component: BlogsPage,
  },
  {
    path: '/about',
    name: 'about',
    label: 'About',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    label: 'Reset Password',
    component: () => import('@/views/ResetPasswordPage.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    label: 'Forgot Password',
    component: () => import('@/views/ForgotPasswordPage.vue'),
  },
  {
    path: '/admin/user-management',
    name: 'UserManagement',
    label: 'Manage Users',
    component: () => import('@/views/UserManagementPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    label: 'Page not found',
    component: () => import('@/views/404Page.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

vueApp.use(router)
