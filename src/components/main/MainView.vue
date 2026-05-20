<script setup>
import PostList from './PostList.vue'
import AuthorProfile from '../aside/AuthorProfile.vue'
import TagCloud from '../aside/TagCloud.vue'
import TechOrbit from '../aside/TechOrbit.vue'
import Directory from '../aside/Directory.vue'
import Calendar from '../aside/Calendar.vue'
import GoalList from '../aside/GoalList.vue'
import ProjectList from '../aside/ProjectList.vue'
import { toggleStore } from '@/stores/toggleStore'
import { storeToRefs } from 'pinia'

const store = toggleStore()
const { toggle } = storeToRefs(store)
</script>
<template>
  <div class="flex flex-col lg:flex-row flex-1 justify-center gap-5 w-full">
    <!-- 左侧栏 - 桌面端侧边显示，移动端顶部堆叠显示 -->
    <aside class="flex flex-col gap-5 lg:flex lg:flex-col lg:gap-5 animate-fade-in-left">
      <AuthorProfile />
      <TagCloud />
      <ProjectList />
      <TechOrbit />
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
        <section>
          <Directory />
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
