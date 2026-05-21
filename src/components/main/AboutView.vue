<script setup>
// About Me page
</script>

<template>
  <div class="space-y-6">
    <section
      class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-all duration-300"
    >
      <div class="flex items-center gap-3 mb-6">
        <span class="w-1.5 h-6 bg-blue-500 rounded-full shrink-0"></span>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-zinc-100">关于我</h2>
      </div>

      <div
        class="prose dark:prose-invert max-w-none text-gray-600 dark:text-zinc-400 leading-relaxed"
      >
        <p class="mb-4">
          你好！我是
          <span class="text-[#37a8ec] font-semibold">Mizuki</span>，一名充满热情的全栈开发工程师。
          我喜欢构建精美且功能强大的 Web 应用程序，对前端交互和后端架构都有着浓厚的兴趣。
        </p>
        <p class="mb-4">本博客是我在技术探索道路上的见证，我会在这里分享：</p>
        <ul class="list-disc list-inside space-y-2 ml-4 mb-6">
          <li>前端技术深度剖析 (Vue, React, TypeScript)</li>
          <li>后端开发实践与架构思考</li>
          <li>学习心得与技术笔记</li>
          <li>生活中的点滴思考与随笔</li>
        </ul>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50"
      >
        <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-zinc-100 flex items-center gap-2">
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
            class="text-blue-500"
          >
            <path d="m18 16 4-4-4-4"></path>
            <path d="m6 8-4 4 4 4"></path>
            <path d="m14.5 4-5 16"></path>
          </svg>
          技术栈
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in [
              'Vue 3',
              'React',
              'Node.js',
              'TypeScript',
              'Tailwind CSS',
              'PostgreSQL',
              'Docker',
            ]"
            :key="skill"
            class="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm border border-blue-100 dark:border-blue-800/30"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div
        class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50"
      >
        <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-zinc-100 flex items-center gap-2">
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
            class="text-green-500"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          联系方式
        </h3>
        <ul class="space-y-3 text-gray-600 dark:text-zinc-400">
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span>mizuki@example.com</span>
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              ></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>github.com/mizuki</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
