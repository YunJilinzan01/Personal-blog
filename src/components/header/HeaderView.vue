<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import InteractiveHoverButton from '../UI/InteractiveHoverButton/InteractiveHoverButton.vue'
import MobileDrawer from './MobileDrawer.vue'
import { toggleStore } from '@/stores/toggleStore'
import { storeToRefs } from 'pinia'

const store = toggleStore()
const { toggle, isDark, isMobileMenuOpen } = storeToRefs(store)
const { toggleTheme: storeToggleTheme, toggleMobileMenu } = store

const searchQuery = ref('')
const isSearchHover = ref(false)
const isHeaderTop = ref(true)
const isDesktop = ref(window.innerWidth >= 1024)

const headerStyle = ref({
  top: '0px',
  backgroundColor: 'rgba(255,255,255,0)',
  boxShadow: 'none',
})

const hideNav = computed(() => isSearchHover.value || searchQuery.value.trim().length > 0)
const isExpanded = computed(() => isSearchHover.value || searchQuery.value.trim().length > 0)

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024
}

const handleScroll = () => {
  const scrollY = window.scrollY
  isHeaderTop.value = scrollY < 34

  const alpha = Math.min((scrollY / 100) * 0.7, 0.8)
  const isDarkVal = document.documentElement.classList.contains('dark')
  const baseColor = isDarkVal ? '24, 24, 27' : '255, 255, 255' // zinc-900 vs white

  headerStyle.value = {
    top: scrollY > 420 ? '-100px' : '0px',
    backgroundColor: `rgba(${baseColor}, ${alpha})`,
    boxShadow:
      scrollY === 0
        ? 'none'
        : isDarkVal
          ? '0 24px 80px rgba(0, 0, 0, 0.4)'
          : '0 24px 80px rgba(15, 23, 42, 0.05)',
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})

const toggleTheme = () => {
  storeToggleTheme()
  handleScroll() // Update header style immediately
}
</script>

<template>
  <header
    v-bind="$attrs"
    :class="[
      'fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out',
      'w-[calc(100%-2rem)] max-w-342 h-17 mt-2.5 px-4 rounded-2xl flex justify-between items-center',
      'backdrop-blur-md animate-fade-in-down',
      isHeaderTop ? 'text-white' : 'text-gray-800 dark:text-white shadow-xl',
    ]"
    :style="headerStyle"
  >
    <div class="shrink-0">
      <h1 class="text-lg md:text-xl font-bold cursor-pointer whitespace-nowrap">个人博客</h1>
    </div>

    <div
      class="flex-1 transition-all duration-500 ease-in-out hidden lg:block"
      :class="[
        hideNav
          ? 'opacity-0 invisible pointer-events-none translate-y-2'
          : 'opacity-100 visible translate-y-0',
      ]"
    >
      <nav>
        <ul class="flex gap-2 justify-center items-center">
          <li>
            <router-link to="/">
              <InteractiveHoverButton text="首页" class="px-4 py-2" />
            </router-link>
          </li>
          <li>
            <router-link to="/archives">
              <InteractiveHoverButton text="归档" class="px-4 py-2" />
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <InteractiveHoverButton text="关于我" class="px-4 py-2" />
            </router-link>
          </li>
          <li>
            <router-link to="/profile">
              <InteractiveHoverButton text="个人信息" class="px-4 py-2" />
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex items-center gap-2 md:gap-3">
      <!-- 搜索栏 -->
      <div
        class="flex items-center cursor-pointer bg-black/5 dark:bg-white/10 rounded-xl px-3 py-1.5 transition-all duration-500 ease-in-out"
        :class="[isExpanded ? 'w-40 sm:w-64' : 'w-10']"
        @mouseenter="isSearchHover = true"
        @mouseleave="isSearchHover = false"
      >
        <div class="shrink-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-current"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          v-model="searchQuery"
          class="bg-transparent text-sm outline-none transition-all duration-500 ease-in-out placeholder:text-gray-400"
          :class="[isExpanded ? 'w-full ml-2 md:ml-3 opacity-100' : 'w-0 opacity-0']"
        />
      </div>

      <div class="flex items-center gap-1 md:gap-3 text-current">
        <!-- 侧边栏切换按钮 - 仅桌面端 -->
        <button
          v-if="isDesktop"
          class="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer"
          @click="toggle = !toggle"
        >
          <transition name="scale" mode="out-in">
            <svg
              v-if="!toggle"
              :key="'menu'"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>

            <svg
              v-else
              :key="'grid'"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </transition>
        </button>

        <!-- 移动端菜单按钮 -->
        <button
          class="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer"
          @click="toggleMobileMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>

        <button
          @click="toggleTheme"
          class="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer"
        >
          <transition name="scale" mode="out-in">
            <svg
              v-if="isDark"
              :key="'moon'"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>

            <svg
              v-else
              :key="'sun'"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </transition>
        </button>
      </div>
    </div>
  </header>

  <MobileDrawer />
</template>

<style scoped>
.animate-fade-in-down {
  animation: fade-in-down 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
}
</style>
