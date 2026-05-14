<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">All Contacts</h1>
        <p class="text-gray-500 mt-1">{{ contacts?.length ?? 0 }} contact{{ (contacts?.length ?? 0) !== 1 ? 's' : '' }} found</p>
      </div>
      <NuxtLink
        to="/contacts/create"
        class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Contact
      </NuxtLink>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-sm">
      Failed to load contacts. Make sure the backend is running on port 5005.
    </div>

    <!-- Loading skeleton -->
    <div v-else-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-md p-6 animate-pulse h-44" />
    </div>

    <!-- Empty -->
    <div v-else-if="contacts && contacts.length === 0" class="bg-white rounded-xl shadow-md p-16 text-center">
      <div class="text-6xl mb-4">📭</div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">No contacts yet</h3>
      <p class="text-gray-500 mb-6">Start by adding your first contact.</p>
      <NuxtLink
        to="/contacts/create"
        class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Add First Contact
      </NuxtLink>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ContactCard v-for="c in contacts" :key="c.id" :contact="c" />
    </div>

  </div>
</template>

<script setup lang="ts">
const { getAllContacts } = useApi()
const { data: contacts, pending, error } = await useAsyncData('contacts', () => getAllContacts())
</script>
