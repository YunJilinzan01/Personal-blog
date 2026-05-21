import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const tags = ref(['JavaScript', 'Vue.js', 'CSS', '前端开发', '编程'])
  const categories = ref([
    { name: '最新文章', link: '#latest-articles' },
    { name: '前端开发', link: '#web-development' },
    { name: 'Vue 技巧', link: '#vue-tips' },
    { name: 'CSS 效果', link: '#css-tricks' },
    { name: '作品展示', link: '#project-showcase' },
  ])
  const posts = ref([
    {
      id: 1,
      title: 'Markdown Tutorial',
      excerpt: 'A simple example of a Markdown blog post.',
      content: '<h2>Introduction</h2><p>Markdown is a lightweight markup language...</p>',
      date: '2025-01-20',
      category: 'Examples',
      tags: ['Markdown', 'Blogging'],
      isPinned: true,
      readingTime: '5 min',
      cover: null,
    },
    {
      id: 2,
      title: 'Vue 3 Composition API',
      excerpt: 'Learn how to use the new Composition API in Vue 3.',
      content:
        '<p>The Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options.</p>',
      date: '2025-02-15',
      category: 'Technology',
      tags: ['Vue.js', 'JavaScript'],
      readingTime: '8 min',
      cover:
        'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=60',
    },
  ])

  const searchQuery = ref('')

  const filteredPosts = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query) {
      return posts.value
    }

    return posts.value.filter((post) => {
      const title = post.title.toLowerCase()
      const excerpt = post.excerpt.toLowerCase()
      const category = (post.category || '').toLowerCase()
      const content = (post.content || '').toLowerCase()
      const tags = (post.tags || []).join(' ').toLowerCase()

      return (
        title.includes(query) ||
        excerpt.includes(query) ||
        category.includes(query) ||
        content.includes(query) ||
        tags.includes(query)
      )
    })
  })

  const isDeleteMode = ref(false)

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

  const savedPosts = localStorage.getItem('blog_posts')
  if (savedPosts) {
    try {
      posts.value = JSON.parse(savedPosts)
    } catch (e) {
      console.error('Failed to parse posts from localStorage', e)
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

  watch(
    posts,
    (newPosts) => {
      localStorage.setItem('blog_posts', JSON.stringify(newPosts))
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

  const addPost = (post) => {
    posts.value.unshift({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...post,
    })
  }

  const deletePost = (id) => {
    posts.value = posts.value.filter((p) => p.id !== id)
  }

  return {
    tags,
    categories,
    posts,
    searchQuery,
    filteredPosts,
    isDeleteMode,
    addTag,
    removeTag,
    updateTags,
    addCategory,
    removeCategory,
    updateCategories,
    addPost,
    deletePost,
  }
})
