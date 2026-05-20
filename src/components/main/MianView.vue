<script setup>
import PostList from './PostList.vue'
import AuthorProfile from '../aside/AuthorProfile.vue'
import TagCloud from '../aside/TagCloud.vue'
import TechOrbit from '../aside/TechOrbit.vue'
import Directory from '../aside/Directory.vue'
import Calendar from '../aside/Calendar.vue'
import GoalList from '../aside/GoalList.vue'
import { toggleStore } from '@/stores/toggleStore'
import { storeToRefs } from 'pinia'

const store = toggleStore()
const { toggle } = storeToRefs(store)
</script>
<template>
  <div class="flex flex-col lg:flex-row flex-1 justify-center gap-5 w-full">
    <!-- 左侧栏 - 桌面端侧边显示，移动端顶部堆叠显示 -->
    <aside class="flex flex-col gap-5 lg:block animate-fade-in-left">
      <AuthorProfile />
      <TagCloud />
      <div
        class="w-full lg:w-87.5 p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl mt-4 transition-colors duration-300 border border-white/20 dark:border-zinc-800/50 shadow-sm"
      >
        <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-zinc-100 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-[#37a8ec] rounded-full"></span>
          个人项目
        </h3>
        <div class="flex flex-col gap-4">
          <!-- 项目 1 -->
          <div class="group">
            <a
              href="https://github.com/your2317"
              target="_blank"
              class="text-lg font-medium text-gray-700 dark:text-zinc-200 group-hover:text-[#37a8ec] transition-colors duration-300 flex items-center justify-between"
            >
              个人博客系统
              <span
                class="text-xs text-zinc-400 group-hover:translate-x-1 transition-transform duration-300"
                >→</span
              >
            </a>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              基于 Vue 3 + Tailwind CSS 开发的个人极简风格博客，支持暗黑模式和玻璃拟态设计。
            </p>
            <div class="flex gap-2 mt-2">
              <span
                class="text-[10px] px-2 py-0.5 bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md transition-colors"
                >Vue 3</span
              >
              <span
                class="text-[10px] px-2 py-0.5 bg-cyan-100/50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-md transition-colors"
                >Tailwind</span
              >
            </div>
          </div>

          <!-- 分割线 -->
          <div class="h-px bg-gray-100 dark:bg-zinc-800/50 w-full"></div>

          <!-- 项目 2 -->
          <div class="group">
            <a
              href="#"
              class="text-lg font-medium text-gray-700 dark:text-zinc-200 group-hover:text-[#37a8ec] transition-colors duration-300 flex items-center justify-between"
            >
              任务管理助手
              <span
                class="text-xs text-zinc-400 group-hover:translate-x-1 transition-transform duration-300"
                >→</span
              >
            </a>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              高效的待办事项管理工具，支持本地持久化存储和多种任务视图切换。
            </p>
            <div class="flex gap-2 mt-2">
              <span
                class="text-[10px] px-2 py-0.5 bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-md transition-colors"
                >Pinia</span
              >
              <span
                class="text-[10px] px-2 py-0.5 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md transition-colors"
                >LocalStorage</span
              >
            </div>
          </div>
        </div>
      </div>
      <TechOrbit />
      <Directory />
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 w-full animate-fade-in-up">
      <PostList />
    </main>

    <!-- 右侧栏 - 桌面端根据 toggle 显示，移动端始终显示并堆叠在下方 -->
    <Transition name="slide">
      <div v-if="toggle" class="hidden lg:flex flex-col gap-5 lg:sticky lg:top-24 h-fit">
        <section
          class="w-full lg:w-80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-colors duration-300"
        >
          <Calendar />
        </section>
        <section
          class="w-full lg:w-80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-colors duration-300"
        >
          <GoalList />
        </section>
      </div>
    </Transition>

    <!-- 移动端专用的右侧功能显示（不依赖 toggle 状态） -->
    <div class="flex lg:hidden flex-col gap-5">
      <section
        class="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-colors duration-300"
      >
        <Calendar />
      </section>
      <section
        class="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-colors duration-300"
      >
        <GoalList />
      </section>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-left {
  animation: fade-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
