<template>
  <div class="w-full rounded-lg bg-[#404040] p-2">
    <NuxtLink :to="`/series/${series.id}`">
      <img
        :src="series.coverImage"
        :alt="series.title"
        class="aspect-[11/12] w-full object-cover object-top"
      />
    </NuxtLink>
    <div class="my-4">
      <NuxtLink :to="`/series/${series.id}`">
        <p class="text-md truncate font-anta lg:text-lg">{{ series.title }}</p>
      </NuxtLink>
      <div class="my-2 flex flex-col gap-2">
        <NuxtLink
          v-for="ch in latestChapters"
          :key="ch.id"
          :to="`/series/${series.id}/chapter/${ch.id}`"
          class="rounded-md border border-gray-300 px-2 py-2 text-center text-xxs transition-all duration-300 hover:bg-gray-500/40 active:scale-95 md:text-xs lg:text-sm"
        >
          Ch {{ ch.chapter }} - {{ ch.dateLabel }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { series } = defineProps(['series'])

const latestChapters = computed(() => {
  if (!series.chapters || series.chapters.length === 0) {
    return [] // Return an empty array if no chapters are available
  }

  return series.chapters.map((ch) => {
    return {
      ...ch,
      dateLabel: formatTimeAgo(ch.releaseDate),
    }
  })
})
</script>
