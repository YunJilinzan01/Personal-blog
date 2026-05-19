import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const toggleStore = defineStore('toggle', () => {
  // 从 localStorage 初始化状态
  const savedLayout = localStorage.getItem('blog-layout-toggle')
  const savedTheme = localStorage.getItem('blog-theme-dark')

  // 布局状态 (true 为展开/默认，false 为收起)
  const toggle = ref(savedLayout !== null ? JSON.parse(savedLayout) : true)
  
  // 主题状态
  const isDark = ref(savedTheme !== null ? JSON.parse(savedTheme) : false)

  // 初始化应用主题类
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  // 执行初始主题应用
  applyTheme(isDark.value)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  // 监听并持久化布局状态
  watch(toggle, (newVal) => {
    localStorage.setItem('blog-layout-toggle', JSON.stringify(newVal))
  })

  // 监听并持久化主题状态
  watch(isDark, (newVal) => {
    localStorage.setItem('blog-theme-dark', JSON.stringify(newVal))
  })

  return {
    toggle,
    isDark,
    toggleTheme,
  }
})
