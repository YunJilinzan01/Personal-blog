import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export function useBackToTop() {
  const { y } = useWindowScroll()
  const showButton = computed(() => y.value > 300)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return {
    y,
    showButton,
    scrollToTop,
  }
}
