<template>
  <div class="max-w-lg mx-auto">

    <div class="mb-6">
      <NuxtLink to="/contacts" class="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Contacts
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="bg-white rounded-2xl shadow-md p-10 animate-pulse h-64" />

    <!-- Error / Not found -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-8 text-center">
      <div class="text-5xl mb-3">🔍</div>
      <h2 class="text-xl font-semibold mb-1">Contact not found</h2>
      <p class="text-sm">No contact with ID #{{ route.params.id }} exists.</p>
      <NuxtLink to="/contacts" class="mt-4 inline-block text-indigo-600 underline text-sm">
        Back to all contacts
      </NuxtLink>
    </div>

    <!-- Contact detail -->
    <div v-else-if="contact" class="bg-white rounded-2xl shadow-md p-8 space-y-6">

      <!-- Avatar + name -->
      <div class="flex items-center gap-5">
        <div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl flex-shrink-0">
          {{ initials }}
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ contact.name }}</h1>
          <p class="text-sm text-gray-400">Contact #{{ contact.id }}</p>
        </div>
      </div>

      <hr class="border-gray-100" />

      <!-- Fields -->
      <dl class="space-y-4">
        <div>
          <dt class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Email</dt>
          <dd class="text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ contact.email }}
          </dd>
        </div>

        <div v-if="contact.phone">
          <dt class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phone</dt>
          <dd class="text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ contact.phone }}
          </dd>
        </div>

        <div>
          <dt class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Created</dt>
          <dd class="text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(contact.createdAt) }}
          </dd>
        </div>
      </dl>

      <NuxtLink
        to="/contacts/create"
        class="block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Add Another Contact
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getContactById } = useApi()

const id = Number(route.params.id)
const { data: contact, pending, error } = await useAsyncData(`contact-${id}`, () => getContactById(id))

const initials = computed(() =>
  (contact.value?.name ?? '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
