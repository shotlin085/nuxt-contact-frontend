<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col gap-3">
    <!-- Avatar + Name -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
        {{ initials }}
      </div>
      <div>
        <h2 class="text-lg font-bold text-gray-800">{{ contact.name }}</h2>
        <p class="text-xs text-gray-400">ID #{{ contact.id }}</p>
      </div>
    </div>

    <!-- Details -->
    <div class="space-y-1 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="truncate">{{ contact.email }}</span>
      </div>
      <div v-if="contact.phone" class="flex items-center gap-2">
        <svg class="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>{{ contact.phone }}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-400">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{{ formatDate(contact.createdAt) }}</span>
      </div>
    </div>

    <!-- View button -->
    <NuxtLink
      :to="`/contacts/${contact.id}`"
      class="mt-auto inline-flex items-center justify-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
    >
      View details
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/composables/useApi'

const props = defineProps<{ contact: Contact }>()

const initials = computed(() =>
  props.contact.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
