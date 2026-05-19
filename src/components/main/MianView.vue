<script setup>
import PostList from './PostList.vue'
import AuthorProfile from '../aside/AuthorProfile.vue'
import TagCloud from '../aside/TagCloud.vue'
import TechOrbit from '../aside/TechOrbit.vue'
import Directory from '../aside/Directory.vue'
import Calendar from '../aside/Calendar.vue'
import { toggleStore } from '@/stores/toggleStore'
import { storeToRefs } from 'pinia'

const store = toggleStore()
const { toggle } = storeToRefs(store)
</script>
<template>
  <div class="flex flex-1 justify-center gap-5">
    <aside class="animate-fade-in-left">
      <AuthorProfile />
      <TagCloud />
      <TechOrbit />
      <Directory />
    </aside>
    <main class="flex-1 animate-fade-in-up">
      <PostList />
    </main>
    <Transition name="slide">
      <section
        v-if="toggle"
        class="w-80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 h-fit sticky top-24 transition-colors duration-300"
      >
        <Calendar />
      </section>
    </Transition>
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
