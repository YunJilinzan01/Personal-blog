<script setup>
import { ref } from 'vue'
import { Plus, Trash2, Settings2 } from 'lucide-vue-next'

const emit = defineEmits(['add', 'delete'])

const showAdminTools = ref(false)

const onAdd = () => {
  emit('add')
}

const onDelete = () => {
  emit('delete')
}
</script>

<template>
  <div
    class="w-full mb-5 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-zinc-800/50 shadow-sm transition-all duration-300"
  >
    <div class="flex items-center gap-3">
      <!-- 控制按钮 -->
      <button
        @click="showAdminTools = !showAdminTools"
        class="p-2 rounded-xl bg-white/50 dark:bg-zinc-900/50 hover:bg-white/80 dark:hover:bg-zinc-800/80 border border-white/20 dark:border-zinc-800/50 text-gray-500 dark:text-zinc-400 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group"
        :title="showAdminTools ? '收起工具' : '展开工具'"
      >
        <Settings2
          class="w-5 h-5 transition-transform duration-500"
          :class="{ 'rotate-180 text-blue-500': showAdminTools }"
        />
      </button>

      <!-- 操作按钮组 -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translateX-4 scale-95"
        leave-to-class="opacity-0 -translateX-4 scale-95"
      >
        <div v-if="showAdminTools" class="flex items-center gap-3 pr-2">
          <button
            @click="onAdd"
            class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 border border-blue-100/50 dark:border-blue-800/30 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Plus class="w-4 h-4" />
            <span>新增帖子</span>
          </button>
          <button
            @click="onDelete"
            class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-800/30 border border-rose-100/50 dark:border-rose-800/30 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Trash2 class="w-4 h-4" />
            <span>删除帖子</span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";
</style>
