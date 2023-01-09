import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Login from '@/views/LoginPage.vue'
import { vueApp } from '@/app.js'
import PortfolioPage from '@/views/PortfolioPage.vue'
import BlogsPage from '@/views/BlogsPage.vue'

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      label: 'Home',
      isNavMenu: true,
    },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioPage,
    meta: {
      label: 'Portfolio',
      isNavMenu: true,
    },
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsPage,
    meta: {
      label: 'Blogs',
      isNavMenu: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
    meta: {
      label: 'About',
      isNavMenu: true,
    },
  },
  {
    path: '/admin',
    children: [
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import('@/views/UserManagementPage.vue'),
        meta: {
          label: 'Manage Users',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      label: 'Login',
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPasswordPage.vue'),
    meta: {
      label: 'Reset Password',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordPage.vue'),
    meta: {
      label: 'Forgot Password',
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/404Page.vue'),
    meta: {
      label: 'Page not found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const appName = import.meta.env.VITE_APP_NAME
router.afterEach((to) => {
  // Change doc title
  document.title = `${appName} | ${to.meta.label}` || appName
})

vueApp.use(router)
