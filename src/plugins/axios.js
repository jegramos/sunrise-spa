import { vueApp } from '@/app'
import axios from 'axios'
import VueAxios from 'vue-axios'

// setup default config
axios.defaults.baseURL = import.meta.env.VITE_API_ROOT_URL

vueApp.use(VueAxios, axios)
vueApp.provide('sunrise-axios', vueApp.config.globalProperties.axios)
