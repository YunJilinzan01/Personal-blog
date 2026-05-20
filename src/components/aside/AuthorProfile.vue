<script setup>
import VueIcon from '@/components/icons/VueIcon.vue'
import ViteIcon from '@/components/icons/ViteIcon.vue'
import JSIcon from '@/components/icons/JSIcon.vue'
import TWCIcon from '@/components/icons/TWCIcon.vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
</script>

<template>
  <div
    class="w-full lg:w-87.5 p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl py-4 transition-colors duration-300 border border-white/20 dark:border-zinc-800/50 shadow-sm"
  >
    <div class="w-full h-75 bg-blue-400 rounded-xl overflow-hidden">
      <img src="../../assets/images/author.jpg" alt="Author" class="w-full h-full object-cover" />
    </div>
    <h4 class="text-2xl font-bold my-4 text-center text-gray-800 dark:text-zinc-100">
      YunJilinzan
    </h4>
    <span class="block text-gray-600 dark:text-zinc-400 text-center py-1.5"
      >Email: 3231789754@qq.com
    </span>
    <p class="text-gray-600 dark:text-zinc-400 text-center">
      你好！我是一个热爱编程的开发者，喜欢分享我的技术经验和生活点滴。
    </p>
    <div class="mt-4 flex justify-center gap-2 text-gray-600 dark:text-zinc-400">
      <div
        class="size-10 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center transition-colors"
      >
        <GitHubIcon href="https://github.com/YunJiLinZan01"></GitHubIcon>
      </div>
      <div
        class="size-10 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center transition-colors"
      >
        <VueIcon href="https://cn.vuejs.org/"></VueIcon>
      </div>
      <div
        class="size-10 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center transition-colors"
      >
        <ViteIcon href="https://vitejs.dev/"></ViteIcon>
      </div>
      <div
        class="size-10 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center transition-colors"
      >
        <JSIcon href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"></JSIcon>
      </div>
      <div
        class="size-10 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center transition-colors"
      >
        <TWCIcon href="https://tailwindcss.com/"></TWCIcon>
      </div>
    </div>
  </div>
</template>
