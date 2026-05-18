import { defineStore } from 'pinia'
import { ref } from 'vue'

export const toggleStore = defineStore('toggle', () => {
  const toggle = ref(true)
  return {
    toggle,
  }
})
