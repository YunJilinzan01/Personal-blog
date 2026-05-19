<script setup>
const goals = [
  { id: 1, title: '完成博客基础功能开发', status: 'completed' },
  { id: 2, title: '适配全站深色模式交互', status: 'completed' },
  { id: 3, title: '集成 Vue Router 路由系统', status: 'in_progress' },
  { id: 4, title: '优化文章列表加载性能', status: 'pending' },
  { id: 5, title: '添加 Markdown 渲染支持', status: 'pending' },
]
</script>

<template>
  <div class="transition-colors duration-300">
    <div class="flex items-center gap-2 mb-4">
      <div class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-800 dark:text-zinc-100">今日目标 / 计划</h3>
    </div>

    <div class="space-y-3">
      <div 
        v-for="goal in goals" 
        :key="goal.id"
        class="flex items-start gap-3 group cursor-default"
      >
        <div class="mt-1 shrink-0">
          <div v-if="goal.status === 'completed'" class="text-green-500 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div v-else-if="goal.status === 'in_progress'" class="text-blue-500 dark:text-blue-400 animate-pulse">
            <div class="size-2.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
          </div>
          <div v-else class="text-gray-300 dark:text-zinc-600">
            <div class="size-2.5 rounded-full border-2 border-current"></div>
          </div>
        </div>
        
        <span 
          :class="[
            'text-sm leading-tight transition-colors duration-300',
            goal.status === 'completed' 
              ? 'text-gray-400 dark:text-zinc-500 line-through' 
              : 'text-gray-600 dark:text-zinc-300 group-hover:text-[#37a8ec]'
          ]"
        >
          {{ goal.title }}
        </span>
      </div>
    </div>

    <!-- 激励语 -->
    <div class="mt-6 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/20">
      <p class="text-xs text-blue-600/80 dark:text-blue-400/80 italic text-center">
        "与其向往，不如出发。"
      </p>
    </div>
  </div>
</template>
