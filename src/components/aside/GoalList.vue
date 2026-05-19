<script setup>
import { ref, onMounted, watch } from 'vue'

const goals = ref([
  { id: 1, title: '完成博客基础功能开发', status: 'completed', time: '09:00' },
  { id: 2, title: '适配全站深色模式交互', status: 'completed', time: '10:30' },
  { id: 3, title: '集成 Vue Router 路由系统', status: 'in_progress', time: '14:00' },
])

const newGoalTitle = ref('')

// 从本地存储加载数据
onMounted(() => {
  const savedGoals = localStorage.getItem('blog-goals')
  if (savedGoals) {
    goals.value = JSON.parse(savedGoals)
  }
})

// 监听数据变化并持久化
watch(
  goals,
  (newVal) => {
    localStorage.setItem('blog-goals', JSON.stringify(newVal))
  },
  { deep: true },
)

// 添加任务
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

// 切换任务状态
const toggleGoal = (id) => {
  const goal = goals.value.find((g) => g.id === id)
  if (goal) {
    if (goal.status === 'completed') {
      goal.status = 'pending'
    } else {
      goal.status = 'completed'
    }
  }
}

// 删除任务
const removeGoal = (id) => {
  goals.value = goals.value.filter((g) => g.id !== id)
}

// 重置任务
const resetGoals = () => {
  goals.value = []
  localStorage.removeItem('blog-goals')
}
</script>

<template>
  <div class="transition-colors duration-300">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div
          class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-zinc-100">今日目标</h3>
      </div>

      <button
        @click="resetGoals"
        class="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        title="重置所有目标"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>

    <!-- 输入区域 -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="newGoalTitle"
        @keyup.enter="addGoal"
        type="text"
        placeholder="添加新目标..."
        class="flex-1 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all text-gray-700 dark:text-zinc-200"
      />
      <button
        @click="addGoal"
        class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-all active:scale-95 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>

    <!-- 列表区域 -->
    <div class="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
      <TransitionGroup name="list">
        <div
          v-for="goal in goals"
          :key="goal.id"
          class="flex items-start gap-3 group cursor-pointer"
          @click="toggleGoal(goal.id)"
        >
          <!-- 状态图标 -->
          <div class="mt-1 shrink-0">
            <div v-if="goal.status === 'completed'" class="text-green-500 dark:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div
              v-else
              class="text-gray-300 dark:text-zinc-600 group-hover:text-blue-400 transition-colors"
            >
              <div class="size-2.5 rounded-full border-2 border-current"></div>
            </div>
          </div>

          <!-- 内容和时间 -->
          <div class="flex-1 min-w-0">
            <div
              :class="[
                'text-sm leading-tight transition-all duration-300 truncate',
                goal.status === 'completed'
                  ? 'text-gray-400 dark:text-zinc-500 line-through'
                  : 'text-gray-600 dark:text-zinc-300 group-hover:text-[#37a8ec]',
              ]"
            >
              {{ goal.title }}
            </div>
            <div class="text-[10px] text-gray-400 dark:text-zinc-500 mt-0.5">
              {{ goal.time }}
            </div>
          </div>

          <!-- 删除按钮 -->
          <button
            @click.stop="removeGoal(goal.id)"
            class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </TransitionGroup>

      <div v-if="goals.length === 0" class="text-center py-4">
        <p class="text-sm text-gray-400 dark:text-zinc-500">暂无目标，开启新的一天吧！</p>
      </div>
    </div>

    <!-- 激励语 -->
    <div
      class="mt-6 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/20"
    >
      <p class="text-xs text-blue-600/80 dark:text-blue-400/80 italic text-center leading-relaxed">
        "与其向往，不如出发。"
      </p>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.2);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
</style>
