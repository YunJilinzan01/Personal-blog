<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommentSection from '@/components/main/CommentSection.vue'
import { useBlogStore } from '@/stores/blogStore'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const post = ref(null)

onMounted(() => {
  const id = route.params.id
  post.value = blogStore.posts.find((p) => p.id === parseInt(id))
  if (!post.value) {
    // 如果找不到文章，可以跳转回首页或者显示 404
    console.error('Post not found')
  }
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="post" class="space-y-6 animate-fade-in-up">
    <!-- 文章内容卡片 -->
    <article
      class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 dark:border-zinc-800/50 transition-all duration-300"
    >
      <!-- 返回按钮 -->
      <button
        @click="goBack"
        class="mb-6 flex items-center gap-2 text-gray-500 hover:text-[#37a8ec] transition-colors cursor-pointer group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>返回列表</span>
      </button>

      <!-- 文章头部信息 -->
      <header class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="w-1.5 h-8 bg-blue-500 rounded-full shrink-0"></span>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-zinc-100">
            {{ post.title }}
          </h1>
        </div>

        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-zinc-400">
          <div class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{{ post.date }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>{{ post.category }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ post.readingTime }}</span>
          </div>
        </div>
      </header>

      <!-- 文章封面图 -->
      <div v-if="post.cover" class="mb-8 rounded-2xl overflow-hidden shadow-lg">
        <img :src="post.cover" :alt="post.title" class="w-full h-auto object-cover max-h-[400px]" />
      </div>

      <!-- 文章正文 -->
      <div
        class="prose dark:prose-invert max-w-none text-gray-700 dark:text-zinc-300 leading-relaxed"
        v-html="post.content"
      ></div>

      <!-- 标签 -->
      <div class="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-sm px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors cursor-pointer"
        >
          # {{ tag }}
        </span>
      </div>
    </article>

    <!-- 评论区 -->
    <CommentSection :postId="post.id" />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

:deep(h2) {
  @apply text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-zinc-100;
}
:deep(p) {
  @apply mb-4;
}
:deep(ul) {
  @apply list-disc list-inside space-y-2 mb-4;
}
:deep(blockquote) {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-zinc-400 my-6;
}
</style>
