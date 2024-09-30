<template>
  <div
    class="relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-lg border border-[#797979] bg-[#404040] transition-all hover:bg-[#404040]/80 active:scale-[0.99]"
    @click.prevent="handleViewChapter"
  >
    <template v-if="chapter.locked">
      <div
        class="bg-brick absolute right-2 top-2 flex items-center gap-2 rounded-lg px-3 py-1"
      >
        Locked
        <UIcon name="i-material-symbols-lock-person-rounded" />
      </div>
    </template>
    <div class="w-3/12">
      <img
        src="https://dummyimage.com/460x640"
        :alt="'Chapter ' + chapter.chapter"
        class="aspect-[3/4] object-cover"
      />
    </div>
    <div>
      <p class="mb-1 text-sm lg:text-lg">Chapter {{ chapter.chapter }}</p>
      <template v-if="chapter.locked">
        <p class="text-xxs lg:text-xs">Unreleased</p>
      </template>
      <template v-else>
        <p class="text-xxs lg:text-xs">
          {{ formatTimeAgo(chapter.releaseDate) }}
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const { chapter } = defineProps(['chapter'])
const router = useRouter()

const handleViewChapter = () => {
  if (chapter.locked) {
    // Custom function for locked chapter
    // Prevent action if the chapter is locked
    return
  }

  // Replace '/' with the correct path to view the chapter
  router.push({ path: `/series/${chapter.mangaId}/chapter/${chapter.id}` })
}
</script>
