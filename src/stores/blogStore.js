import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const tags = ref(['JavaScript', 'Vue.js', 'CSS', '前端开发', '编程'])
  const categories = ref([
    { name: '最新文章', link: '#latest-articles' },
    { name: '前端开发', link: '#web-development' },
    { name: 'Vue 技巧', link: '#vue-tips' },
    { name: 'CSS 效果', link: '#css-tricks' },
    { name: '作品展示', link: '#project-showcase' },
  ])

  // 从 localStorage 初始化
  const savedTags = localStorage.getItem('blog_tags')
  if (savedTags) {
    try {
      tags.value = JSON.parse(savedTags)
    } catch (e) {
      console.error('Failed to parse tags from localStorage', e)
    }
  }

  const savedCategories = localStorage.getItem('blog_categories')
  if (savedCategories) {
    try {
      categories.value = JSON.parse(savedCategories)
    } catch (e) {
      console.error('Failed to parse categories from localStorage', e)
    }
  }

  // 监听变化并保存
  watch(
    tags,
    (newTags) => {
      localStorage.setItem('blog_tags', JSON.stringify(newTags))
    },
    { deep: true },
  )

  watch(
    categories,
    (newCats) => {
      localStorage.setItem('blog_categories', JSON.stringify(newCats))
    },
    { deep: true },
  )

  const addTag = (tag) => {
    if (tag && !tags.value.includes(tag)) {
      tags.value.push(tag)
    }
  }

  const removeTag = (index) => {
    tags.value.splice(index, 1)
  }

  const updateTags = (newTags) => {
    tags.value = [...newTags]
  }

  const addCategory = (name, link = '#') => {
    if (name && !categories.value.find((c) => c.name === name)) {
      categories.value.push({ name, link })
    }
  }

  const removeCategory = (index) => {
    categories.value.splice(index, 1)
  }

  const updateCategories = (newCats) => {
    categories.value = [...newCats]
  }

  return {
    tags,
    categories,
    addTag,
    removeTag,
    updateTags,
    addCategory,
    removeCategory,
    updateCategories,
  }
})
