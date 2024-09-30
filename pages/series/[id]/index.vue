<template>
  <div>
    <div class="bg-black p-2 lg:p-4">
      <div class="container rounded-lg bg-[#101010] p-2 md:p-4 lg:p-8">
        <div
          class="grid grid-cols-1 gap-2 transition-all md:gap-4 lg:grid-cols-12 lg:gap-6"
        >
          <div class="col-span-5">
            <img
              :src="series.coverImage"
              :alt="series.title"
              class="aspect-[3/4] w-full rounded-md"
            />

            <button
              class="my-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brick py-3 text-xl transition-all hover:bg-brick/90 active:scale-[0.99]"
            >
              <UIcon
                name="i-material-symbols-person-add-outline"
                class="h-5 w-5"
              />
              <p>Follow</p>
              <UIcon
                name="i-material-symbols-person-add-outline"
                class="h-5 w-5"
              />
              <p>48281</p>
            </button>
          </div>
          <div class="col-span-7">
            <p class="font-anta text-xl lg:text-4xl">
              {{ series.title }}
            </p>
            <div class="my-6">
              <div class="flex gap-4 text-lg">
                <p class="border-b-2 border-brick font-medium">42,124 Views</p>
                <p class="border-b-2 border-brick font-medium">
                  {{ series.totalChapters }} Chapters
                </p>
              </div>
              <div
                class="w-full rounded-b-lg rounded-t-none border-4 border-t-0 border-brick p-4"
              >
                <div class="mb-4">
                  <p class="mb-4 font-anta text-xl">Description:</p>
                  <p class="whitespace-pre-line break-words">
                    {{ series.description }}
                  </p>
                </div>

                <div class="mb-6">
                  <p class="mb-4 font-anta text-lg">
                    Genres:
                    <span
                      class="text-lg font-normal"
                      v-for="(genre, index) in series.genres"
                      :key="genre"
                      >{{ genre
                      }}{{
                        index + 1 !== series.genres.length ? ', ' : '.'
                      }}</span
                    >
                  </p>
                </div>
                <div class="mb-4">
                  <p class="mb-4 font-anta text-xl">Additional Info:</p>
                  <div class="mb-6">
                    <p class="mb-4 font-anta">
                      Other names:
                      <span
                        class="font-normal"
                        v-for="(otherName, index) in series.otherNames"
                        :key="otherName"
                        >{{ otherName
                        }}{{
                          index + 1 !== series.otherNames.length ? ' | ' : ''
                        }}</span
                      >
                    </p>
                  </div>
                  <div class="flex flex-col gap-4 font-medium lg:flex-row">
                    <p class="capitalize">Status: {{ series.status }}</p>
                    <p>Author: {{ series.author }}</p>
                    <p>Release year: {{ series.releaseDate }}</p>
                  </div>
                </div>
                <div>
                  <p class="mb-2 font-anta text-xl">Tags:</p>
                  <div class="flex flex-wrap gap-x-2 gap-y-1">
                    <div v-for="tag in series.tags" :key="tag">
                      <TypeTag>{{ tag }}</TypeTag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:-4 w-full bg-dark p-2">
      <div class="container p-2 md:p-4 lg:p-8">
        <p class="font-anta text-2xl lg:text-3xl">All Chapters</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ChapterCard
            v-for="chapter in formattedChapters"
            :chapter="chapter"
            :key="chapter.id"
          />
        </div>
        <div class="my-12">
          <BottomCarousel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const seriesId = route.params.id
const series = ref({})

const formattedChapters = computed(() => {
  if (!series.value.chapters || series.value.chapters.length === 0) {
    return []
  }

  // Get the highest chapter (assuming chapters are sorted in descending order)
  const lastChapter = series.value.chapters[0].chapter
  const lockedChapterNumber = parseInt(lastChapter) + 1

  // Create the locked chapter object
  const lockedChapter = {
    id: 'locked_id',
    chapter: `${lockedChapterNumber}`,
    title: 'Locked',
    releaseDate: new Date(),
    locked: true,
  }

  // Return the list with the locked chapter at the beginning
  return [lockedChapter, ...series.value.chapters]
})

async function fetchSeriesData(seriesId) {
  try {
    const data = await $fetch(`/api/manga/${seriesId}`)
    series.value = data
  } catch (error) {
    console.error('Error fetching series data:', error)
  }
}

onMounted(() => {
  fetchSeriesData(seriesId)
})
</script>
