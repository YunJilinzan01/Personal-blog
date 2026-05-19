<script setup>
defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
})

defineEmits(['update:currentPage'])
</script>

<template>
  <div class="flex items-center justify-center gap-4 mt-50 mb-10">
    <!-- 上一页 -->
    <button
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
      class="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/20 text-gray-600 hover:bg-[#c1e3fc] hover:text-blue-600 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
      title="上一页"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <!-- 页码展示 -->
    <div
      class="px-5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/20 shadow-sm text-gray-800 font-bold flex items-center gap-1.5"
    >
      <span class="text-blue-600">{{ currentPage }}</span>
      <template v-if="totalPages > 1"> </template>
    </div>

    <!-- 下一页 -->
    <button
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
      class="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/20 text-gray-600 hover:bg-[#c1e3fc] hover:text-blue-600 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
      title="下一页"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>
