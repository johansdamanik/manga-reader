<template>
  <div>
    <div class="bg-black px-4">
      <TopCarousel />
    </div>
    <div class="px-4">
      <HotWeekly />
      <div class="container py-12">
        <div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
          <div class="lg:col-span-3" id="latest-update">
            <p class="font-anta text-xl">Latest update</p>
            <div
              class="my-4 grid w-full grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4"
            >
              <SeriesCard
                :series="series"
                v-for="series in seriesList"
                :key="series.id"
              />
            </div>
            <div class="my-4 flex items-center justify-center space-x-2">
              <UPagination
                :active-button="{ variant: 'outline', color: 'yellow' }"
                :inactive-button="{ color: 'gray' }"
                :model-value="page"
                :total="totalPages"
                :page-count="5"
                @update:model-value="handlePageChange"
              />
            </div>
          </div>
          <div class="lg:col-span-1">
            <p class="font-anta text-xl">Trending</p>
            <div class="my-4 flex justify-between gap-1 text-sm">
              <button
                v-for="date in ['Today', 'Weekly', 'Monthly']"
                :key="date"
                class="w-full rounded-md border border-brick px-4 py-2"
                :class="trendingDate === date ? 'bg-brick' : 'bg-brick/20'"
                @click.prevent="selectTrendingDate(date)"
              >
                {{ date }}
              </button>
            </div>
            <div
              class="my-4 rounded-lg border-2 border-gray-200 bg-[#404040] p-3"
            >
              <div class="flex flex-col gap-6">
                <TrendingCard
                  :series="series"
                  :index="index"
                  v-for="(series, index) in trendingSeries"
                  :key="index"
                />
              </div>
            </div>
            <div
              class="cursor-pointer rounded-lg border bg-[#404040] py-4 transition-all hover:bg-[#404040]/70 active:scale-95"
            >
              <p class="text-center">View All</p>
            </div>
          </div>
        </div>
        <div class="my-6">
          <BottomCarousel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const seriesList = ref([])
const loading = ref(false)
const page = ref(1)
const totalPages = ref(0)

const fetchSeriesList = async () => {
  loading.value = true
  try {
    const data = await $fetch(`/api/manga?page=${page.value}`)
    seriesList.value = data.mangaList || []
    totalPages.value = data.totalPages || 1 // Pastikan API mengembalikan total halaman
  } catch (error) {
    console.error('Error fetching manga:', error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (newPage) => {
  page.value = newPage
  const element = document.getElementById('latest-update')
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    })
  } else {
    //
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  fetchSeriesList()
}

const trendingSeries = ref([])
const trendingDate = ref('Today')

const selectTrendingDate = (n) => {
  trendingDate.value = n
}
const fetchTrendingSeries = async () => {
  try {
    const { data } = await $fetch('/api/trending')
    trendingSeries.value = data || []
  } catch (error) {
    console.error('Error fetching trending series:', error)
  }
}

onMounted(() => {
  fetchSeriesList()
  fetchTrendingSeries()
})
</script>
