<script setup>
import { ref, reactive } from 'vue'
import { X, Image as ImageIcon, Tag, Layout } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close', 'submit'])

const showConfirm = ref(false)

const form = reactive({
  title: '',
  excerpt: '',
  content: '',
  category: '默认分类',
  tags: '',
  cover: '',
})

const isDirty = () => {
  return (
    form.title.trim() !== '' ||
    form.content.trim() !== '' ||
    form.cover.trim() !== '' ||
    form.tags.trim() !== '' ||
    form.category !== '默认分类'
  )
}

const handleClose = () => {
  if (isDirty()) {
    showConfirm.value = true
  } else {
    emit('close')
  }
}

const confirmCancel = () => {
  showConfirm.value = false
}

const confirmClose = () => {
  showConfirm.value = false
  resetForm()
  emit('close')
}

const resetForm = () => {
  form.title = ''
  form.excerpt = ''
  form.content = ''
  form.category = '默认分类'
  form.tags = ''
  form.cover = ''
}

const handleSubmit = () => {
  if (!form.title.trim() || !form.content.trim()) return

  const postData = {
    title: form.title,
    excerpt: form.excerpt || form.content.substring(0, 100).replace(/<[^>]*>/g, '') + '...',
    content: form.content,
    category: form.category,
    tags: form.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t),
    cover: form.cover || null,
    readingTime: Math.ceil(form.content.length / 500) + ' min',
  }

  emit('submit', postData)
  resetForm()
  emit('close')
}
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
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        @click.self="handleClose"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <!-- 弹窗主体容器 -->
          <div class="relative w-full max-w-2xl flex items-center justify-center">
            <!-- 1. 表单主体 -->
            <div
              class="w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800/50 overflow-hidden transition-all duration-300"
              :class="{ 'blur-sm scale-[0.98] pointer-events-none opacity-50': showConfirm }"
            >
              <!-- 头部 -->
              <div
                class="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between"
              >
                <h3 class="text-xl font-bold text-gray-800 dark:text-zinc-100">撰写新帖子</h3>
                <button
                  @click="handleClose"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X class="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <!-- 表单内容 -->
              <div class="p-6 max-h-[70vh] overflow-y-auto space-y-5 custom-scrollbar">
                <!-- 标题 -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-2"
                  >
                    标题
                  </label>
                  <input
                    v-model="form.title"
                    type="text"
                    placeholder="给帖子起个亮眼的标题..."
                    class="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-zinc-100"
                  />
                </div>

                <!-- 分类与标签 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label
                      class="text-sm font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-2"
                    >
                      <Layout class="w-4 h-4" /> 分类
                    </label>
                    <input
                      v-model="form.category"
                      type="text"
                      class="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-zinc-100"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="text-sm font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-2"
                    >
                      <Tag class="w-4 h-4" /> 标签 (逗号分隔)
                    </label>
                    <input
                      v-model="form.tags"
                      type="text"
                      placeholder="Vue, 前端, 技巧"
                      class="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-zinc-100"
                    />
                  </div>
                </div>

                <!-- 封面图链接 -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-2"
                  >
                    <ImageIcon class="w-4 h-4" /> 封面图链接 (可选)
                  </label>
                  <input
                    v-model="form.cover"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    class="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-zinc-100"
                  />
                </div>

                <!-- 正文 -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-zinc-300"
                    >正文内容 (支持 HTML)</label
                  >
                  <textarea
                    v-model="form.content"
                    rows="8"
                    placeholder="开始创作吧..."
                    class="w-full px-4 py-3 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none dark:text-zinc-100 custom-scrollbar"
                  ></textarea>
                </div>
              </div>

              <!-- 底部操作 -->
              <div
                class="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3 bg-gray-50/30 dark:bg-zinc-800/30"
              >
                <button
                  @click="handleClose"
                  class="px-6 py-2 text-sm font-medium text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                >
                  取消
                </button>
                <button
                  @click="handleSubmit"
                  :disabled="!form.title.trim() || !form.content.trim()"
                  class="px-8 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  发布文章
                </button>
              </div>
            </div>

            <!-- 2. 确认退出叠加层 -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 scale-90"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-90"
            >
              <div
                v-if="showConfirm"
                class="absolute inset-0 z-10 flex items-center justify-center p-6 bg-black/5 dark:bg-white/5 backdrop-blur-[2px] rounded-3xl"
                @click.self="confirmCancel"
              >
                <div
                  class="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 p-8 text-center animate-in fade-in zoom-in duration-300"
                >
                  <div
                    class="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <X class="w-8 h-8" />
                  </div>
                  <h4 class="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-2">
                    放弃创作？
                  </h4>
                  <p class="text-gray-500 dark:text-zinc-400 mb-8">
                    当前内容尚未保存，退出后将丢失所有已输入的信息。
                  </p>
                  <div class="flex gap-3">
                    <button
                      @click="confirmCancel"
                      class="flex-1 py-3 text-sm font-medium text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl transition-all"
                    >
                      继续编辑
                    </button>
                    <button
                      @click="confirmClose"
                      class="flex-1 py-3 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-95"
                    >
                      确定退出
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 dark:bg-zinc-700 rounded-full;
}
</style>
