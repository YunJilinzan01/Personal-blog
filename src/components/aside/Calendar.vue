<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']
const today = new Date()

// 状态管理
const currentDate = ref(new Date()) // 当前显示的年月
const selectedDate = ref(new Date()) // 当前选中的日期
const viewMode = ref('days') // 'days' | 'months' | 'years'

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())
const date = computed(() => selectedDate.value.getDate())

// 格式化月份名称
const monthName = computed(() => {
  return new Intl.DateTimeFormat('zh-CN', { month: 'long' }).format(currentDate.value)
})

// 计算日历网格
const daysInMonth = computed(() => {
  const yearVal = year.value
  const monthVal = month.value
  const firstDay = new Date(yearVal, monthVal, 1).getDay()
  const lastDate = new Date(yearVal, monthVal + 1, 0).getDate()

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', isToday: false, isSelected: false })
  }
  for (let i = 1; i <= lastDate; i++) {
    const isToday =
      i === today.getDate() && monthVal === today.getMonth() && yearVal === today.getFullYear()
    const isSelected =
      i === selectedDate.value.getDate() &&
      monthVal === selectedDate.value.getMonth() &&
      yearVal === selectedDate.value.getFullYear()
    days.push({
      day: i,
      isToday,
      isSelected,
    })
  }
  return days
})

// 月份选择器数据
const monthsList = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]

// 年份选择器数据 (当前年份前后6年)
const yearsList = computed(() => {
  const startYear = year.value - 4
  return Array.from({ length: 12 }, (_, i) => startYear + i)
})

// 交互逻辑
const selectDate = (day) => {
  if (!day) return
  selectedDate.value = new Date(year.value, month.value, day)
}

const prev = () => {
  if (viewMode.value === 'days') {
    currentDate.value = new Date(year.value, month.value - 1, 1)
  } else if (viewMode.value === 'months') {
    currentDate.value = new Date(year.value - 1, month.value, 1)
  } else if (viewMode.value === 'years') {
    currentDate.value = new Date(year.value - 12, month.value, 1)
  }
}

const next = () => {
  if (viewMode.value === 'days') {
    currentDate.value = new Date(year.value, month.value + 1, 1)
  } else if (viewMode.value === 'months') {
    currentDate.value = new Date(year.value + 1, month.value, 1)
  } else if (viewMode.value === 'years') {
    currentDate.value = new Date(year.value + 12, month.value, 1)
  }
}

const selectMonth = (mIdx) => {
  currentDate.value = new Date(year.value, mIdx, 1)
  viewMode.value = 'days'
}

const selectYear = (y) => {
  currentDate.value = new Date(y, month.value, 1)
  viewMode.value = 'months'
}

const toggleView = (mode) => {
  if (viewMode.value === mode) {
    viewMode.value = 'days'
  } else {
    viewMode.value = mode
  }
}

const resetToToday = () => {
  currentDate.value = new Date()
  selectedDate.value = new Date()
  viewMode.value = 'days'
}
</script>

<template>
  <div class="calendar-widget">
    <!-- 头部：年月展示 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <span
          @click="toggleView('years')"
          class="text-xs font-medium text-gray-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#37a8ec] transition-colors w-fit"
        >
          {{ year }}
        </span>
        <div class="flex items-center gap-2">
          <span
            @click="toggleView('months')"
            class="text-xl font-bold text-gray-800 dark:text-zinc-100 cursor-pointer hover:text-[#37a8ec] transition-colors"
          >
            {{ monthName }}
          </span>
          <div class="flex items-center gap-1 ml-2">
            <button
              @click="prev"
              class="p-1 rounded-lg hover:bg-[#e0f1fe] dark:hover:bg-blue-900/30 text-gray-400 dark:text-zinc-500 hover:text-[#37a8ec] transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft :size="16" />
            </button>
            <button
              @click="next"
              class="p-1 rounded-lg hover:bg-[#e0f1fe] dark:hover:bg-blue-900/30 text-gray-400 dark:text-zinc-500 hover:text-[#37a8ec] transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>
      </div>
      <div
        @click="resetToToday"
        class="w-10 h-10 rounded-xl bg-[#e0f1fe] dark:bg-blue-900/30 flex items-center justify-center text-[#37a8ec] font-bold shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all"
      >
        {{ date }}
      </div>
    </div>

    <!-- 视图切换容器 -->
    <div class="relative overflow-hidden min-h-[240px]">
      <Transition name="fade-scale" mode="out-in">
        <!-- 日期视图 -->
        <div v-if="viewMode === 'days'" key="days">
          <!-- 星期表头 -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div
              v-for="day in daysOfWeek"
              :key="day"
              class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 text-center uppercase py-1"
            >
              {{ day }}
            </div>
          </div>

          <!-- 日期网格 -->
          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="(item, index) in daysInMonth"
              :key="index"
              @click="selectDate(item.day)"
              class="group relative h-9 flex items-center justify-center text-sm rounded-xl transition-all duration-300"
              :class="[
                item.day ? 'cursor-pointer' : '',
                item.isSelected
                  ? 'text-white font-bold'
                  : item.isToday
                    ? 'text-[#37a8ec] font-bold'
                    : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800',
              ]"
            >
              <!-- 选中背景 -->
              <div
                v-if="item.isSelected"
                class="absolute inset-0 bg-[#37a8ec] rounded-xl shadow-[0_4px_12px_rgba(55,168,236,0.3)] z-0"
              ></div>

              <!-- 今日标记 (如果没被选中) -->
              <div
                v-if="item.isToday && !item.isSelected"
                class="absolute bottom-1.5 w-1 h-1 bg-[#37a8ec] rounded-full z-10"
              ></div>

              <!-- 悬浮效果 -->
              <div
                v-if="item.day && !item.isSelected"
                class="absolute inset-0 bg-[#e0f1fe] dark:bg-blue-900/30 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-200 z-0"
              ></div>

              <span class="relative z-10">{{ item.day }}</span>
            </div>
          </div>
        </div>

        <!-- 月份视图 -->
        <div v-else-if="viewMode === 'months'" key="months" class="grid grid-cols-3 gap-2 py-2">
          <div
            v-for="(m, idx) in monthsList"
            :key="m"
            @click="selectMonth(idx)"
            class="h-12 flex items-center justify-center rounded-xl text-sm transition-all cursor-pointer hover:bg-[#e0f1fe] dark:hover:bg-blue-900/30 hover:text-[#37a8ec]"
            :class="
              idx === month
                ? 'bg-[#e0f1fe] dark:bg-blue-900/30 text-[#37a8ec] font-bold'
                : 'text-gray-600 dark:text-zinc-400'
            "
          >
            {{ m }}
          </div>
        </div>

        <!-- 年份视图 -->
        <div v-else-if="viewMode === 'years'" key="years" class="grid grid-cols-3 gap-2 py-2">
          <div
            v-for="y in yearsList"
            :key="y"
            @click="selectYear(y)"
            class="h-12 flex items-center justify-center rounded-xl text-sm transition-all cursor-pointer hover:bg-[#e0f1fe] dark:hover:bg-blue-900/30 hover:text-[#37a8ec]"
            :class="
              y === year
                ? 'bg-[#e0f1fe] dark:bg-blue-900/30 text-[#37a8ec] font-bold'
                : 'text-gray-600 dark:text-zinc-400'
            "
          >
            {{ y }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.calendar-widget {
  user-select: none;
}
</style>
