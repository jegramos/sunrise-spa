<template>
  <div class="relative mt-6 flex flex-col">
    <!-- Start input field -->
    <input
      :name="props.name"
      :type="props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type"
      :placeholder="props.label"
      autocomplete="off"
      :required="required"
      :class="`peer box-border w-full rounded-xl border-none bg-theme-input pl-3 outline-none ${
        props.type === 'password' ? 'pr-10' : 'p-3'
      } ${inputStateStyle} py-2.5 text-theme-input placeholder-transparent transition-transform duration-200 focus:pl-4 focus:ring-1 focus:ring-theme-primary`"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
    <!-- End input field -->
    <!-- Start animated label -->
    <label
      :for="props.id"
      class="absolute left-1 -top-5 mb-1.5 text-xs text-theme-base transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-sm peer-focus:left-1 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-theme-muted"
    >
      {{ props.label }}
    </label>
    <!-- End animated label -->
    <!-- Start validation messages -->
    <small v-if="props.invalid && props.invalidText" class="mt-1.5 ml-1 text-xs text-theme-error">
      <font-awesome-icon icon="fa-regular fa-circle-xmark" class="mr-0.5"></font-awesome-icon>
      {{ props.invalidText }}
    </small>
    <small v-if="props.success && props.successText" class="mt-1.5 ml-1 text-xs text-theme-success">
      <font-awesome-icon icon="fa-regular fa-circle-check" class="mr-0.5"></font-awesome-icon>
      {{ props.successText }}
    </small>
    <!-- End validation messages -->
    <!-- Start password visibility switch -->
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
    <!-- End password visibility switch  -->
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'

defineEmits(['update:modelValue', 'blur'])

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => {
      return ['text', 'password', 'date'].includes(value.toLowerCase())
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  invalidText: {
    type: String,
    default: null,
  },
  success: {
    type: Boolean,
    default: false,
  },
  successText: {
    type: String,
    default: null,
  },
})

const inputStateStyle = computed(() => {
  let inputClass = ''

  if (props.invalid) {
    inputClass = 'ring-1 ring-theme-error'
  } else if (props.success) {
    inputClass = 'ring-1 ring-theme-success'
  }

  return inputClass
})

let showPassword = ref(false)
</script>
