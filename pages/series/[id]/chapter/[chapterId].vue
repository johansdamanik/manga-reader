<template>
  <div class="px-0 py-4 md:p-4">
    <div class="container min-h-screen">
      <template v-if="chapter && chapter.id">
        <div class="my-4 lg:my-12">
          <div class="p-4">
            <p class="text-center font-anta text-xl font-medium lg:text-3xl">
              {{ chapter.mangaTitle }} - Chapter {{ chapter.chapter }}
            </p>
            <p class="mt-2 text-center lg:text-lg">
              All chapters are in
              <NuxtLink :to="`/series/${seriesId}`" class="text-brick">{{
                chapter.mangaTitle
              }}</NuxtLink>
            </p>
          </div>
          <div class="my-4 flex items-center justify-between px-2">
            <div>
              <select
                v-model="currentChapterId"
                @change="goToChapter"
                class="border-xl rounded-xl border border-brick bg-transparent px-2 py-1 text-xs text-cream lg:px-4 lg:py-2 lg:text-base"
              >
                <option
                  v-for="(chapterItem, index) in chapter.chapters"
                  :key="index"
                  :value="chapterItem.id"
                  :class="
                    chapterItem.id === currentChapterId
                      ? 'bg-brick text-cream'
                      : 'text-dark'
                  "
                >
                  Chapter {{ chapterItem.chapter }}
                </option>
              </select>
            </div>

            <div class="flex items-center gap-1 lg:gap-3">
              <!-- Prev button -->
              <button
                class="border-xl flex items-center justify-center rounded-xl border border-brick px-2 py-1 text-xs hover:bg-brick/80 active:scale-[0.99] lg:px-4 lg:py-2 lg:text-base"
                :disabled="currentChapterNumber === smallestChapter"
                :class="
                  currentChapterNumber !== smallestChapter
                    ? 'bg-brick'
                    : 'cursor-not-allowed'
                "
                @click="goToPreviousChapter"
              >
                <UIcon name="i-material-symbols-chevron-left-rounded" />
                Prev
              </button>

              <!-- Next button -->
              <button
                class="border-xl flex items-center justify-center rounded-xl border border-brick px-2 py-1 text-xs hover:bg-brick/80 active:scale-[0.99] lg:px-4 lg:py-2 lg:text-base"
                :disabled="currentChapterNumber === largestChapter"
                :class="
                  currentChapterNumber !== largestChapter
                    ? 'bg-brick'
                    : 'cursor-not-allowed'
                "
                @click="goToNextChapter"
              >
                Next
                <template v-if="currentChapterNumber !== largestChapter">
                  <UIcon name="i-material-symbols-chevron-right-rounded" />
                </template>
                <template v-else>
                  <UIcon
                    name="i-material-symbols-lock-person-rounded"
                    class="ml-1"
                  />
                </template>
              </button>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <img
              v-for="image in chapter.images"
              :key="image"
              :src="image"
              :alt="`${chapter.mangaTitle} - ${chapter.chapter}`"
              class="h-auto max-w-full"
            />
          </div>
          <div class="my-4 flex items-center justify-between px-2">
            <div>
              <select
                v-model="currentChapterId"
                @change="goToChapter"
                class="border-xl rounded-xl border border-brick bg-transparent px-2 py-1 text-xs text-cream lg:px-4 lg:py-2 lg:text-base"
              >
                <option
                  v-for="(chapterItem, index) in chapter.chapters"
                  :key="index"
                  :value="chapterItem.id"
                  :class="
                    chapterItem.id === currentChapterId
                      ? 'bg-brick text-cream'
                      : 'text-dark'
                  "
                >
                  Chapter {{ chapterItem.chapter }}
                </option>
              </select>
            </div>

            <div class="flex items-center gap-1 lg:gap-3">
              <!-- Prev button -->
              <button
                class="border-xl flex items-center justify-center rounded-xl border border-brick px-2 py-1 text-xs hover:bg-brick/80 active:scale-[0.99] lg:px-4 lg:py-2 lg:text-base"
                :disabled="currentChapterNumber === smallestChapter"
                :class="
                  currentChapterNumber !== smallestChapter
                    ? 'bg-brick'
                    : 'cursor-not-allowed'
                "
                @click="goToPreviousChapter"
              >
                <UIcon name="i-material-symbols-chevron-left-rounded" />
                Prev
              </button>

              <!-- Next button -->
              <button
                class="border-xl flex items-center justify-center rounded-xl border border-brick px-2 py-1 text-xs hover:bg-brick/80 active:scale-[0.99] lg:px-4 lg:py-2 lg:text-base"
                :disabled="currentChapterNumber === largestChapter"
                :class="
                  currentChapterNumber !== largestChapter
                    ? 'bg-brick'
                    : 'cursor-not-allowed'
                "
                @click="goToNextChapter"
              >
                Next
                <template v-if="currentChapterNumber !== largestChapter">
                  <UIcon name="i-material-symbols-chevron-right-rounded" />
                </template>
                <template v-else>
                  <UIcon
                    name="i-material-symbols-lock-person-rounded"
                    class="ml-1"
                  />
                </template>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="fixed bottom-8 right-4 z-50">
      <UIcon
        name="i-material-symbols-expand-circle-up-rounded"
        class="h-8 w-8 cursor-pointer bg-brick"
        @click="scrollToTop"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const seriesId = route.params.id
