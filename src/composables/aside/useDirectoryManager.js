import { ref } from 'vue'

export function useDirectoryManager(blogStore) {
  const isEditing = ref(false)
  const newCategoryName = ref('')
  const dragIndex = ref(null)

  const toggleEdit = () => {
    isEditing.value = !isEditing.value
    newCategoryName.value = ''
  }

  const addNewCategory = () => {
    if (newCategoryName.value.trim()) {
      blogStore.addCategory(newCategoryName.value.trim())
      newCategoryName.value = ''
    }
  }

  const removeCategory = (index) => {
    blogStore.removeCategory(index)
  }

  const onDragStart = (index) => {
    dragIndex.value = index
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (index) => {
    if (dragIndex.value === null) return
    const newCats = [...blogStore.categories]
    const draggedItem = newCats.splice(dragIndex.value, 1)[0]
    newCats.splice(index, 0, draggedItem)
    blogStore.updateCategories(newCats)
    dragIndex.value = null
  }

  return {
    isEditing,
    newCategoryName,
    dragIndex,
    toggleEdit,
    addNewCategory,
    removeCategory,
    onDragStart,
    onDragOver,
    onDrop,
  }
}
