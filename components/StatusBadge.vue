<template>
  <span
    :class="[
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold',
      connected
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-600',
    ]"
  >
    <span
      :class="['w-2 h-2 rounded-full', connected ? 'bg-green-500' : 'bg-red-500']"
    />
    {{ connected ? 'Connected' : 'Disconnected' }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ connected: boolean }>()
</script>
