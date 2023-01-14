import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import AuthenticationPage from '@/views/AuthenticationPage.vue'
import { vueApp } from '@/app.js'
import PortfolioPage from '@/views/PortfolioPage.vue'
import BlogsPage from '@/views/BlogsPage.vue'
import { useAuthStore } from '@/stores/auth.js'
import VerifyEmailPage from '@/views/VerifyEmailPage.vue'
import { useAuthType, useRole } from '@/composables/enums.js'

const authType = useAuthType()
const role = useRole()

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      label: 'Home',
      isNavMenu: true,
      auth: authType.OPEN,
    },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioPage,
    meta: {
      label: 'Portfolio',
      isNavMenu: true,
      auth: authType.AUTHENTICATED,
    },
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsPage,
    meta: {
      label: 'Blogs',
      isNavMenu: true,
      auth: authType.AUTHENTICATED,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
    meta: {
      label: 'About',
      isNavMenu: true,
      auth: authType.OPEN,
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
          auth: authType.AUTHENTICATED,
          permission: [role.ADMIN, role.SUPER_USER],
        },
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      label: 'Authentication',
      hideNavBar: true,
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: AuthenticationPage,
        meta: {
          label: 'Login',
          hideNavBar: true,
          auth: authType.UNAUTHENTICATED,
        },
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: AuthenticationPage,
        meta: {
          label: 'Sign up',
          hideNavBar: true,
          auth: authType.UNAUTHENTICATED,
        },
      },
      {
        path: 'verify-email',
        name: 'verify-email',
        component: VerifyEmailPage,
        meta: {
          label: 'Verify Email',
          hideNavBar: true,
          auth: authType.AUTHENTICATED,
        },
      },
    ],
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPasswordPage.vue'),
    meta: {
      label: 'Reset Password',
      hideNavBar: true,
      auth: authType.UNAUTHENTICATED,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordPage.vue'),
    meta: {
      label: 'Forgot Password',
      hideNavBar: true,
      auth: authType.UNAUTHENTICATED,
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

router.beforeEach(async (to) => {
  if (to.name === 'auth') {
    // redirect 'domain.com/auth' to 'domain.com/auth/sign-up'
    return { name: 'sign-up' }
  }

  // redirect to home if already authenticated
  const authStore = useAuthStore()
  if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'sign-up')) {
    return { name: 'home' }
  }
})

vueApp.use(router)
