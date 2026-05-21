<script setup>
import { useCommentSection } from '@/composables/main/useCommentSection'

const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
})

const { comments, newComment, handleSubmit, deleteComment } = useCommentSection(props)
</script>

<template>
  <section
    class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 dark:border-zinc-800/50 transition-all duration-300">
    <div class="flex items-center gap-3 mb-8">
      <span class="w-1.5 h-6 bg-blue-500 rounded-full shrink-0"></span>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-zinc-100">评论区</h2>
      <span class="text-sm text-gray-500 dark:text-zinc-400">({{ comments.length }})</span>
    </div>

    <!-- 发表评论表单 -->
    <form @submit.prevent="handleSubmit" class="mb-10 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="newComment.author" type="text" placeholder="昵称" required
          class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all" />
      </div>
      <textarea v-model="newComment.content" rows="4" placeholder="说点什么吧..." required
        class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all resize-none"></textarea>
      <div class="flex justify-end">
        <button type="submit"
          class="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 active:scale-95">
          发表评论
        </button>
      </div>
    </form>

    <!-- 评论列表 -->
    <div class="space-y-6">
      <TransitionGroup name="list">
        <div v-for="comment in comments" :key="comment.id"
          class="flex gap-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-zinc-800/30 transition-all group">
          <img :src="comment.avatar" :alt="comment.author" class="w-12 h-12 rounded-full bg-blue-100 shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-bold text-gray-800 dark:text-zinc-100">{{ comment.author }}</h4>
              <div class="flex items-center gap-3">
                <span class="text-xs text-gray-400 dark:text-zinc-500">{{ comment.date }}</span>
                <button @click="deleteComment(comment.id)"
                  class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                  title="删除评论">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-gray-600 dark:text-zinc-400 leading-relaxed break-words">
              {{ comment.content }}
            </p>
          </div>
        </div>
      </TransitionGroup>

      <!-- 优化后的空状态整体 -->
      <div v-if="comments.length === 0"
        class="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 dark:border-zinc-800/50 rounded-2xl">
        <div
          class="w-16 h-16 mb-4 rounded-full bg-gray-50 dark:bg-zinc-800/50 flex items-center justify-center text-gray-300 dark:text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p class="text-gray-400 dark:text-zinc-500 font-medium">暂无评论</p>
        <p class="text-xs text-gray-300 dark:text-zinc-600 mt-1">期待你的精彩见解 ~</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
