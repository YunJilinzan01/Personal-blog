<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blogStore'

const router = useRouter()
const blogStore = useBlogStore()

const archives = computed(() => {
  const groups = {}
  blogStore.posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!groups[year]) {
      groups[year] = []
    }
    // 归档列表显示的日期格式为 MM-DD
    const dateObj = new Date(post.date)
    const displayDate = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
    groups[year].push({ ...post, displayDate })
  })

  return Object.keys(groups)
    .sort((a, b) => b - a)
    .map((year) => ({
      year,
      posts: groups[year].sort((a, b) => new Date(b.date) - new Date(a.date)),
    }))
})

const goToDetail = (id) => {
  router.push({ name: 'post-detail', params: { id } })
}
</script>

<template>
  <div class="space-y-8">
    <section
      class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-all duration-300"
    >
      <div class="flex items-center gap-3 mb-8">
        <span class="w-1.5 h-6 bg-blue-500 rounded-full shrink-0"></span>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-zinc-100">文章归档</h2>
      </div>

      <div class="relative ml-4 border-l-2 border-gray-100 dark:border-zinc-800 pl-8 space-y-12">
        <div v-for="group in archives" :key="group.year" class="relative">
          <!-- 年份标记 -->
          <div
            class="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 bg-white dark:bg-zinc-900 border-2 border-blue-500 rounded-full z-10"
          >
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          </div>

          <h3
            class="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6 flex items-baseline gap-2"
          >
            {{ group.year }}
            <span class="text-sm font-normal text-gray-400 dark:text-zinc-500"
              >({{ group.posts.length }} 篇文章)</span
            >
          </h3>

          <div class="space-y-6">
            <div
              v-for="post in group.posts"
              :key="post.id"
              @click="goToDetail(post.id)"
              class="group cursor-pointer"
            >
              <div
                class="flex items-center gap-4 text-gray-600 dark:text-zinc-400 group-hover:text-[#37a8ec] transition-colors duration-300"
              >
                <span class="text-sm font-medium tabular-nums w-12">{{ post.displayDate }}</span>
                <h4 class="text-lg font-medium">{{ post.title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 可以在这里添加一些动画效果 */
</style>
