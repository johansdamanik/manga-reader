<template>
  <div class="container py-24">
    <div class="flex items-center gap-2">
      <p class="font-anta text-xl">Weekly Hot</p>
      <UIcon name="i-gravity-ui-flame" class="h-5 w-5" />
    </div>
    <div class="mt-8">
      <div class="w-full overflow-x-auto" style="scrollbar-width: none">
        <div class="flex flex-nowrap items-center justify-between gap-2">
          <div
            v-for="series in weeklySeries"
            :key="series.id"
            class="relative aspect-[11/12] min-w-[240px] max-w-[240px] overflow-hidden rounded-lg bg-yellow-50"
          >
            <div
              class="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-dark to-transparent"
            ></div>
            <img :src="series.image" :alt="series.title" />
            <div class="absolute bottom-0 left-0 w-full p-3">
              <p class="truncate font-anta">{{ series.title }}</p>
              <div class="flex items-center justify-between text-xs">
                <p class="text-gray-300">{{ series.author }}</p>
                <div class="flex items-center">
                  <p>{{ series.rate }}</p>
                  <UIcon name="i-material-symbols-star-rate-rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const weeklySeries = ref([])

async function fetchWeeklySeries() {
  try {
    const { data } = await $fetch('/api/hotweekly')
    weeklySeries.value = data || []
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchWeeklySeries()
})
</script>
