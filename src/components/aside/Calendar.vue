<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']
const today = new Date()
const currentDate = ref(new Date())

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())
const date = computed(() => currentDate.value.getDate())

const monthName = computed(() => {
  return new Intl.DateTimeFormat('zh-CN', { month: 'long' }).format(currentDate.value)
})

const daysInMonth = computed(() => {
  const yearVal = year.value
  const monthVal = month.value
  const firstDay = new Date(yearVal, monthVal, 1).getDay()
  const lastDate = new Date(yearVal, monthVal + 1, 0).getDate()

  const days = []
  // 填充月初之前的空白
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', current: false, isToday: false })
  }
  // 填充当月日期
  for (let i = 1; i <= lastDate; i++) {
    const isToday =
      i === today.getDate() &&
      month.value === today.getMonth() &&
      year.value === today.getFullYear()
    days.push({
      day: i,
      isToday,
    })
  }
  return days
})

const prevMonth = () => {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}
</script>

<template>
  <div class="calendar-widget">
    <!-- 头部：年月展示 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">{{ year }}</span>
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold text-gray-800">{{ monthName }}</span>
          <div class="flex items-center gap-1 ml-2">
            <button
              @click="prevMonth"
              class="p-1 rounded-lg hover:bg-[#e0f1fe] text-gray-400 hover:text-[#37a8ec] transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft :size="16" />
            </button>
            <button
              @click="nextMonth"
              class="p-1 rounded-lg hover:bg-[#e0f1fe] text-gray-400 hover:text-[#37a8ec] transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-xl bg-[#e0f1fe] flex items-center justify-center text-[#37a8ec] font-bold shadow-sm"
      >
        {{ date }}
      </div>
    </div>

    <!-- 星期表头 -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="text-[10px] font-bold text-gray-400 text-center uppercase py-1"
      >
        {{ day }}
      </div>
    </div>

    <!-- 日期网格 -->
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="(item, index) in daysInMonth"
        :key="index"
        class="group relative h-9 flex items-center justify-center text-sm rounded-xl transition-all duration-300"
        :class="[
          item.day ? 'cursor-pointer' : '',
          item.isToday ? 'text-white font-bold' : 'text-gray-600 hover:bg-gray-50',
        ]"
      >
        <!-- 今日高亮背景 -->
        <div
          v-if="item.isToday"
          class="absolute inset-0 bg-[#37a8ec] rounded-xl shadow-[0_4px_12px_rgba(55,168,236,0.3)] z-0"
        ></div>

        <!-- 悬浮效果 -->
        <div
          v-if="item.day && !item.isToday"
          class="absolute inset-0 bg-[#e0f1fe] scale-0 group-hover:scale-100 rounded-xl transition-transform duration-200 z-0"
        ></div>

        <span class="relative z-10">{{ item.day }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-widget {
  user-select: none;
}
</style>
