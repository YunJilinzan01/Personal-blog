import { ref, computed, watch } from 'vue'

export function useHomePagination(filteredPosts, searchQuery) {
  const currentPage = ref(1)
  const pageSize = 5

  const totalPages = computed(() => Math.ceil(filteredPosts.value.length / pageSize))

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return filteredPosts.value.slice(start, end)
  })

  const isSearchActive = computed(() => searchQuery.value.trim().length > 0)

  watch(searchQuery, () => {
    currentPage.value = 1
  })

  watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  watch(totalPages, (newTotal) => {
    if (currentPage.value > newTotal && newTotal > 0) {
      currentPage.value = newTotal
    }
  })

  return {
    currentPage,
    totalPages,
    paginatedPosts,
    isSearchActive,
  }
}
