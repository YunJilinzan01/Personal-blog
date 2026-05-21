import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blogStore'
import { storeToRefs } from 'pinia'

export function usePostItem(props) {
  const router = useRouter()
  const blogStore = useBlogStore()
  const { isDeleteMode } = storeToRefs(blogStore)
  const showDeleteModal = ref(false)

  const goToDetail = () => {
    if (isDeleteMode.value) return
    router.push({ name: 'post-detail', params: { id: props.post.id } })
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    showDeleteModal.value = true
  }

  const confirmDelete = () => {
    blogStore.deletePost(props.post.id)
    showDeleteModal.value = false
  }

  return {
    isDeleteMode,
    showDeleteModal,
    goToDetail,
    handleDelete,
    confirmDelete,
  }
}
