<template>
  <nav class="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold hover:text-indigo-200 transition">
        📇 Contact Manager
      </NuxtLink>
      <div class="flex gap-6">
        <NuxtLink to="/" class="hover:text-indigo-200 transition font-medium">Home</NuxtLink>
        <NuxtLink to="/contacts" class="hover:text-indigo-200 transition font-medium">Contacts</NuxtLink>
        <NuxtLink to="/contacts/create" class="hover:text-indigo-200 transition font-medium">Add Contact</NuxtLink>
      </div>
    </div>
  </nav>
</template>