const chapterId = route.params.chapterId
const chapter = ref({ chapters: [], chapter: '' }) // Initialize with an empty array for chapters
const isLoading = ref(true)
const currentChapterId = ref(chapterId)
const currentChapterNumber = ref(0) // Initialize the current chapter number

// Calculate smallest and largest chapters
const smallestChapter = computed(() => {
  if (chapter.value.chapters.length > 0) {
    return Math.min(
      ...chapter.value.chapters.map((ch) => parseFloat(ch.chapter)),
    )
  }
  return 0 // Default value when no chapters are available
})

const largestChapter = computed(() => {
  if (chapter.value.chapters.length > 0) {
    return Math.max(
      ...chapter.value.chapters.map((ch) => parseFloat(ch.chapter)),
    )
  }
  return 0 // Default value when no chapters are available
})

// Function to go to a specific chapter
function goToChapter(e) {
  const id = e.target.value
  router.push({ path: `/series/${seriesId}/chapter/${id}` })
}

// Function to go to the previous chapter
function goToPreviousChapter() {
  const currentIndex = chapter.value.chapters.findIndex(
    (ch) => ch.id === currentChapterId.value,
  )
  if (currentIndex < chapter.value.chapters.length - 1) {
    const nextChapter = chapter.value.chapters[currentIndex + 1]
    currentChapterId.value = nextChapter.id
    currentChapterNumber.value = parseFloat(nextChapter.chapter)
    router.push({ path: `/series/${seriesId}/chapter/${nextChapter.id}` })
  }
}

// Function to go to the next chapter
function goToNextChapter() {
  const currentIndex = chapter.value.chapters.findIndex(
    (ch) => ch.id === currentChapterId.value,
  )
  if (currentIndex > 0) {
    const previousChapter = chapter.value.chapters[currentIndex - 1]
    currentChapterId.value = previousChapter.id
    currentChapterNumber.value = parseFloat(previousChapter.chapter)
    router.push({ path: `/series/${seriesId}/chapter/${previousChapter.id}` })
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// Fetch chapter details on component mount
onMounted(async () => {
  await fetchChapterData(chapterId)
})

async function fetchChapterData(chapterId) {
  try {
    // Call the actual API here to get chapter details
    const response = await $fetch(`/api/chapter/${chapterId}`)
    chapter.value = response
    currentChapterNumber.value = parseFloat(chapter.value.chapter) // Set the current chapter number
  } catch (error) {
    console.error('Error fetching chapter data:', error)
    chapter.value = null // Set to null if there's an error
  } finally {
    isLoading.value = false // Set loading to false after API call
  }
}
</script>
