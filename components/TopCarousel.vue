<template>
  <div class="container relative pb-12">
    <template v-if="items && items.length"> </template>
    <UCarousel
      ref="carouselRef"
      :items="items"
      :ui="{
        item: 'basis-full',
        indicators: {
          wrapper: 'justify-end right-12 bottom-12',
        },
      }"
      class="overflow-hidden rounded-lg"
      indicators
    >
      <template #default="{ item }">
        <div class="relative w-full overflow-hidden px-1">
          <img
            :src="item.image"
            class="h-[460px] w-full rounded-lg object-cover md:h-[540px]"
            draggable="false"
          />

          <!-- Left Fade -->
          <div
            class="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-black/70 to-transparent"
          ></div>
          <!-- Right Fade -->
          <div
            class="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/70 to-transparent"
          ></div>
          <div
            class="absolute left-12 top-1/2 z-50 -translate-y-1/2 transform text-cream md:max-w-[50%]"
          >
            <div class="my-6">
              <p class="text-lg lg:text-3xl">Introducing Osamu Tezuka</p>
              <p class="font-anta text-2xl font-semibold lg:text-6xl">
                Some manga's title
              </p>
            </div>
            <div>
              <button
                class="rounded-lg bg-brick px-4 py-2 transition-all hover:bg-brick/90 active:scale-[0.99]"
              >
                Read Now
              </button>
            </div>
          </div>
        </div>
      </template>
      <template #indicator="{ onClick, page, active }">
        <UButton
          :label="String(page)"
          :variant="active ? 'solid' : 'outline'"
          size="2xs"
          class="min-w-6 justify-center rounded-full"
          :class="
            active
              ? 'bg-brick text-white hover:bg-brick/90'
              : 'border-gray-100 bg-transparent text-gray-500 hover:bg-gray-300/90'
          "
          @click="onClick(page)"
        />
      </template>
    </UCarousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const carouselRef = ref()
const items = ref([])

onMounted(async () => {
  try {
    const { data } = await $fetch('/api/topcarousel')
    items.value = data || []
    setInterval(() => {
      if (!carouselRef.value) return

      if (carouselRef.value.page === carouselRef.value.pages) {
        return carouselRef.value.select(0)
      }

      carouselRef.value.next()
    }, 5000)
  } catch (error) {
    console.error('Failed to fetch top carousel items:', error)
  }
  // Auto-slide logic
})
</script>
