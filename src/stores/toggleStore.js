import { defineStore } from 'pinia'
import { ref } from 'vue'

export const toggleStore = defineStore('toggle', () => {
  const toggle = ref(true)
  const isDark = ref(document.documentElement.classList.contains('dark'))

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  return {
    toggle,
    isDark,
    toggleTheme,
  }
})
