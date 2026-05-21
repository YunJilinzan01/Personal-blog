<script setup>
import PostItem from '@/components/main/PostItem.vue'
import Pagination from '@/components/main/Pagination.vue'
import { useBlogStore } from '@/stores/blogStore'
import { storeToRefs } from 'pinia'
import { useHomePagination } from '@/composables/home/useHomePagination'

const blogStore = useBlogStore()
const { filteredPosts, searchQuery } = storeToRefs(blogStore)
const { currentPage, totalPages, paginatedPosts, isSearchActive } = useHomePagination(filteredPosts, searchQuery)
</script>

<template>
  <div class="space-y-6 animate-fade-in-up">
    <template v-if="filteredPosts.length > 0">
      <PostItem v-for="post in paginatedPosts" :key="post.id" :post="post" />

      <!-- 分页组件 -->
      <Pagination v-if="totalPages > 1" v-model:currentPage="currentPage" :totalPages="totalPages" />
    </template>

    <!-- 无匹配结果或空状态 -->
    <div v-else
      class="space-y-6 animate-fade-in-u flex flex-col items-center justify-center py-20 px-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 shadow-lg text-center animate-fade-in-up">
      <div
        class="w-20 h-20 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-2">{{ isSearchActive ? '未找到匹配的文章' : '暂无文章' }}
      </h3>
      <p class="text-gray-500 dark:text-zinc-400 max-w-xs">
        {{ isSearchActive ? '请尝试其他关键词，或清空搜索以查看所有文章。' : '博主正在努力创作中，请稍后再来逛逛吧~' }}
      </p>
    </div>
  </div>
</template>
