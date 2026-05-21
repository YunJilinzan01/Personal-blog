<script setup>
import { useBlogStore } from '@/stores/blogStore'
import { useTagCloudManager } from '@/composables/aside/useTagCloudManager'
import { Plus, Trash2, GripVertical, Settings2, Check, X } from 'lucide-vue-next'

const blogStore = useBlogStore()
const {
  isEditing,
  newTagName,
  dragIndex,
  toggleEdit,
  addNewTag,
  removeTag,
  onDragStart,
  onDragOver,
  onDrop,
} = useTagCloudManager(blogStore)
</script>

<template>
  <div
    class="w-full lg:w-87.5 p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl transition-all duration-300 border border-white/20 dark:border-zinc-800/50 shadow-sm group">
    <div class="flex items-center justify-between mb-4">
      <div class="text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-blue-500 rounded-full shrink-0"></span>
        标签
      </div>
      <button @click="toggleEdit"
        class="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-blue-500 transition-all cursor-pointer"
        :class="{ 'text-blue-500 bg-blue-50 dark:bg-blue-900/20': isEditing }">
        <Settings2 v-if="!isEditing" :size="18" />
        <Check v-else :size="18" />
      </button>
    </div>

    <!-- 添加标签输入框 -->
    <Transition name="fade">
      <div v-if="isEditing" class="mb-4 flex gap-2 animate-fade-in-up">
        <input v-model="newTagName" type="text" placeholder="新增标签..." @keyup.enter="addNewTag"
          class="flex-1 px-3 py-1.5 text-sm rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all" />
        <button @click="addNewTag"
          class="p-1.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 cursor-pointer">
          <Plus :size="18" />
        </button>
      </div>
    </Transition>

    <div class="flex flex-wrap gap-2">
      <TransitionGroup name="list">
        <div v-for="(tag, index) in blogStore.tags" :key="tag" :draggable="isEditing" @dragstart="onDragStart(index)"
          @dragover="onDragOver" @drop="onDrop(index)"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-xl text-sm font-bold text-gray-600 dark:text-zinc-400 transition-all group/tag"
          :class="[
            isEditing ? 'cursor-move ring-1 ring-blue-500/20' : 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-100 dark:hover:border-blue-800/30',
            dragIndex === index ? 'opacity-50 scale-95' : 'opacity-100'
          ]">
          <GripVertical v-if="isEditing" :size="14" class="text-gray-400" />
          <span>{{ tag }}</span>
          <button v-if="isEditing" @click.stop="removeTag(index)"
            class="p-0.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 transition-colors cursor-pointer">
            <Trash2 :size="12" />
          </button>
        </div>
      </TransitionGroup>
    </div>

    <div v-if="blogStore.tags.length === 0" class="py-6 text-center text-sm text-gray-400 dark:text-zinc-500 italic">
      暂无标签
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.list-leave-active {
  position: absolute;
}
</style>
