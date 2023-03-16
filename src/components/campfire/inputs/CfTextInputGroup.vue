<template>
  <div class="flex w-full items-center">
    <div
      v-if="props.prefix"
      :class="`mr-1.5 flex items-center border-r border-theme-input-text bg-inherit p-1 ${
        props.invalidText || props.successText ? 'mt-2.5' : 'mt-8'
      }`"
    >
      <span class="tracking-wide text-theme-input text-theme-primary">{{ props.prefix }}</span>
    </div>
    <cf-text-input
      :id="getId(props.id)"
      v-model="inputText"
      :name="props.name"
      :label="props.label"
      :type="props.type"
      :border="props.border"
      :required="props.required"
      :invalid="props.invalid"
      :invalid-text="props.invalidText"
      :success="props.success"
      :success-text="props.successText"
      :mask="props.mask"
      :eager-mask="props.eagerMask"
      :initial-value="props.initialValue"
      class="w-full"
      @blur="$emit('blur', $event)"
    >
    </cf-text-input>
    <div
      v-if="props.suffix"
      :class="`my-0.5 ml-1 flex items-center border-theme-input-text bg-inherit px-1 ${
        props.invalidText || props.successText ? 'mt-2.5' : 'mt-8'
      }`"
    >
      <span class="font-bold tracking-wider text-theme-input text-theme-primary">{{ props.suffix }}</span>
    </div>
  </div>
</template>

<script setup>
import CfTextInput from '@/components/campfire/inputs/CfTextInput.vue'
import { ref, watch } from 'vue'
import { usePrependOrAppendOnce } from '@/composables/helpers.js'

const getId = usePrependOrAppendOnce('components-campfire-inputs-cf-text-input')

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: null,
  },
  suffix: {
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
})

const inputText = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'blur'])
watch(inputText, () => {
  emit('update:modelValue', props.prefix + inputText.value)
})
</script>
