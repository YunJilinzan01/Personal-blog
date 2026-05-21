import { ref, onMounted, watch } from 'vue'

export function useGoalList() {
  const goals = ref([
    { id: 1, title: '完成博客基础功能开发', status: 'completed', time: '09:00' },
    { id: 2, title: '适配全站深色模式交互', status: 'completed', time: '10:30' },
    { id: 3, title: '集成 Vue Router 路由系统', status: 'in_progress', time: '14:00' },
  ])
  const newGoalTitle = ref('')

  onMounted(() => {
    try {
      const savedGoals = localStorage.getItem('blog-goals')
      if (savedGoals) {
        goals.value = JSON.parse(savedGoals)
      }
    } catch (e) {
      console.error('解析本地目标数据失败，已重置:', e)
      localStorage.removeItem('blog-goals')
    }
  })

  watch(
    goals,
    (newVal) => {
      localStorage.setItem('blog-goals', JSON.stringify(newVal))
    },
    { deep: true },
  )

  const addGoal = () => {
    if (!newGoalTitle.value.trim()) return

    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    goals.value.push({
      id: Date.now(),
      title: newGoalTitle.value.trim(),
      status: 'pending',
      time: timeStr,
    })

    newGoalTitle.value = ''
  }

  const toggleGoal = (id) => {
    const goal = goals.value.find((g) => g.id === id)
    if (goal) {
      goal.status = goal.status === 'completed' ? 'pending' : 'completed'
    }
  }

  const removeGoal = (id) => {
    goals.value = goals.value.filter((g) => g.id !== id)
  }

  const resetGoals = () => {
    goals.value = []
    localStorage.removeItem('blog-goals')
  }

  return {
    goals,
    newGoalTitle,
    addGoal,
    toggleGoal,
    removeGoal,
    resetGoals,
  }
}
