import { vueApp } from '@/app.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// Use a state persistence library for page reloads
pinia.use(piniaPluginPersistedState)

vueApp.use(pinia)
