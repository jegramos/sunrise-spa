<template>
  <div class="relative mt-8 flex flex-col">
    <combobox
      nullable
      :model-value="props.modelValue"
      @update:model-value="(value) => emits('update:modelValue', value)"
    >
      <div class="relative">
        <div :class="`relative w-full overflow-hidden rounded-xl bg-theme-input text-left ${inputStateStyle}`">
          <combobox-input
            :id="props.id"
            class="w-full border-none bg-inherit py-3 pl-4 text-sm outline-none focus:ring-1"
            :display-value="() => displayValue || props.label"
            @change="query = $event.target.value"
            @blur="emits('blur', $event)"
            @focusin="handleInputBoxFocusIn"
            @focusout="inputBoxInFocus = false"
          />
          <combobox-button class="absolute inset-y-0 right-0 flex items-center pr-2">
            <chevron-up-down-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </combobox-button>
        </div>
        <transition-root
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <combobox-options
            class="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-theme-input py-1 text-theme-input ring-1 ring-theme-primary focus:outline-none"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-theme-input"
            >
              <font-awesome-icon icon="fa-regular fa-trash-can" class="mr-2 text-xs" />
              Nothing found
            </div>

            <combobox-option
              v-for="option in filteredOptions"
              :key="option.value"
              v-slot="{ selected, active }"
              as="template"
              :value="option.value"
            >
              <li
                :class="`relative mx-2 my-1 cursor-default select-none rounded-lg py-2 pl-10 pr-4 ${
                  active ? 'bg-theme-primary text-theme-inverted' : 'text-theme-input'
                }`"
              >
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  :class="`absolute inset-y-0 left-0 flex items-center pl-3 ${
                    active ? 'text-theme-inverted' : 'text-them-input'
                  }`"
                >
                  <check-icon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </combobox-option>
          </combobox-options>
        </transition-root>
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
    </combobox>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emits = defineEmits(['update:modelValue', 'blur'])
const props = defineProps({
  modelValue: {
    type: undefined, // Will accept any type,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: [String, Number],
    default: 'Search for an option',
  },
  border: {
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

const inputBoxInFocus = ref(false)
const handleInputBoxFocusIn = () => {
  inputBoxInFocus.value = true
  console.log(inputBoxInFocus)
}

const inputStateStyle = computed(() => {
  let inputClass

  if (props.invalid) {
    inputClass = 'ring-1 ring-theme-error'
  } else if (props.success) {
    inputClass = 'ring-1 ring-theme-success'
  }

  // Make the ring in primary color if focused
  if (inputBoxInFocus.value) {
    inputClass = 'ring-1 ring-theme-primary'
  }

  // append ring color
  if (props.border && !(props.success || props.invalid)) {
    inputClass = 'ring-1 ring-theme-section'
  }

  return inputClass
})

const displayValue = computed(() => props.options.find((option) => props.modelValue === option.value)?.label)
const query = ref('')
const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter((option) =>
        option.label.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>
