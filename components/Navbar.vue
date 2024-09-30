<template>
  <nav class="bg-black px-4 py-6 text-cream">
    <div class="container flex items-center justify-between">
      <a href="/" class="text-xl font-bold">LOGO</a>
      <div class="flex items-center gap-4">
        <ul class="hidden items-center gap-6 text-sm lg:flex">
          <li v-for="url in urls" :key="url" class="hover:text-yellow-50">
            <NuxtLink :to="url.link"> {{ url.label }} </NuxtLink>
          </li>
        </ul>
        <UInput
          v-model="value"
          placeholder="Search series..."
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          inputClass="bg-yellow-50 focus:ring-gray-400"
          class="ml-10"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
const value = ref('')
const urls = [
  { link: '/', label: 'All' },
  { link: '/', label: 'Action' },
  { link: '/', label: 'Love Story' },
  { link: '/', label: 'Adventure' },
  { link: '/', label: 'Most Popular' },
]
</script>
