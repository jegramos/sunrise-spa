<template>
  <div class="relative mt-8 flex flex-col">
    <combobox
      nullable
      :disabled="props.disabled"
      :model-value="props.modelValue"
      @update:model-value="(value) => emits('update:modelValue', value)"
    >
      <div class="relative">
        <div :class="`relative w-full overflow-hidden rounded-xl bg-theme-input text-left ${inputStateStyle}`">
          <combobox-input
            :id="props.id"
            :disabled="props.disabled"
            :class="`w-full border-none bg-inherit py-3 pl-4 outline-none focus:ring-1 ${props.textClasses} ${
              props.disabled ? 'cursor-not-allowed opacity-30' : ''
            }`"
            :display-value="() => displayValue || (inputBoxInFocus ? '' : props.label)"
            @change="query = $event.target.value"
            @blur="emits('blur', $event)"
            @focusin="inputBoxInFocus = true"
            @focusout="handleInputBoxFocusOut"
          />
          <combobox-button class="absolute inset-y-0 right-0 flex items-center pr-2">
            <!-- Start dropdown button -->
            <template v-if="!props.isLoading">
              <chevron-up-down-icon
                :class="`h-5 w-5 text-theme-input transition-all duration-300 ui-open:rotate-180 ui-open:transform ${
                  props.disabled ? 'cursor-not-allowed text-opacity-30' : ''
                }`"
                aria-hidden="true"
              />
            </template>
            <template v-else>
              <arrow-path-icon
                :class="`mr-1 h-4 w-4 animate-spin text-theme-input ${
                  props.disabled ? 'cursor-not-allowed text-opacity-30' : ''
                }`"
                aria-hidden="true"
              />
            </template>
            <!-- End dropdown button -->
          </combobox-button>
        </div>
        <!-- Start animated label -->
        <label
          :for="props.id"
          :class="`absolute top-3 left-4 mb-1.5 text-theme-input transition-all duration-200 ${
            inputBoxInFocus || props.modelValue ? 'left-1 -top-6 text-xs' : 'invisible'
          }`"
        >
          {{ props.label }}
        </label>
        <!-- End animated label -->
        <transition-root
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <combobox-options
            class="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-theme-input py-1 text-theme-input ring-1 ring-theme-primary focus:outline-none"
          >
            <!-- Start limit indication -->
            <template
              v-if="
                props.filterLimit > 0 &&
                props.filterLimit === filteredOptions.length &&
                props.filterLimit < props.options.length
              "
            >
              <div class="mr-2 cursor-default select-none py-3 text-center text-xs italic text-theme-primary">
                &lt;&lt;<span class="mx-1">Showing the first {{ props.filterLimit }} results</span>&gt;&gt;
              </div>
            </template>
            <!-- End limit indication -->
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-theme-input"
            >
              <font-awesome-icon icon="fa-regular fa-trash-can" class="mr-2 mb-0.5 text-xs" />
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
                <!-- Start additional context -->
                <span
                  v-if="option.badge"
                  class="absolute inset-y-2.5 right-0 z-10 mr-1 flex flex h-5 items-center rounded-lg bg-theme-warning px-1 text-xs text-theme-warning-panel"
                >
                  {{ option.badge }}
                </span>
                <!-- End additional context -->
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
import { CheckIcon, ChevronUpDownIcon, ArrowPathIcon } from '@heroicons/vue/20/solid'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useSleep } from '@/composables/helpers.js'

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
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textClasses: {
    type: String,
    default: '',
  },
  filterLimit: {
    type: Number,
    default: 0,
  },
})

const inputBoxInFocus = ref(false)

// we add a bit of a delay after focusing out so that
// we don't get flickers in ring color changes
const handleInputBoxFocusOut = async () => {
  const sleep = useSleep()
  await sleep(0.2)
  inputBoxInFocus.value = false
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

const filteredOptions = computed(() => {
  // The options may contain thousands of elements that could slow
  // the component down. Consumers of this component may choose to add a filter limit
  // for optimizing loading time
  const hasFilterLimit = props.filterLimit > 0

  if (query.value === '') {
    return hasFilterLimit ? props.options.slice(0, props.filterLimit) : props.options
  }

  if (hasFilterLimit) {
    return props.options
      .filter((option) =>
        option.label.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
      .slice(0, props.filterLimit)
  }

  return props.options.filter((option) =>
    option.label.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, ''))
  )
})
</script>
