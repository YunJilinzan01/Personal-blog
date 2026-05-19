<script setup>
import { storeToRefs } from 'pinia'
import { toggleStore } from '@/stores/toggleStore'

const store = toggleStore()
const { isMobileMenuOpen } = storeToRefs(store)

const closeMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <Transition name="drawer">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[60] lg:hidden">
      <!-- 背景遮罩 -->
      <div
        class="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        @click="closeMenu"
      ></div>

      <!-- 抽屉内容 -->
      <div
        class="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl overflow-y-auto transition-transform duration-300 ease-out flex flex-col"
        :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="p-6 flex flex-col gap-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">功能菜单</h2>
            <button
              @click="closeMenu"
              class="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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

          <!-- 导航链接 -->
          <nav class="flex flex-col gap-2">
            <a
              href="#"
              class="px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-lg font-medium transition-colors"
              >首页</a
            >
            <a
              href="#"
              class="px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-lg font-medium transition-colors"
              >文章</a
            >
            <a
              href="#"
              class="px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-lg font-medium transition-colors"
              >关于我</a
            >
          </nav>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .absolute.right-0,
.drawer-leave-to .absolute.right-0 {
  transform: translateX(100%);
}

/* 隐藏滚动条 */
.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>
