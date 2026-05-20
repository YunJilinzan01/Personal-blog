<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: '个人博客系统',
    description: '基于 Vue 3 + Tailwind CSS 开发的个人极简风格博客，支持暗黑模式和玻璃拟态设计。',
    link: 'https://github.com/your2317',
    tags: ['Vue 3', 'Tailwind'],
    tagColors: 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    title: '任务管理助手',
    description: '高效的待办事项管理工具，支持本地持久化存储和多种任务视图切换。',
    link: '#',
    tags: ['Pinia', 'LocalStorage'],
    tagColors: 'bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
  }
])
</script>

<template>
  <div class="w-full lg:w-87.5 p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl mt-4 transition-colors duration-300 border border-white/20 dark:border-zinc-800/50 shadow-sm">
    <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-zinc-100 flex items-center gap-2">
      <span class="w-1.5 h-6 bg-[#37a8ec] rounded-full"></span>
      个人项目
    </h3>
    <div class="flex flex-col gap-4">
      <div v-for="(project, index) in projects" :key="project.id">
        <!-- 项目内容 -->
        <div class="group">
          <a
            :href="project.link"
            target="_blank"
            class="text-lg font-medium text-gray-700 dark:text-zinc-200 group-hover:text-[#37a8ec] transition-colors duration-300 flex items-center justify-between"
          >
            {{ project.title }}
            <span class="text-xs text-zinc-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {{ project.description }}
          </p>
          <div class="flex gap-2 mt-2">
            <span 
              v-for="tag in project.tags" 
              :key="tag"
              class="text-[10px] px-2 py-0.5 rounded-md transition-colors"
              :class="project.tagColors"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- 分割线 (最后一个项目后不显示) -->
        <div v-if="index !== projects.length - 1" class="h-px bg-gray-100 dark:bg-zinc-800/50 w-full mt-4"></div>
      </div>
    </div>
  </div>
</template>
