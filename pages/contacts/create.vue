<template>
  <div class="max-w-lg mx-auto">

    <div class="mb-6">
      <NuxtLink to="/contacts" class="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Contacts
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-800 mt-3">Add New Contact</h1>
    </div>

    <div class="bg-white rounded-2xl shadow-md p-8">

      <!-- Success -->
      <div v-if="success" class="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 flex items-start gap-3">
        <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="font-semibold text-green-700">Contact created!</p>
          <p class="text-sm text-green-600 mt-0.5">
            <NuxtLink :to="`/contacts/${createdId}`" class="underline">View contact</NuxtLink>
            or
            <button class="underline" @click="resetForm">add another</button>
          </p>
        </div>
      </div>

      <!-- Error -->
      <div v-if="submitError" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-600">
        {{ submitError }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Sayan Mondal"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="e.g. sayan@example.com"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="e.g. 9876543210"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {{ loading ? 'Creating…' : 'Create Contact' }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { createContact } = useApi()
const router = useRouter()

const form = reactive({ name: '', email: '', phone: '' })
const loading = ref(false)
const success = ref(false)
const submitError = ref('')
const createdId = ref<number | null>(null)

async function handleSubmit() {
  loading.value = true
  submitError.value = ''
  success.value = false

  try {
    const payload: { name: string; email: string; phone?: string } = {
      name: form.name,
      email: form.email,
    }
    if (form.phone.trim()) payload.phone = form.phone.trim()

    const created = await createContact(payload)
    createdId.value = created.id
    success.value = true
    form.name = ''
    form.email = ''
    form.phone = ''
  } catch (err: unknown) {
    submitError.value =
      err instanceof Error ? err.message : 'Failed to create contact. Please try again.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  success.value = false
  createdId.value = null
  submitError.value = ''
}
</script>
