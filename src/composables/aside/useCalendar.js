import { ref, computed } from 'vue'

const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']

export function useCalendar() {
  const today = new Date()
  const currentDate = ref(new Date())
  const selectedDate = ref(new Date())
  const viewMode = ref('days')

  const year = computed(() => currentDate.value.getFullYear())
  const month = computed(() => currentDate.value.getMonth())
  const date = computed(() => selectedDate.value.getDate())

  const monthName = computed(() => {
    return new Intl.DateTimeFormat('zh-CN', { month: 'long' }).format(currentDate.value)
  })

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

  const yearsList = computed(() => {
    const startYear = year.value - 4
    return Array.from({ length: 12 }, (_, i) => startYear + i)
  })

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
    viewMode.value = viewMode.value === mode ? 'days' : mode
  }

  const resetToToday = () => {
    currentDate.value = new Date()
    selectedDate.value = new Date()
    viewMode.value = 'days'
  }

  return {
    currentDate,
    selectedDate,
    viewMode,
    year,
    month,
    date,
    daysOfWeek,
    monthName,
    daysInMonth,
    monthsList,
    yearsList,
    selectDate,
    prev,
    next,
    selectMonth,
    selectYear,
    toggleView,
    resetToToday,
  }
}
