<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article
    :class="[
      'relative p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/8 dark:border-zinc-800/50 shadow-lg transition-all duration-300 overflow-hidden',
      post.cover ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'flex items-center justify-between',
    ]"
  >
    <!-- 左侧/主体内容区 -->
    <div
      :class="[
        post.cover ? 'md:col-span-2 flex flex-col justify-between' : 'flex-1 pr-6',
        'min-w-0',
      ]"
    >
      <div>
        <!-- 标题行 -->
        <div class="flex items-center gap-2 mb-4">
          <span class="w-1.5 h-6 bg-blue-500 rounded-full shrink-0"></span>

          <!-- 置顶图标 (仅在无封面布局显示) -->
          <svg
            v-if="post.isPinned"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-blue-400 transform rotate-45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <line x1="12" y1="17" x2="12" y2="22"></line>
            <path
              d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.12-2.65A2 2 0 0 1 16 10.11V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5.11a2 2 0 0 1-.44 1.24L5.44 14a2 2 0 0 0-.44 1.24Z"
            ></path>
          </svg>

          <h2
            class="text-2xl font-bold text-gray-800 dark:text-zinc-100 hover:text-[#37a8ec] transition-colors duration-300 cursor-pointer w-fit flex items-center gap-1.5 group/title"
          >
            {{ post.title }}

            <!-- 加密图标 -->
            <svg
              v-if="post.isEncrypted"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-400 dark:text-zinc-500 group-hover/title:text-[#37a8ec] transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>

            <!-- 悬浮箭头 -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-[#37a8ec] opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </h2>
        </div>

        <!-- 文章元信息 -->
        <div
          class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-zinc-400 mb-4"
        >
          <!-- 日期 -->
          <div
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{{ post.date }}</span>
          </div>
          <!-- 分类 -->
          <div
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
            </svg>
            <span>{{ post.category }}</span>
          </div>
          <!-- 阅读时间 -->
          <div
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="18" x2="3" y2="18"></line>
            </svg>
            <span>{{ post.readingTime }}</span>
          </div>
        </div>

        <p class="text-base text-gray-600 dark:text-zinc-400 mb-5 leading-relaxed">
          {{ post.excerpt }}
        </p>
      </div>

      <!-- 标签列表 -->
      <div class="flex flex-wrap gap-2 mt-auto">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-xs px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors cursor-pointer"
          ># {{ tag }}</span
        >
      </div>
    </div>

    <!-- 右侧显示区 -->
    <!-- 情况 A: 封面图 -->
    <div v-if="post.cover" class="md:col-span-1 w-full flex items-center">
      <div
        class="relative w-full rounded-2xl overflow-hidden pb-[56.25%] h-0 shadow-inner group cursor-pointer"
      >
        <img
          :src="post.cover"
          :alt="post.title"
          class="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div
          class="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors duration-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3.5"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- 情况 B: 侧边大箭头 (无封面时显示) -->
    <div
      v-else
      class="hidden md:flex w-14 h-40 rounded-xl bg-[#e0f1fe] dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/30 hover:bg-[#c1e3fc] dark:hover:bg-blue-800/40 items-center justify-center text-blue-600 dark:text-blue-400 transition-all duration-300 shrink-0 cursor-pointer group/arrow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transform group-hover/arrow:translate-x-0.5 transition-transform"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  </article>
</template>
