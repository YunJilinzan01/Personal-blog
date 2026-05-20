<script setup>
import { ref, onMounted } from 'vue'
import { ChevronUp } from 'lucide-vue-next'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const showButton = ref(false)

// 当滚动超过 300px 时显示按钮
onMounted(() => {
  const checkScroll = () => {
    showButton.value = y.value > 300
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-10 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-10 opacity-0"
  >
    <button
      v-show="y > 300"
      @click="scrollToTop"
      class="cursor-pointer fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/80 text-zinc-600 shadow-sm backdrop-blur-md transition-all hover:scale-110 hover:text-[#37a8ec] active:scale-95 dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:text-[#37a8ec]"
      aria-label="Back to top"
    >
      <ChevronUp class="h-6 w-6 transition-colors" />
    </button>
  </Transition>
</template>
