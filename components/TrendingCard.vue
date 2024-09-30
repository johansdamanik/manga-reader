<template>
  <div>
    <template v-if="index === 0">
      <div
        class="flex w-full flex-col gap-2 overflow-hidden rounded-md bg-[#faf0e6]"
      >
        <div class="w-full">
          <NuxtLink :to="`/`">
            <img
              :src="series.image"
              class="aspect-[16/9] max-h-[450px] w-full object-cover object-top"
            />
          </NuxtLink>
        </div>
        <div
          class="flex w-full items-center justify-center gap-2 p-2 text-dark"
        >
          <div class="rounded-md border border-[#797979] p-1 px-4 font-medium">
            {{ index + 1 }}
          </div>
          <NuxtLink :to="`/`">
            <div class="truncate font-anta">
              {{ series.title }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="flex w-full items-center gap-2 rounded-md border border-[#797979] p-2"
      >
        <div class="w-1/3">
          <NuxtLink :to="`/`">
            <img
              :src="series.image"
              class="aspect-[11/12] rounded-md object-cover object-top"
            />
          </NuxtLink>
        </div>
        <div class="grow">
          <NuxtLink :to="`/`">
            <p class="truncate text-sm">{{ series.title }}</p>
          </NuxtLink>
          <TypeTag>
            {{ series.genre }}
          </TypeTag>
        </div>
        <div class="rounded-md border border-[#797979] p-1 px-4">
          {{ index + 1 }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import TypeTag from './TypeTag.vue';

const { series, index } = defineProps(['series', 'index'])
</script>
