<template>
  <div>
    <!-- Start fake image -->
    <div v-if="!!props.fake" class="rounded-full">
      <div
        :class="`w-${props.width} h-${props.height} flex items-center justify-center rounded-full bg-theme-primary text-lg text-theme-inverted lg:text-sm`"
      >
        {{ displayName }}
      </div>
    </div>
    <!-- End fake image -->
    <!-- Start real image -->
    <div v-else>
      <div
        :class="`${imageIsLoading ? 'flex' : 'hidden'} h-${props.height} w-${
          props.width
        } items-center justify-center rounded-full bg-theme-primary text-sm text-theme-inverted`"
      >
        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin"></font-awesome-icon>
      </div>
      <img
        :src="props.src"
        alt="Profile picture"
        :class="`${imageIsLoading ? 'hidden' : 'block'} h-${props.height} w-${props.width} rounded-full object-cover`"
        @load="handleImageLoaded"
      />
    </div>
    <!-- End real image -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/** Use valid tailwind height and width values */
const props = defineProps({
  fake: {
    type: String,
    default: undefined,
    validator: (value) => !!value,
  },
  src: {
    type: String,
    default: undefined,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
})

const displayName = computed(() => {
  // we'll display the initials for the fake avatar
  const names = props.fake.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initials
})

const imageIsLoading = ref(true)
const handleImageLoaded = () => {
  imageIsLoading.value = false
}
</script>
