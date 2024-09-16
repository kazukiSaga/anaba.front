<template>
  <v-pagination
    v-model="pagination.current"
    :length="pagination.pages"
    :total-visible="10"
    density="comfortable"
    @update:modelValue="emit('get-page', pagination.current)"
  />
</template>

<script setup>
import { defineEmits } from 'vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
    default: {}
  }
})

const emit = defineEmits(['get-page'])
</script>

<style lang="scss" scoped></style>
