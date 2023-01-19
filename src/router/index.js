import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import AuthenticationPage from '@/views/AuthenticationPage.vue'
import { vueApp } from '@/app.js'
import PortfolioPage from '@/views/PortfolioPage.vue'
import BlogsPage from '@/views/BlogsPage.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useAuthType, useRole } from '@/composables/enums.js'
import ProfilePage from '@/views/ProfilePage.vue'
import NotificationsPage from '@/views/NotificationsPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'

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
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      label: 'Profile',
      isNavMenu: false,
      auth: authType.AUTHENTICATED,
    },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: NotificationsPage,
    meta: {
      label: 'Notifications',
      isNavMenu: false,
      auth: authType.AUTHENTICATED,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
    meta: {
      label: 'Settings',
      isNavMenu: false,
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
        name: 'verify-email-guard',
        component: () => import('@/views/misc/VerifyEmailGuardPage.vue'),
        meta: {
          label: 'Verify Email',
          hideNavBar: true,
          auth: authType.AUTHENTICATED,
        },
      },
      {
        path: 'email-verification-success',
        name: 'email-verification-success',
        component: () => import('@/views/misc/EmailVerificationPage.vue'),
        meta: {
          label: 'Email Verification Success',
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
    component: () => import('@/views/misc/404Page.vue'),
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

router.beforeEach(async (to) => {
  if (to.name === 'auth') {
    // Redirect 'domain.com/auth' to 'domain.com/auth/sign-up'
    return { name: 'sign-up' }
  }

  // Block access to sing-up, login, reset & forgot password, verify email
  const authStore = useAuthStore()
  if (authStore.isAuthenticated && to.meta.auth === authType.UNAUTHENTICATED) {
    return false
  }

  if (to.meta.auth === authType.AUTHENTICATED && !authStore.isAuthenticated) {
    return false
  }

  // Users must also have their emails verified to access auth routes (Except for the VerifyEmailGuard Page)
  if (to.meta.auth === authType.AUTHENTICATED && to.name !== 'verify-email-guard') {
    console.log('got here')
    console.log('route-to', to.name)
    console.log('email-verified-at', authStore.authenticatedUser.email_verified_at)
    if (!authStore.authenticatedUser.email_verified_at) return { name: 'verify-email-guard' }
  }

  // Change the browser tab title
  document.title = `${appName} | ${to.meta.label}` || appName
})

vueApp.use(router)
