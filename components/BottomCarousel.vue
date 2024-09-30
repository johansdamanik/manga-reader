<template>
  <div class="container relative pb-12">
    <UCarousel
      ref="carouselRef"
      :items="items"
      :ui="{
        item: 'basis-full',
        indicators: {
          wrapper: 'relative bottom-0 mt-4',
          active: 'bg-brick',
        },
      }"
      class="overflow-hidden rounded-lg"
      indicators
    >
      <template #default="{ item }">
        <div class="relative w-full overflow-hidden px-1">
          <img
            :src="item.image"
            class="h-[360px] w-full rounded-lg object-cover"
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
        </div>
      </template>
    </UCarousel>
  </div>
</template>

<script setup>
const carouselRef = ref()
const items = ref([])

onMounted(async () => {
  try {
    const { data } = await $fetch('/api/bottomcarousel')
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
