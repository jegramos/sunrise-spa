<template>
  <div class="relative mt-1 flex flex-col">
    <input
      :id="props.id"
      :type="props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type"
      :placeholder="props.label"
      autocomplete="off"
      :class="`peer rounded-xl border-none bg-theme-input pl-3 outline-none ${
        props.type === 'password' ? 'pr-12' : 'p-3'
      } py-2.5 text-theme-input placeholder-transparent transition-all duration-200 focus:pl-4 focus:ring-1 focus:ring-theme-primary`"
    />
    <label
      :for="props.id"
      class="absolute left-1 -top-5 mb-1.5 text-xs text-theme-base transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-sm peer-focus:left-1 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-theme-muted"
    >
      {{ props.label }}
    </label>
    <font-awesome-icon
      v-if="props.type === 'password' && !showPassword"
      icon="fa-solid fa-eye"
      class="absolute top-3.5 right-4 h-4 w-4 text-theme-input transition-transform duration-200 hover:scale-125 hover:cursor-pointer"
      @click="showPassword = !showPassword"
    ></font-awesome-icon>
    <font-awesome-icon
      v-if="props.type === 'password' && showPassword"
      icon="fa-solid fa-eye-slash"
      class="absolute top-3.5 right-4 h-4 w-4 text-theme-input transition-transform duration-200 hover:scale-125 hover:cursor-pointer"
      @click="showPassword = !showPassword"
    ></font-awesome-icon>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => {
      return ['text', 'password', 'date'].includes(value.toLowerCase())
    },
  },
})

const showPassword = ref(false)
</script>
