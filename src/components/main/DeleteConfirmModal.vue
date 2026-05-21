<script setup>
import { AlertTriangle, X } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  title: String
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
        >
          <div class="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800/50 p-8 text-center overflow-hidden">
            <!-- 警告图标 -->
            <div class="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle class="w-8 h-8" />
            </div>

            <h4 class="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-2">确认删除？</h4>
            <p class="text-gray-500 dark:text-zinc-400 mb-8 leading-relaxed">
              确定要删除文章 <span class="text-rose-500 font-medium">《{{ title }}》</span> 吗？此操作不可撤销。
            </p>

            <div class="flex gap-3">
              <button
                @click="emit('close')"
                class="flex-1 py-3 text-sm font-medium text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl transition-all"
              >
                取消
              </button>
              <button
                @click="emit('confirm')"
                class="flex-1 py-3 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-95"
              >
                确定删除
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "../../assets/main.css";
</style>
