<script setup>
import { Heart } from 'lucide-vue-next'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import VueIcon from '@/components/icons/VueIcon.vue'
import ViteIcon from '@/components/icons/ViteIcon.vue'
import TWCIcon from '@/components/icons/TWCIcon.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="w-full mt-12 mb-8">
    <div
      class="p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-zinc-800 transition-colors duration-300"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Site Info -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-gray-800 dark:text-zinc-100">个人博客</h3>
          <p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
            记录生活、分享技术、共同成长。这是一个基于 Vue 3 和 Tailwind CSS 构建的个人博客空间。
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-zinc-100">快速链接</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="/"
                class="text-sm text-gray-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >首页</a
              >
            </li>
            <li>
              <a
                href="/articles"
                class="text-sm text-gray-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >文章归档</a
              >
            </li>
            <li>
              <a
                href="/about"
                class="text-sm text-gray-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >关于我</a
              >
            </li>
            <li>
              <a
                href="/friends"
                class="text-sm text-gray-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >友情链接</a
              >
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-zinc-100">技术支持</h4>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2 group">
              <VueIcon class="size-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span class="text-sm text-gray-600 dark:text-zinc-400">Vue 3</span>
            </div>
            <div class="flex items-center gap-2 group">
              <ViteIcon class="size-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span class="text-sm text-gray-600 dark:text-zinc-400">Vite</span>
            </div>
            <div class="flex items-center gap-2 group">
              <TWCIcon class="size-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span class="text-sm text-gray-600 dark:text-zinc-400">Tailwind</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 dark:text-zinc-500 pt-2">
            Hosted on GitHub Pages / Vercel
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div
          class="text-sm text-gray-600 dark:text-zinc-400 flex flex-col md:flex-row items-center gap-1 md:gap-4"
        >
          <div class="flex items-center gap-1">
            <span>&copy; {{ currentYear }} YunJilinzan. Built with</span>
            <Heart class="size-4 text-red-500 fill-red-500 animate-pulse" />
            <span>in China.</span>
          </div>
          <span class="hidden md:inline text-gray-300 dark:text-zinc-700">|</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            浙ICP备XXXXXXXX号-1
          </a>
        </div>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-gray-500 dark:text-zinc-500 hover:underline">隐私政策</a>
          <a href="#" class="text-xs text-gray-500 dark:text-zinc-500 hover:underline">服务条款</a>
          <a href="#" class="text-xs text-gray-500 dark:text-zinc-500 hover:underline">站点地图</a>
        </div>
      </div>
    </div>
  </footer>
</template>
