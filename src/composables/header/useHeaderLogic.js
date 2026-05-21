import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { toggleStore } from '@/stores/toggleStore'
import { useBlogStore } from '@/stores/blogStore'

export function useHeaderLogic() {
  const store = toggleStore()
  const { toggle, isDark, isMobileMenuOpen } = storeToRefs(store)
  const blogStore = useBlogStore()
  const { searchQuery } = storeToRefs(blogStore)

  const isSearchHover = ref(false)
  const isHeaderTop = ref(true)
  const isDesktop = ref(window.innerWidth >= 1024)
  const headerStyle = ref({
    top: '0px',
    backgroundColor: 'rgba(255,255,255,0)',
    boxShadow: 'none',
  })

  const hideNav = computed(() => isSearchHover.value || searchQuery.value.trim().length > 0)
  const isExpanded = computed(() => isSearchHover.value || searchQuery.value.trim().length > 0)

  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1024
  }

  const handleScroll = () => {
    const scrollY = window.scrollY
    isHeaderTop.value = scrollY < 34

    const alpha = Math.min((scrollY / 100) * 0.7, 0.8)
    const isDarkVal = document.documentElement.classList.contains('dark')
    const baseColor = isDarkVal ? '24, 24, 27' : '255, 255, 255'

    headerStyle.value = {
      top: scrollY > 420 ? '-100px' : '0px',
      backgroundColor: `rgba(${baseColor}, ${alpha})`,
      boxShadow:
        scrollY === 0
          ? 'none'
          : isDarkVal
            ? '0 24px 80px rgba(0, 0, 0, 0.4)'
            : '0 24px 80px rgba(15, 23, 42, 0.05)',
    }
  }

  const toggleTheme = () => {
    store.toggleTheme()
    handleScroll()
  }

  const toggleMobileMenu = () => {
    store.toggleMobileMenu()
  }

  onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })

  return {
    toggle,
    isDark,
    isMobileMenuOpen,
    searchQuery,
    isSearchHover,
    isHeaderTop,
    isDesktop,
    headerStyle,
    hideNav,
    isExpanded,
    toggleTheme,
    toggleMobileMenu,
  }
}
