<template>
  <div class="space-y-10">

    <!-- Hero -->
    <section class="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl shadow-xl p-12">
      <h1 class="text-5xl font-bold mb-3">Contact Manager</h1>
      <p class="text-lg text-indigo-100 mb-6">
        A full-stack demo built with Java Spring Boot, MySQL, Redis and Vue / Nuxt 3.
      </p>
      <div class="flex gap-4 flex-wrap">
        <NuxtLink
          to="/contacts"
          class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
        >
          View Contacts
        </NuxtLink>
        <NuxtLink
          to="/contacts/create"
          class="bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-900 transition"
        >
          Add Contact
        </NuxtLink>
      </div>
    </section>

    <!-- System Status -->
    <section class="bg-white rounded-2xl shadow-md p-6">
      <h2 class="text-2xl font-bold mb-5 flex items-center gap-2 text-gray-800">
        <span
          :class="[
            'w-3 h-3 rounded-full',
            health?.status === 'ok' ? 'bg-green-500' : health ? 'bg-yellow-400' : 'bg-gray-300',
          ]"
        />
        System Status:
        <span :class="health?.status === 'ok' ? 'text-green-600' : 'text-yellow-500'">
          {{ health ? (health.status === 'ok' ? 'Healthy' : 'Degraded') : 'Loading…' }}
        </span>
      </h2>

      <div v-if="healthError" class="text-red-500 text-sm">
        Could not reach backend — is the API running on port 5005?
      </div>

      <div v-else-if="health" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Backend -->
        <div class="border border-gray-100 rounded-xl p-4">
          <h3 class="font-semibold text-gray-700 mb-2">Backend API</h3>
          <p class="text-sm text-gray-500">{{ health.framework }}</p>
          <p class="text-sm text-gray-500">{{ health.language }}</p>
          <p class="text-sm font-medium text-indigo-600 mt-1">{{ health.app }}</p>
        </div>
        <!-- Database -->
        <div class="border border-gray-100 rounded-xl p-4">
          <h3 class="font-semibold text-gray-700 mb-2">Database</h3>
          <p class="text-sm text-gray-500 mb-2">{{ health.database.type }}</p>
          <StatusBadge :connected="health.database.connected" />
        </div>
        <!-- Cache -->
        <div class="border border-gray-100 rounded-xl p-4">
          <h3 class="font-semibold text-gray-700 mb-2">Cache</h3>
          <p class="text-sm text-gray-500 mb-2">{{ health.cache.type }}</p>
          <StatusBadge :connected="health.cache.connected" />
        </div>
      </div>
    </section>

    <!-- Recent Contacts -->
    <section>
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-3xl font-bold text-gray-800">Recent Contacts</h2>
        <NuxtLink to="/contacts" class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
          View all
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div v-if="contactsError" class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-sm">
        Failed to load contacts. Make sure the backend is running.
      </div>

      <div v-else-if="!contacts" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl shadow-md p-6 animate-pulse h-40" />
      </div>

      <div v-else-if="contacts.length === 0" class="bg-white rounded-xl shadow-md p-12 text-center">
        <div class="text-6xl mb-4">📭</div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No contacts yet</h3>
        <p class="text-gray-500 mb-4">Add your first contact to get started.</p>
        <NuxtLink
          to="/contacts/create"
          class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Add First Contact
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContactCard v-for="c in recentContacts" :key="c.id" :contact="c" />
      </div>
    </section>

    <!-- Stack Info -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="text-indigo-500 mb-3 text-3xl">☕</div>
        <h3 class="text-lg font-bold mb-1">Java Spring Boot</h3>
        <p class="text-gray-500 text-sm">Enterprise-grade REST API with Spring Data JPA and validation.</p>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="text-violet-500 mb-3 text-3xl">🗄️</div>
        <h3 class="text-lg font-bold mb-1">MySQL + Redis</h3>
        <p class="text-gray-500 text-sm">Persistent storage with MySQL and fast caching via Redis.</p>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="text-green-500 mb-3 text-3xl">💚</div>
        <h3 class="text-lg font-bold mb-1">Vue / Nuxt 3</h3>
        <p class="text-gray-500 text-sm">Modern SSR frontend with Tailwind CSS and composables.</p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const { getHealth, getAllContacts } = useApi()

const { data: health, error: healthError } = await useAsyncData('health', () => getHealth())
const { data: contacts, error: contactsError } = await useAsyncData('contacts-home', () => getAllContacts())

const recentContacts = computed(() => (contacts.value ?? []).slice(0, 3))
</script>
