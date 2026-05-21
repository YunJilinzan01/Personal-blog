import { ref, onMounted, watch } from 'vue'

export function useProjectList() {
  const projects = ref([])

  const colorPool = [
    'bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    'bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    'bg-amber-100/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    'bg-cyan-100/50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
    'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
  ]

  const isAdding = ref(false)
  const newProject = ref({
    title: '',
    link: '',
    description: '',
    tags: '',
  })

  const getRandomColor = () => colorPool[Math.floor(Math.random() * colorPool.length)]

  onMounted(() => {
    try {
      const savedProjects = localStorage.getItem('blog-projects')
      if (savedProjects) {
        projects.value = JSON.parse(savedProjects)
      }
    } catch (e) {
      console.error('解析本地项目数据失败，已重置:', e)
      localStorage.removeItem('blog-projects')
    }
  })

  watch(
    projects,
    (newVal) => {
      localStorage.setItem('blog-projects', JSON.stringify(newVal))
    },
    { deep: true },
  )

  const addProject = () => {
    if (!newProject.value.title || !newProject.value.link) return

    const tagList = newProject.value.tags
      ? newProject.value.tags
          .split(/[,，]/)
          .map((t) => t.trim())
          .filter((t) => t)
      : ['新项目']

    projects.value.push({
      id: Date.now(),
      title: newProject.value.title,
      description: newProject.value.description || '暂无描述',
      link: newProject.value.link,
      tags: tagList,
      tagColors: getRandomColor(),
    })

    newProject.value = { title: '', link: '', description: '', tags: '' }
    isAdding.value = false
  }

  const removeProject = (id) => {
    projects.value = projects.value.filter((p) => p.id !== id)
  }

  return {
    projects,
    isAdding,
    newProject,
    addProject,
    removeProject,
  }
}
