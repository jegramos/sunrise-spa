<template>
  <div class="relative mt-8 flex flex-col">
    <!-- Start input field -->
    <div class="relative flex">
      <input
        :id="props.id"
        ref="inputBox"
        v-maska
        :disabled="props.disabled"
        :data-maska="props.mask"
        :data-maska-eager="props.eagerMask"
        :name="props.name"
        :type="props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type"
        :placeholder="props.label"
        autocomplete="off"
        :required="required"
        :class="`peer box-border w-full rounded-xl border-none bg-theme-input pl-3 outline-none ${
          props.type === 'password' ? 'pr-10' : 'pr-3'
        } ${
          props.disabled ? 'cursor-not-allowed' : 'cursor-text'
        } ${inputStateStyle} py-2.5 text-theme-input placeholder-transparent transition-transform duration-200 focus:ring-1 focus:ring-theme-primary`"
        @input="emits('update:modelValue', $event.target.value)"
        @blur="emits('blur', $event)"
        @focus="!$event.target.value ? ($event.target.value = props.initialValue) : null"
        @focusout="$event.target.value === props.initialValue ? ($event.target.value = null) : null"
      />
      <!-- End input field -->
      <!-- Start animated label -->
      <label
        :for="props.id"
        :class="`absolute left-1 -top-6 mb-1.5 text-xs text-theme-base transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-sm peer-focus:left-1 peer-focus:-top-6 peer-focus:text-xs ${
          props.disabled ? 'cursor-not-allowed text-opacity-30' : 'cursor-default'
        }`"
        @click="focusOnInputBox"
      >
        {{ props.label }}
      </label>
      <!-- End animated label -->
    </div>
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
      :class="`absolute top-3.5 right-4 h-4 w-4 text-theme-input ${
        props.disabled
          ? 'text-opacity-30 hover:cursor-not-allowed'
          : 'transition-transform duration-200 hover:scale-125 hover:cursor-pointer'
      }`"
      @click="handleTogglePasswordVisibility"
    ></font-awesome-icon>
    <font-awesome-icon
      v-if="props.type === 'password' && showPassword"
      icon="fa-solid fa-eye-slash"
      :class="`absolute top-3.5 right-4 h-4 w-4 text-theme-input ${
        props.disabled
          ? 'text-opacity-30 hover:cursor-not-allowed'
          : 'transition-transform duration-200 hover:scale-125 hover:cursor-pointer'
      }`"
      @click="handleTogglePasswordVisibility"
    ></font-awesome-icon>
    <!-- End password visibility switch  -->
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'

// PhpStorm fails to see v-maska and data-maska usage
// noinspection ES6UnusedImports
import { vMaska } from 'maska'

const emits = defineEmits(['update:modelValue', 'blur'])

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    required: true,
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
  border: {
    type: Boolean,
    default: false,
  },
  mask: {
    type: String,
    default: null,
  },
  eagerMask: {
    type: Boolean,
    default: false,
  },
  initialValue: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const inputStateStyle = computed(() => {
  let inputClass = ''

  if (props.invalid) {
    inputClass = 'ring-1 ring-theme-error'
  } else if (props.success) {
    inputClass = 'ring-1 ring-theme-success'
  }

  // append ring color
  if (props.border && !(props.success || props.invalid)) {
    inputClass = 'ring-1 ring-theme-section'
  }

  return inputClass
})

let showPassword = ref(false)
const handleTogglePasswordVisibility = () => {
  if (props.disabled) return
  showPassword.value = !showPassword.value
}

const inputBox = ref(null)
const focusOnInputBox = () => {
  inputBox.value.focus()
}
</script>
