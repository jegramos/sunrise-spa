// dynamically import all modules under the plugins dir for the side effects
import.meta.glob('@/plugins/*.js', { eager: true })

// Register routes to the vueApp
import '@/router'

// Import custom styles
import '@/assets/css/main.css'

// Import Flowbite plugin for tailwind
import 'flowbite'

// import the Vue instance which benefited from the imports above
import { vueApp } from '@/app'

vueApp.mount('#app')
